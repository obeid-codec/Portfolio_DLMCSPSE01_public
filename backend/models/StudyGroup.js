const mongoose = require('mongoose');

const StudyGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const StudyGroup = mongoose.model('StudyGroup', StudyGroupSchema);
module.exports = StudyGroup;
