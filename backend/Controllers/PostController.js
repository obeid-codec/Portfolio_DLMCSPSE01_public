const Post = require('../models/Post');
const User = require('../models/User');


/* GET all posts */
const getPosts = async (req, res) => {
    try {
        let posts = await Post.find();
        if (!posts) {
            return res.status(404).json({
                msg: "No posts found"
            });
        }

        return res.status(200).json({
            posts: posts
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

/* create post */
const createPost = async (req, res) => {
    try {
        let { content, studyGroupID } = req.body;
        let image = req.file.path.replace(/^public\//, '');

        let user = await User.findById(req.user.id);
        let newPost =
        {
            user: user._id,
            content: content,
            image: image,
            name: user.name,
            avatar: user.avatar,
            content: req.body.content,
            studyGroupID: studyGroupID
        };
        let post = new Post(newPost);
        post = await post.save();
        return res.status(200).json({
            post: post
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}


/* delete post */
const deletePost = async (req, res) => {
    try {
        let { postId } = req.params;
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                msg: "Post not found"
            });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "User not authorized"
            });
        }
        post = await post.deleteOne();
        return res.status(200).json({
            msg: "Post deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}


/* like post */

const likePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                msg: "Post not found"
            });
        }
        if (post.likes.includes(req.user.id)) {
            return res.status(400).json({
                msg: "Post already liked"
            });
        }
        post.likes.unshift(req.user.id);
        post = await post.save();
        return res.status(200).json({
            post: post
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

/* unlike post */

const unlikePost = async (req, res) => {
    try {
        let { postId } = req.params;
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                msg: "Post not found"
            });
        }
        const userIndex = post.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            return res.status(400).json({
                msg: "Post has not been liked"
            });
        }


        // unlike the post
        post.likes.splice(userIndex, 1);
        await post.save();
        res.status(200).json({ post: post });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}


/* comment on post */

const commentOnPost = async (req, res) => {
    try {
        let { postId } = req.params;
        let { content } = req.body;
        let post = await Post.findById(postId);
        let user = await User.findById({ _id: req.user.id });
        if (!post) {
            return res.status(404).json({
                msg: "Post not found"
            });
        }
        let newComment = {
            userID: req.user.id,
            content: content,
            name: user.name,
            avatar: user.avatar
        };
        post.comments.unshift(newComment);
        post = await post.save();
        return res.status(200).json({
            post: post
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

/* delete comment */

const deleteComment = async (req, res) => {
    try {
        let { postId, commentId } = req.params;
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                msg: "Post not found"
            });
        }
        let comment = post.comments.find(comment => comment.id === commentId);
        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found"
            });
        }
        if (comment.userID.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "User not authorized"
            });
        }
        let removableIndex = post.comments.findIndex(c => c.id === commentId);
        if (removableIndex !== -1) {
            post.comments.splice(removableIndex, 1);
            await post.save();
            return res.status(200).json({
                msg: "Comment deleted",
                post: post
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

/* get post by studyGroup id */
const getPostByStudyGroup = async (req, res) => {
    try {
        let { studyGroupId } = req.params;
        let posts = await Post.find({
            studyGroupID: studyGroupId
        });
        if (!posts) {
            return res.status(404).json({
                msg: "No posts found"
            });
        }
        return res.status(200).json({
            posts: posts
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}


/* get post by post id */

const getPostById = async (req, res) => {
    try {
        let { postId } = req.params;
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ errors: [{ msg: 'No Post Found' }] });
        }
        return res.status(200).json({
            post: post
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: error.message }] });
    }
}



/* get post by user id */

const getPostByUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let posts = await Post.find
            ({
                user: userId
            });
        if (!posts) {
            return res.status(404).json({
                msg: "No posts found"
            });
        }
        return res.status(200).json({
            posts: posts
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {
    getPosts: getPosts,
    createPost: createPost,
    deletePost: deletePost,
    likePost: likePost,
    unlikePost: unlikePost,
    commentOnPost: commentOnPost,
    deleteComment: deleteComment,
    getPostByStudyGroup: getPostByStudyGroup,
    getPostByUser: getPostByUser,
    getPostById: getPostById

}
