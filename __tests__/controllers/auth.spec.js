const { createUser } = require('../controllers/userController');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const constructUserResponse = require('../utils/constructUserResponse');

jest.mock('../models/User');
jest.mock('../utils/generateToken');
jest.mock('../utils/constructUserResponse');

describe('createUser Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        role: 'user'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const fakeUser = {
      _id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      password: 'hashedPassword',
      role: 'user'
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(fakeUser);
    generateToken.mockReturnValue('fakeToken');
    constructUserResponse.mockReturnValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      role: 'user',
      token: 'fakeToken'
    });

    await createUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
    expect(User.create).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
      role: 'user'
    });
    expect(generateToken).toHaveBeenCalledWith('123');
    expect(constructUserResponse).toHaveBeenCalledWith(fakeUser, 'fakeToken');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        role: 'user',
        token: 'fakeToken'
      }
    });
  });

  it('should return 400 if email already exists', async () => {
    User.findOne.mockResolvedValue({
      email: 'johndoe@example.com'
    });

    await createUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    const error = next.mock.calls[0][0];
    expect(error.message).toBe('A user with this email already exists');
    expect(error.statusCode).toBe(400);
  });
});
