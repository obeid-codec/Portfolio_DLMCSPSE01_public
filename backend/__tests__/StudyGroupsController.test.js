// __tests__/StudyGroupsController.test.js

const { createStudyGroup, joinStudyGroup, getStudyGroups, getSpecificStudyGroups, getJoinedStudyGroups, deleteStudyGroup, updateStudyGroup, leaveStudyGroup } = require('../Controllers/StudyGroups');
const StudyGroup = require('../models/StudyGroup');
const User = require('../models/User');

const mongoose = require('mongoose');

// Mock the StudyGroup model
jest.mock('../models/StudyGroup');
jest.mock('../models/User');


describe('StudyGroupsController', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:27017/test`;
        await mongoose.connect(url);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Suppress console.error during testing
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    describe('createStudyGroup', () => {
        it('should create a study group successfully', async () => {
            const req = {
                body: {
                    name: 'New Group',
                    description: 'New Description'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroup = {
                id: '1',
                name: 'New Group',
                description: 'New Description',
                save: jest.fn().mockResolvedValue({})
            };

            StudyGroup.mockImplementation(() => studyGroup);

            await createStudyGroup(req, res);

            expect(studyGroup.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Study Group Created Successfully',
                group: studyGroup
            });
        });

        it('should handle errors', async () => {
            const req = {
                body: {
                    name: 'New Group',
                    description: 'New Description'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error creating study group');
            StudyGroup.mockImplementation(() => {
                throw error;
            });

            await createStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('joinStudyGroup', () => {
        it('should join a study group successfully', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroup = {
                id: '1',
                name: 'Group 1',
                description: 'Description 1',
                members: [],
                save: jest.fn().mockResolvedValue({})
            };

            StudyGroup.findById.mockResolvedValue(studyGroup);

            await joinStudyGroup(req, res);

            expect(studyGroup.members).toContain(req.user.id);
            expect(studyGroup.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Joined Study Group Successfully',
                group: studyGroup
            });
        });

        it('should handle errors if study group not found', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            StudyGroup.findById.mockResolvedValue(null);

            await joinStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Study Group not found' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error joining study group');
            StudyGroup.findById.mockRejectedValue(error);

            await joinStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('getStudyGroups', () => {
        it('should return all study groups', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroups = [
                { id: '1', name: 'Group 1', description: 'Description 1' },
                { id: '2', name: 'Group 2', description: 'Description 2' }
            ];

            StudyGroup.find.mockResolvedValue(studyGroups);

            await getStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ groups: studyGroups });
        });

        it('should handle errors', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error finding study groups');
            StudyGroup.find.mockRejectedValue(error);

            await getStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('getSpecificStudyGroups', () => {
        it('should return the specific study group', async () => {
            const req = {
                params: {
                    groupId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroup = {
                id: '1',
                name: 'Group 1',
                description: 'Description 1'
            };

            StudyGroup.findById.mockResolvedValue(studyGroup);

            await getSpecificStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ group: studyGroup });
        });

        it('should handle errors if study group not found', async () => {
            const req = {
                params: {
                    groupId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            StudyGroup.findById.mockResolvedValue(null);

            await getSpecificStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Study Group not found' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    groupId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error finding study group');
            StudyGroup.findById.mockRejectedValue(error);

            await getSpecificStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('getJoinedStudyGroups', () => {
        it('should return all joined study groups', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = { id: 'user1' };
            const studyGroups = [
                { id: '1', name: 'Group 1', description: 'Description 1' },
                { id: '2', name: 'Group 2', description: 'Description 2' }
            ];

            User.findById.mockResolvedValue(user);
            StudyGroup.find.mockResolvedValue(studyGroups);

            await getJoinedStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ groups: studyGroups });
        });

        it('should handle errors if user not found', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            User.findById.mockResolvedValue(null);

            await getJoinedStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User not found' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error finding study groups');
            User.findById.mockRejectedValue(error);

            await getJoinedStudyGroups(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('deleteStudyGroup', () => {
        it('should delete the study group successfully', async () => {
            const req = {
                params: {
                    groupId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            StudyGroup.findByIdAndDelete.mockResolvedValue({ id: '1' });

            await deleteStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Study Group Deleted Successfully' });
        });

        it('should handle errors if study group not found', async () => {
            const req = {
                params: {
                    groupId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            StudyGroup.findByIdAndDelete.mockResolvedValue(null);

            await deleteStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Study Group not found' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    groupId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting study group');
            StudyGroup.findByIdAndDelete.mockRejectedValue(error);

            await deleteStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });
    describe('updateStudyGroup', () => {
        it('should update the study group successfully', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                body: {
                    name: 'Updated Group 1',
                    description: 'Updated Description 1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroup = {
                id: '1',
                name: 'Group 1',
                description: 'Description 1',
                save: jest.fn().mockResolvedValue({
                    id: '1',
                    name: 'Updated Group 1',
                    description: 'Updated Description 1'
                })
            };

            StudyGroup.findById.mockResolvedValue(studyGroup);

            await updateStudyGroup(req, res);

            expect(studyGroup.name).toBe('Updated Group 1');
            expect(studyGroup.description).toBe('Updated Description 1');
            expect(studyGroup.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Study Group Updated Successfully',
                group: studyGroup
            });
        });

        it('should handle errors if study group not found', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                body: {
                    name: 'Updated Group 1',
                    description: 'Updated Description 1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            StudyGroup.findById.mockResolvedValue(null);

            await updateStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Study Group not found' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                body: {
                    name: 'Updated Group 1',
                    description: 'Updated Description 1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error updating study group');
            StudyGroup.findById.mockRejectedValue(error);

            await updateStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('leaveStudyGroup', () => {
        it('should leave the study group successfully', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroup = {
                id: '1',
                members: ['user1', 'user2'],
                save: jest.fn().mockResolvedValue(true)
            };

            StudyGroup.findById.mockResolvedValue(studyGroup);

            await leaveStudyGroup(req, res);

            const expectedResponse = {
                id: '1',
                members: ['user2']
            };

            expect(studyGroup.members).not.toContain('user1');
            expect(studyGroup.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Left Study Group Successfully',
                group: expectedResponse
            });
        });

        it('should handle errors if study group not found', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            StudyGroup.findById.mockResolvedValue(null);

            await leaveStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Study Group not found' });
        });

        it('should handle errors if user is not a member of the study group', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const studyGroup = {
                id: '1',
                members: ['user2'],
                save: jest.fn()
            };

            StudyGroup.findById.mockResolvedValue(studyGroup);

            await leaveStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'User is not a member of this study group' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    groupId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error leaving study group');
            StudyGroup.findById.mockRejectedValue(error);

            await leaveStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });
});