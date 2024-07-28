// __tests__/ProfileController.test.js

const { getMyProfile, createProfile, updateProfile, getAllProfiles, getProfileByProfileId, deleteProfile, addExperience, deleteExperience, addEducation, deleteEducation, addCourse, deleteCourse } = require('../Controllers/ProfileController');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');

// Mock the Profile, User, and Post models
jest.mock('../models/Profile');
jest.mock('../models/User');
jest.mock('../models/Post');

describe('ProfileController', () => {
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
        jest.clearAllMocks(); // Clear mocks to ensure no interference between tests
    });

    describe('getMyProfile', () => {
        it('should return the profile successfully', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                _id: 'profile1',
                user: {
                    _id: 'user1',
                    name: 'Test User',
                    avatar: 'avatar.jpg'
                },
                courses: [],
                education: [],
                experience: [],
                social: {}
            };

            Profile.findOne.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue(profile)
            }));

            await getMyProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue(null)
            }));

            await getMyProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
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

            const error = new Error('Error fetching profile');
            Profile.findOne.mockImplementation(() => ({
                populate: jest.fn().mockRejectedValue(error)
            }));

            await getMyProfile(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });

    describe('createProfile', () => {
        it('should create a new profile successfully', async () => {
            const req = {
                user: {
                    id: 'user1'
                },
                body: {
                    youtube: 'youtube.com/user1',
                    facebook: 'facebook.com/user1',
                    twitter: 'twitter.com/user1',
                    instagram: 'instagram.com/user1',
                    linkedin: 'linkedin.com/user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            const profile = {
                user: 'user1',
                social: {
                    youtube: 'youtube.com/user1',
                    facebook: 'facebook.com/user1',
                    twitter: 'twitter.com/user1',
                    instagram: 'instagram.com/user1',
                    linkedin: 'linkedin.com/user1'
                },
                save: jest.fn().mockResolvedValue({
                    _id: 'profile1',
                    user: 'user1',
                    social: {
                        youtube: 'youtube.com/user1',
                        facebook: 'facebook.com/user1',
                        twitter: 'twitter.com/user1',
                        instagram: 'instagram.com/user1',
                        linkedin: 'linkedin.com/user1'
                    }
                })
            };

            Profile.mockImplementation(() => profile);

            await createProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Profile Created',
                profile: {
                    _id: 'profile1',
                    user: 'user1',
                    social: {
                        youtube: 'youtube.com/user1',
                        facebook: 'facebook.com/user1',
                        twitter: 'twitter.com/user1',
                        instagram: 'instagram.com/user1',
                        linkedin: 'linkedin.com/user1'
                    }
                }
            });
        });

        it('should return 400 if the profile already exists', async () => {
            const req = {
                user: {
                    id: 'user1'
                },
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue({
                user: 'user1'
            });

            await createProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Profile already exists' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: {
                    id: 'user1'
                },
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error creating profile');
            Profile.findOne.mockRejectedValue(error);

            await createProfile(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: [{ msg: error.message }]
            });
        });
    });

    describe('updateProfile', () => {
        it('should update the profile successfully', async () => {
            const req = {
                user: {
                    id: 'user1'
                },
                body: {
                    youtube: 'youtube.com/user1',
                    facebook: 'facebook.com/user1',
                    twitter: 'twitter.com/user1',
                    instagram: 'instagram.com/user1',
                    linkedin: 'linkedin.com/user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                social: {
                    youtube: 'youtube.com/olduser1',
                    facebook: 'facebook.com/olduser1',
                    twitter: 'twitter.com/olduser1',
                    instagram: 'instagram.com/olduser1',
                    linkedin: 'linkedin.com/olduser1'
                }
            };

            const updatedProfile = {
                user: 'user1',
                social: {
                    youtube: 'youtube.com/user1',
                    facebook: 'facebook.com/user1',
                    twitter: 'twitter.com/user1',
                    instagram: 'instagram.com/user1',
                    linkedin: 'linkedin.com/user1'
                }
            };

            Profile.findOne.mockResolvedValue(profile);
            Profile.findOneAndUpdate.mockResolvedValue(updatedProfile);

            await updateProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(Profile.findOneAndUpdate).toHaveBeenCalledWith(
                { user: req.user.id },
                { $set: { user: req.user.id, social: req.body } },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile: updatedProfile });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: {
                    id: 'user1'
                },
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await updateProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: {
                    id: 'user1'
                },
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error updating profile');
            Profile.findOne.mockRejectedValue(error);

            await updateProfile(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: [{ msg: error.message }]
            });
        });
    });

    describe('getAllProfiles', () => {
        it('should return all profiles successfully', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profiles = [
                {
                    _id: 'profile1',
                    user: {
                        _id: 'user1',
                        name: 'Test User 1',
                        avatar: 'avatar1.jpg',
                        isAdmin: false
                    },
                    courses: [],
                    education: [],
                    experience: [],
                    social: {}
                },
                {
                    _id: 'profile2',
                    user: {
                        _id: 'user2',
                        name: 'Test User 2',
                        avatar: 'avatar2.jpg',
                        isAdmin: true
                    },
                    courses: [],
                    education: [],
                    experience: [],
                    social: {}
                }
            ];

            Profile.find.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue(profiles)
            }));

            await getAllProfiles(req, res);

            expect(Profile.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profiles });
        });

        it('should return 400 if no profiles are found', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.find.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue(null)
            }));

            await getAllProfiles(req, res);

            expect(Profile.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error fetching profiles');
            Profile.find.mockImplementation(() => ({
                populate: jest.fn().mockRejectedValue(error)
            }));

            await getAllProfiles(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: [{ msg: error.message }]
            });
        });
    });

    describe('getProfileByProfileId', () => {
        it('should return the profile by profileId successfully', async () => {
            const req = {
                params: {
                    profileId: 'profile1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                _id: 'profile1',
                user: {
                    _id: 'user1',
                    name: 'Test User',
                    avatar: 'avatar.jpg'
                },
                courses: [],
                education: [],
                experience: [],
                social: {}
            };

            Profile.findById.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue(profile)
            }));

            await getProfileByProfileId(req, res);

            expect(Profile.findById).toHaveBeenCalledWith(req.params.profileId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                params: {
                    profileId: 'profile1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findById.mockImplementation(() => ({
                populate: jest.fn().mockResolvedValue(null)
            }));

            await getProfileByProfileId(req, res);

            expect(Profile.findById).toHaveBeenCalledWith(req.params.profileId);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    profileId: 'profile1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error fetching profile');
            Profile.findById.mockImplementation(() => ({
                populate: jest.fn().mockRejectedValue(error)
            }));

            await getProfileByProfileId(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: [{ msg: error.message }]
            });
        });
    });


    describe('deleteProfile', () => {
        it('should delete the profile, user, and related posts successfully', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                _id: 'profile1',
                user: 'user1',
                deleteOne: jest.fn().mockResolvedValue({})
            };

            const user = {
                _id: 'user1',
                deleteOne: jest.fn().mockResolvedValue({})
            };

            Profile.findOne.mockResolvedValue(profile);
            User.findById.mockResolvedValue(user);
            Post.deleteMany.mockResolvedValue({});

            await deleteProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.deleteOne).toHaveBeenCalled();
            expect(User.findById).toHaveBeenCalledWith(req.user.id);
            expect(user.deleteOne).toHaveBeenCalled();
            expect(Post.deleteMany).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Profile Deleted' });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await deleteProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should return 400 if no user is found', async () => {
            const req = {
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                _id: 'profile1',
                user: 'user1',
                deleteOne: jest.fn().mockResolvedValue({})
            };

            Profile.findOne.mockResolvedValue(profile);
            User.findById.mockResolvedValue(null);

            await deleteProfile(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(User.findById).toHaveBeenCalledWith(req.user.id);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No User Found' }]);
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

            const error = new Error('Error deleting profile');
            Profile.findOne.mockRejectedValue(error);

            await deleteProfile(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: [{ msg: error.message }]
            });
        });
    });


    describe('addExperience', () => {
        it('should add experience to the profile successfully', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    title: 'Software Engineer',
                    company: 'Company ABC',
                    location: 'New York',
                    from: '2021-01-01',
                    to: '2022-01-01',
                    current: false,
                    description: 'Developed awesome software'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                experience: [],
                save: jest.fn().mockResolvedValue({
                    user: 'user1',
                    experience: [{
                        title: 'Software Engineer',
                        company: 'Company ABC',
                        location: 'New York',
                        from: '2021-01-01',
                        to: '2022-01-01',
                        current: false,
                        description: 'Developed awesome software'
                    }]
                })
            };

            Profile.findOne.mockResolvedValue(profile);

            await addExperience(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.experience).toHaveLength(1);
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile: expect.any(Object) });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    title: 'Software Engineer',
                    company: 'Company ABC',
                    location: 'New York',
                    from: '2021-01-01',
                    to: '2022-01-01',
                    current: false,
                    description: 'Developed awesome software'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await addExperience(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    title: 'Software Engineer',
                    company: 'Company ABC',
                    location: 'New York',
                    from: '2021-01-01',
                    to: '2022-01-01',
                    current: false,
                    description: 'Developed awesome software'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error adding experience');
            Profile.findOne.mockRejectedValue(error);

            await addExperience(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });

    describe('deleteExperience', () => {
        it('should delete the experience from the profile successfully', async () => {
            const req = {
                user: { id: 'user1' },
                params: { exp_id: 'exp1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                experience: [
                    { id: 'exp1', title: 'Software Engineer' },
                    { id: 'exp2', title: 'Project Manager' }
                ],
                save: jest.fn().mockResolvedValue({
                    user: 'user1',
                    experience: [{ id: 'exp2', title: 'Project Manager' }]
                })
            };

            Profile.findOne.mockResolvedValue(profile);

            await deleteExperience(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.experience).toHaveLength(1);
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Experience Deleted',
                profile: expect.any(Object)
            });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: { id: 'user1' },
                params: { exp_id: 'exp1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await deleteExperience(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: { id: 'user1' },
                params: { exp_id: 'exp1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting experience');
            Profile.findOne.mockRejectedValue(error);

            await deleteExperience(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });

    describe('addEducation', () => {
        it('should add education to the profile successfully', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    school: 'Test School',
                    degree: 'Bachelor',
                    fieldofstudy: 'Computer Science',
                    from: '2020-01-01',
                    to: '2024-01-01',
                    current: false,
                    description: 'Studied computer science'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                education: [],
                save: jest.fn().mockResolvedValue({
                    user: 'user1',
                    education: [{
                        school: 'Test School',
                        degree: 'Bachelor',
                        fieldofstudy: 'Computer Science',
                        from: '2020-01-01',
                        to: '2024-01-01',
                        current: false,
                        description: 'Studied computer science'
                    }]
                })
            };

            Profile.findOne.mockResolvedValue(profile);

            await addEducation(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.education).toHaveLength(1);
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile: expect.any(Object) });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    school: 'Test School',
                    degree: 'Bachelor',
                    fieldofstudy: 'Computer Science',
                    from: '2020-01-01',
                    to: '2024-01-01',
                    current: false,
                    description: 'Studied computer science'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await addEducation(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    school: 'Test School',
                    degree: 'Bachelor',
                    fieldofstudy: 'Computer Science',
                    from: '2020-01-01',
                    to: '2024-01-01',
                    current: false,
                    description: 'Studied computer science'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error adding education');
            Profile.findOne.mockRejectedValue(error);

            await addEducation(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });

    describe('deleteEducation', () => {
        it('should delete the education from the profile successfully', async () => {
            const req = {
                user: { id: 'user1' },
                params: { edu_id: 'edu1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                education: [
                    { id: 'edu1', school: 'Test School' },
                    { id: 'edu2', school: 'Another School' }
                ],
                save: jest.fn().mockResolvedValue({
                    user: 'user1',
                    education: [{ id: 'edu2', school: 'Another School' }]
                })
            };

            Profile.findOne.mockResolvedValue(profile);

            await deleteEducation(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.education).toHaveLength(1);
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Education Deleted',
                profile: expect.any(Object)
            });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: { id: 'user1' },
                params: { edu_id: 'edu1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await deleteEducation(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: { id: 'user1' },
                params: { edu_id: 'edu1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting education');
            Profile.findOne.mockRejectedValue(error);

            await deleteEducation(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });

    describe('addCourse', () => {
        it('should add a course to the profile successfully', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    course: 'Test Course',
                    semester: 'Fall 2024',
                    description: 'Course Description'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                courses: [],
                save: jest.fn().mockResolvedValue({
                    user: 'user1',
                    courses: [{
                        course: 'Test Course',
                        semester: 'Fall 2024',
                        description: 'Course Description'
                    }]
                })
            };

            Profile.findOne.mockResolvedValue(profile);

            await addCourse(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.courses).toHaveLength(1);
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile: expect.any(Object) });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    course: 'Test Course',
                    semester: 'Fall 2024',
                    description: 'Course Description'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await addCourse(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: { id: 'user1' },
                body: {
                    course: 'Test Course',
                    semester: 'Fall 2024',
                    description: 'Course Description'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error adding course');
            Profile.findOne.mockRejectedValue(error);

            await addCourse(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });

    describe('deleteCourse', () => {
        it('should delete the course from the profile successfully', async () => {
            const req = {
                user: { id: 'user1' },
                params: { course_id: 'course1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const profile = {
                user: 'user1',
                courses: [
                    { id: 'course1', course: 'Test Course' },
                    { id: 'course2', course: 'Another Course' }
                ],
                save: jest.fn().mockResolvedValue({
                    user: 'user1',
                    courses: [{ id: 'course2', course: 'Another Course' }]
                })
            };

            Profile.findOne.mockResolvedValue(profile);

            await deleteCourse(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(profile.courses).toHaveLength(1);
            expect(profile.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Course Deleted',
                profile: expect.any(Object)
            });
        });

        it('should return 400 if no profile is found', async () => {
            const req = {
                user: { id: 'user1' },
                params: { course_id: 'course1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Profile.findOne.mockResolvedValue(null);

            await deleteCourse(req, res);

            expect(Profile.findOne).toHaveBeenCalledWith({ user: req.user.id });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith([{ msg: 'No Profile Found' }]);
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                user: { id: 'user1' },
                params: { course_id: 'course1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting course');
            Profile.findOne.mockRejectedValue(error);

            await deleteCourse(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: [{ msg: error.message }] });
        });
    });
});
