// __tests__/UserController.test.js

const { registerUser, loginUser, getUserInfo, editUserInfo, makeAdmin } = require('../controllers/UserController');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock the User model
jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserController', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:27017/test`;
        await mongoose.connect(url);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('registerUser', () => {
        it('should register a user successfully', async () => {
            const req = {
                body: {
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'testpassword123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(req.body);
            bcrypt.hash.mockResolvedValue('hashedpassword');

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User Registered Successfully' });
        });

        it('should not register a user if email already exists', async () => {
            const req = {
                body: {
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'testpassword123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            User.findOne.mockResolvedValue(req.body);

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User Already Exists' });
        });
    });

    describe('loginUser', () => {
        it('should log in a user successfully', async () => {
            const req = {
                body: {
                    email: 'testuser@example.com',
                    password: 'testpassword123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = {
                id: '1',
                name: 'Test User',
                email: 'testuser@example.com',
                password: await bcrypt.hash('testpassword123', 10)
            };

            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);

            jwt.sign.mockImplementation((payload, secret, callback) => {
                callback(null, 'token');
            });

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Login is Success',
                token: 'token'
            });
        });

        it('should not log in a user with incorrect password', async () => {
            const req = {
                body: {
                    email: 'testuser@example.com',
                    password: 'wrongpassword'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = {
                id: '1',
                name: 'Test User',
                email: 'testuser@example.com',
                password: await bcrypt.hash('testpassword123', 10)
            };

            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(false);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Password' });
        });

        it('should not log in a user with incorrect email', async () => {
            const req = {
                body: {
                    email: 'wrongemail@example.com',
                    password: 'testpassword123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            User.findOne.mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Credentials' });
        });
    });
    describe('getUserInfo', () => {
        it('should return user info', async () => {
            const req = {
                user: {
                    id: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = {
                id: '1',
                name: 'Test User',
                email: 'testuser@example.com'
            };

            User.findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue(user)
            }));

            await getUserInfo(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                user: { id: '1', name: 'Test User', email: 'testuser@example.com' }
            });
        });

        it('should return an error if user not found', async () => {
            const req = {
                user: {
                    id: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            User.findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue(null)
            }));

            await getUserInfo(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User not found' });
        });
    });

    describe('editUserInfo', () => {
        it('should update user info successfully', async () => {
            const req = {
                user: {
                    id: '1'
                },
                body: {
                    name: 'Updated Test User',
                    email: 'updatedtestuser@example.com',
                    password: 'newpassword123'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = {
                id: '1',
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'testpassword123',
                save: jest.fn().mockResolvedValue({
                    id: '1',
                    name: 'Updated Test User',
                    email: 'updatedtestuser@example.com',
                    password: 'hashedpassword'
                })
            };

            User.findById.mockResolvedValue(user);
            bcrypt.hash.mockResolvedValue('hashedpassword');

            await editUserInfo(req, res);

            expect(user.name).toBe('Updated Test User');
            expect(user.email).toBe('updatedtestuser@example.com');
            expect(user.password).toBe('hashedpassword');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User Info Updated Successfully', user: user });
        });
    });

    describe('makeAdmin', () => {
        it('should make a user admin', async () => {
            const req = {
                user: {
                    id: '1'
                },
                params: {
                    userId: '2'
                },
                body: {
                    isAdmin: true
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = {
                id: '2',
                name: 'Test User 2',
                email: 'testuser2@example.com',
                password: 'testpassword123',
                isAdmin: false,
                save: jest.fn().mockResolvedValue({
                    id: '2',
                    name: 'Test User 2',
                    email: 'testuser2@example.com',
                    password: 'testpassword123',
                    isAdmin: true
                })
            };

            User.findById.mockResolvedValue(user);

            await makeAdmin(req, res);

            expect(user.isAdmin).toBe(true);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User Info Updated Successfully', user: user });
        });

        it('should not allow user to toggle their own admin status', async () => {
            const req = {
                user: {
                    id: '1'
                },
                params: {
                    userId: '1'
                },
                body: {
                    isAdmin: true
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await makeAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ msg: 'You cannot toggle your own admin status' });
        });
    });

});
