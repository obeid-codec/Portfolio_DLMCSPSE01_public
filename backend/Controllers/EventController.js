const Event = require('../models/Event');



// Create an event
const createEvent = async (req, res) => {
    try {
        let { name, description, eventDate, location, relatedGroupID } = req.body;
        let user = req.user.id;
        let image = req.file.path.replace(/^public\//, '');

        let event = new Event({ name, image, description, eventDate, location, relatedGroupID, user });

        event = await event.save();
        res.status(200).json({
            msg: 'Event Upload is Successful',
            event: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error.message
                }
            ]
        });
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            msg: 'All Events',
            events: events
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error.message
                }
            ]
        });
    }
};
// Get a single event
const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({
                errors: [{ msg: 'Event not found' }]
            });
        }
        res.status(200).json({
            msg: 'Event',
            event: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error.message
                }
            ]
        });
    }
}

// Get all events by a related group Id

const getEventsByGroup = async (req, res) => {
    try {
        const events = await Event.find({ relatedGroupID: req.params.groupId });
        res.status(200).json({
            msg: 'Events',
            events: events
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            errors: [
                {
                    msg: error.message
                }
            ]
        });
    }
}



// Delete an event

const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.eventId);
        res.status(200).json({
            msg: 'Event Deleted'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error.message
                }
            ]
        });
    }
}


module.exports = {
    createEvent: createEvent,
    getEvents: getEvents,
    getEvent: getEvent,
    getEventsByGroup: getEventsByGroup,
    // updateEvent: updateEvent,
    deleteEvent: deleteEvent

}