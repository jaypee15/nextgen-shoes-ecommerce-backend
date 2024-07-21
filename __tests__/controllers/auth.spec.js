const User = require(".../models/user;");

describe("Unit tests for user management controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "123456789",
        password: "password123",
        role: "buyer",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user succesfully", async () => {
    const fakeUser = {
      _id: "123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123456789",
      password: "password123",
      role: "buyer",
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(fakeUser);
    generateToken.mockResolvedValue("fakeToken");
    constructUserResponse.mockReturnValue = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
      role: "user",
      token: "fakeToken",
    };
  });
});
