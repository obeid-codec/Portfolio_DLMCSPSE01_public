const express = require('express');
const { getPosts, createPost, deletePost, getPostByStudyGroup, getPostByUser, likePost, unlikePost, commentOnPost, deleteComment, getPostById } = require('../Controllers/PostController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const uploadMulter = require('../middlewares/imageUploader')


/* create post */
router.post('/new', authenticate, uploadMulter.single("image"), createPost);

/* delete post */
router.delete('/delete/:postId', authenticate, deletePost);

/* GET all posts Decs */
router.get('/', authenticate, getPosts);


/* get post by post id */
router.get('/:postId', authenticate, getPostById);




/* get post by studyGroup id */
router.get('/studyGroup/:studyGroupId', authenticate, getPostByStudyGroup);


/* get post by user id */
router.get('/user/:userId', authenticate, getPostByUser);

/* like post */
router.put('/like/:postId', authenticate, likePost);

/* unlike post */
router.put('/unlike/:postId', authenticate, unlikePost);

/* comment on post */
router.put('/comment/:postId', authenticate, commentOnPost);

/* delete comment */

router.delete('/comment/:postId/:commentId', authenticate, deleteComment);

module.exports = router;