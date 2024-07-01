const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountAmount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Voucher = mongoose.model("Voucher", VoucherSchema);

module.exports = Voucher;
