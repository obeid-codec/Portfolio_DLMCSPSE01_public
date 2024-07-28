// __tests__/EventController.test.js

const { createEvent, getEvents, getEvent, getEventsByGroup, deleteEvent } = require('../Controllers/EventController');
const Event = require('../models/Event');
const mongoose = require('mongoose');

// Mock the Event model
jest.mock('../models/Event');

describe('EventController', () => {
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

    describe('createEvent', () => {
        it('should create an event successfully', async () => {
            const req = {
                body: {
                    name: 'Test Event',
                    description: 'Event Description',
                    eventDate: '2024-07-12',
                    location: 'Test Location',
                    relatedGroupID: 'studyGroup1'
                },
                user: {
                    id: 'user1'
                },
                file: {
                    path: 'public/test.jpg'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const event = {
                _id: '1',
                name: 'Test Event',
                image: 'test.jpg',
                description: 'Event Description',
                eventDate: '2024-07-12',
                location: 'Test Location',
                relatedGroupID: 'studyGroup1',
                user: 'user1',
                createdOn: new Date()
            };

            Event.prototype.save = jest.fn().mockResolvedValue(event);

            await createEvent(req, res);

            expect(Event.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Event Upload is Successful',
                event
            });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                body: {
                    name: 'Test Event',
                    description: 'Event Description',
                    eventDate: '2024-07-12',
                    location: 'Test Location',
                    relatedGroupID: 'studyGroup1'
                },
                user: {
                    id: 'user1'
                },
                file: {
                    path: 'public/test.jpg'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error creating event');
            Event.prototype.save = jest.fn().mockRejectedValue(error);

            await createEvent(req, res);

            expect(console.error).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: error.message }]
            });
        });
    });



    describe('getEvents', () => {
        it('should return all events successfully', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const events = [
                {
                    _id: '1',
                    name: 'Event 1',
                    image: 'image1.jpg',
                    description: 'Description 1',
                    eventDate: '2024-07-12',
                    location: 'Location 1',
                    relatedGroupID: 'studyGroup1',
                    user: 'user1',
                    createdOn: new Date()
                },
                {
                    _id: '2',
                    name: 'Event 2',
                    image: 'image2.jpg',
                    description: 'Description 2',
                    eventDate: '2024-08-15',
                    location: 'Location 2',
                    relatedGroupID: 'studyGroup2',
                    user: 'user2',
                    createdOn: new Date()
                }
            ];

            Event.find.mockResolvedValue(events);

            await getEvents(req, res);

            expect(Event.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'All Events',
                events
            });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error fetching events');
            Event.find.mockRejectedValue(error);

            await getEvents(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: error.message }]
            });
        });
    });

    describe('getEvent', () => {
        it('should return the specific event successfully', async () => {
            const req = {
                params: {
                    eventId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const event = {
                _id: '1',
                name: 'Event 1',
                image: 'image1.jpg',
                description: 'Description 1',
                eventDate: '2024-07-12',
                location: 'Location 1',
                relatedGroupID: 'studyGroup1',
                user: 'user1',
                createdOn: new Date()
            };

            Event.findById.mockResolvedValue(event);

            await getEvent(req, res);

            expect(Event.findById).toHaveBeenCalledWith(req.params.eventId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Event',
                event
            });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    eventId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error fetching event');
            Event.findById.mockRejectedValue(error);

            await getEvent(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: error.message }]
            });
        });

        it('should handle errors if the event is not found', async () => {
            const req = {
                params: {
                    eventId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Event.findById.mockResolvedValue(null);

            await getEvent(req, res);

            expect(Event.findById).toHaveBeenCalledWith(req.params.eventId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: 'Event not found' }]
            });
        });
    });

    describe('getEventsByGroup', () => {
        it('should return all events by the related group ID successfully', async () => {
            const req = {
                params: {
                    groupId: 'studyGroup1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const events = [
                {
                    _id: '1',
                    name: 'Event 1',
                    image: 'image1.jpg',
                    description: 'Description 1',
                    eventDate: '2024-07-12',
                    location: 'Location 1',
                    relatedGroupID: 'studyGroup1',
                    user: 'user1',
                    createdOn: new Date()
                },
                {
                    _id: '2',
                    name: 'Event 2',
                    image: 'image2.jpg',
                    description: 'Description 2',
                    eventDate: '2024-08-15',
                    location: 'Location 2',
                    relatedGroupID: 'studyGroup1',
                    user: 'user2',
                    createdOn: new Date()
                }
            ];

            Event.find.mockResolvedValue(events);

            await getEventsByGroup(req, res);

            expect(Event.find).toHaveBeenCalledWith({ relatedGroupID: req.params.groupId });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Events',
                events
            });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    groupId: 'studyGroup1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error fetching events by group');
            Event.find.mockRejectedValue(error);

            await getEventsByGroup(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: error.message }]
            });
        });
    });

    describe('deleteEvent', () => {
        it('should delete the event successfully', async () => {
            const req = {
                params: {
                    eventId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Event.findByIdAndDelete.mockResolvedValue({});

            await deleteEvent(req, res);

            expect(Event.findByIdAndDelete).toHaveBeenCalledWith(req.params.eventId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Event Deleted' });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    eventId: '1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting event');
            Event.findByIdAndDelete.mockRejectedValue(error);

            await deleteEvent(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: error.message }]
            });
        });
    });

});
