const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: { type: String, required: true },
    image: { type: String },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    studyGroupID: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String, required: true },
        date: { type: Date, default: Date.now },
    }],
    timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
