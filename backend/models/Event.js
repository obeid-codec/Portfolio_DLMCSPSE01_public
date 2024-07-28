const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String, required: true },
    location: { type: String, required: true },
    relatedGroupID: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup' },
    createdOn: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
