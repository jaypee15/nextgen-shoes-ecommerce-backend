/*
Checkout Page
Feature for delivery address
Delivery type (Door Delivery or Pick up in Store)
Payment method (Card or Bank transfer)
Voucher Code Feature
Order Summary section
Confirm Order Button

*/
const catchAsync = require("../utils/catch-async");
const Econsole = require("../utils/econsole-log");
const Cart = require("../models/cart");
const Voucher = require("../models/voucher");
const Order = require("../models/order");
const TransactionLog = require("../models/transaction-log");
const User = require("../models/user");
const { v4: uuidGenerator } = require("uuid")
const { validateOrder } = require("../utils/joi-validators")
const { paymentIntialization } = require("../utils/payment-paystack");
const {
    PAYMENT_CALLBACK_URL,
} = process.env;
const macaddress = require('macaddress');

exports.processCart = catchAsync(async (req, res) => {
    const myconsole = new Econsole("checkout-controller.js", "processCart", "")
    myconsole.log("user=",req.user.userId)
    req.body.userId = req.user.userId
    // Find the model for the user
    const user = await User.findById(req.user.userId);
    console.log("user=",user)
    req.body.email=user.email;
    req.body.phoneNumber=user.phoneNumber;
    req.body.name = `${user.firstName}-${user.lastName}`

    //get mac address
    let mac=macaddress.all((err, all) => {
        if (err) {
          myconsole.error('Error getting MAC addresses:', err);
          return;
        }
      
        myconsole.log('MAC addresses:', all);
      
        // Example: Get the MAC address of the first network interface found
        const interfaces = Object.keys(all);
        if (interfaces.length > 0) {
          const firstInterface = interfaces[0];
          const mac = all[firstInterface].mac;
          myconsole.log(`MAC address of ${firstInterface}: ${mac}`);
        } else {
          myconsole.log('No network interfaces found.');
        }
        return macaddress;
      });
      myconsole.log("mac=",mac)
    req.body.mac = mac;
    try {
        const userId = req.user.userId;
        // Find the cart for the user
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);
        myconsole.log("totalAmount", totalAmount)
        const id = uuidGenerator()
        req.body.uuid = id;
        if (req.body.voucherCode) {
            //find the voucher and subtract from the totalAmount of goods in Cart
            const voucher = await Voucher.findOne({ code });
            totalAmount -= voucher.discountAmount
        }
        // Create the order
        const orderProperties = {
            userId,
            deliveryAddress: req.body.deliveryAddress,
            deliveryType: req.body.deliveryType,
            paymentMethod: req.body.paymentMethod,
            voucherCode: req.body.voucherCode,
            totalAmount: totalAmount,
            products: cart.items.map(item => ({
                productId: item.productId._id.toString(),
                quantity: item.quantity,
                price: item.productId.price,
            })),
        };
        if (validateOrder(orderProperties, res)) {
            const order = new Order(orderProperties);
            await order.save();
            // Clear the cart
            cart.items = [];
            await cart.save();
            req.body.amount = totalAmount;
            req.body.orderId=order.id;
            req.body.redirect_url = `${req.protocol}://${req.get("host")}${PAYMENT_CALLBACK_URL}/${userId}?` +
                `amount=${totalAmount}&currency=${req.body.currency}&orderId=${order.id}`;
            const response = await paymentIntialization(req.body, res);
            myconsole.log("response=",response)
            if (response.status === "success"||"true") {
                res.status(200).json({
                    status: "payment link generated successfully",
                    //paymentlink: response.data.link //for flutterwave
                    paymentlink: response.data.authorization_url 
                });
            } else {
                res.status(500).json({
                    status: "payment link not generated"
                });
            }
        } else {
            return res.status(400).json({ message: 'Invalid order data' });
        }
    } catch (error) {
    res.status(500).json({ message: 'Error processing the cart', error: error.message });
}
myconsole.log("exits")
});

exports.processOrder = catchAsync(async (req, res) => {
    const myconsole = new Econsole("checkout-controller.js", "processOrder", "")
    const userId = req.params.userId
    //make entry in transaction log
    try {
        const transactionLog = new TransactionLog({
          orderId: req.query.orderId,
          status: req.query.status,
        });
    
        await transactionLog.save();
        const order = await Order.findOne({userId }).populate('products.productId');
        order["paymentMethod"]=req.query.paymentMethod;
        order.save();
        res.status(200).json({ message: 'Order sucessfully processed awaiting delivery', order:order});
      } catch (error) {
        console.error('Error saving transaction log:', error);
        res.status(400).json({ message: `Order processing unsucessful, ${error}` });
      }
    myconsole.log("exits")
});