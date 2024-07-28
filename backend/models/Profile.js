const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    courses: [{
        course: { type: String },
        semester: { type: String },
        description: { type: String }
    }],
    education: [{
        school: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: String },
        to: { type: String },
        current: { type: Boolean },
        description: { type: String }
    }],
    experience: [
        {
            title: { type: String },
            company: { type: String },
            location: { type: String },
            from: { type: String },
            to: { type: String },
            current: { type: Boolean },
            description: { type: String }
        }
    ],
    social: {
        youtube: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
    }
}, { timestamps: true });

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
