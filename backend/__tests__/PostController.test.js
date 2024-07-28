// __tests__/PostController.test.js

const { getPosts, createPost, deletePost, likePost, unlikePost, commentOnPost, deleteComment, getPostByStudyGroup, getPostById, getPostByUser } = require('../Controllers/PostController');
const Post = require('../models/Post');
const User = require('../models/User');

const mongoose = require('mongoose');

// Mock the Post model
jest.mock('../models/Post');
jest.mock('../models/User');


describe('PostController', () => {
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

    describe('getPosts', () => {
        it('should return all posts successfully', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const posts = [
                {
                    _id: new mongoose.Types.ObjectId(),
                    user: new mongoose.Types.ObjectId(),
                    content: 'Content 1',
                    image: 'image1.png',
                    name: 'User 1',
                    avatar: 'avatar1.png',
                    studyGroupID: new mongoose.Types.ObjectId(),
                    likes: [new mongoose.Types.ObjectId()],
                    comments: [
                        {
                            userID: new mongoose.Types.ObjectId(),
                            content: 'Comment 1',
                            name: 'Commenter 1',
                            avatar: 'commenter1.png',
                            date: new Date()
                        }
                    ],
                    timestamp: new Date()
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    user: new mongoose.Types.ObjectId(),
                    content: 'Content 2',
                    image: 'image2.png',
                    name: 'User 2',
                    avatar: 'avatar2.png',
                    studyGroupID: new mongoose.Types.ObjectId(),
                    likes: [],
                    comments: [],
                    timestamp: new Date()
                }
            ];

            Post.find.mockResolvedValue(posts);

            await getPosts(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ posts });
        });

        it('should handle no posts found', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.find.mockResolvedValue(null);

            await getPosts(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "No posts found" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error fetching posts');
            Post.find.mockRejectedValue(error);

            await getPosts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('createPost', () => {
        it('should create a post successfully', async () => {
            const req = {
                body: {
                    content: 'Content of the post',
                    studyGroupID: new mongoose.Types.ObjectId()
                },
                file: {
                    path: 'public/images/image.png'
                },
                user: {
                    id: new mongoose.Types.ObjectId()
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const user = {
                _id: req.user.id,
                name: 'User Name',
                avatar: 'useravatar.png'
            };

            const savedPost = {
                _id: new mongoose.Types.ObjectId(),
                user: user._id,
                content: 'Content of the post',
                image: 'images/image.png',
                name: 'User Name',
                avatar: 'useravatar.png',
                studyGroupID: req.body.studyGroupID,
                likes: [],
                comments: [],
                timestamp: new Date()
            };

            User.findById.mockResolvedValue(user);
            Post.prototype.save = jest.fn().mockResolvedValue(savedPost);

            await createPost(req, res);

            expect(User.findById).toHaveBeenCalledWith(req.user.id);
            expect(Post.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ post: savedPost });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                body: {
                    content: 'Content of the post',
                    studyGroupID: new mongoose.Types.ObjectId()
                },
                file: {
                    path: 'public/images/image.png'
                },
                user: {
                    id: new mongoose.Types.ObjectId()
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error creating post');
            User.findById.mockRejectedValue(error);

            await createPost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('deletePost', () => {
        it('should delete the post successfully', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                user: 'user1',
                deleteOne: jest.fn().mockResolvedValue(true)
            };

            Post.findById.mockResolvedValue(post);

            await deletePost(req, res);

            expect(Post.findById).toHaveBeenCalledWith(req.params.postId);
            expect(post.deleteOne).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post deleted" });
        });

        it('should handle errors if post not found', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findById.mockResolvedValue(null);

            await deletePost(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post not found" });
        });

        it('should handle errors if user not authorized', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user2'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                user: 'user1',
                deleteOne: jest.fn()
            };

            Post.findById.mockResolvedValue(post);

            await deletePost(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ msg: "User not authorized" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting post');
            Post.findById.mockRejectedValue(error);

            await deletePost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });


    describe('likePost', () => {
        it('should like the post successfully', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                likes: [],
                user: 'user1',
                content: 'Test Content',
                image: 'test.jpg',
                name: 'Test User',
                avatar: 'avatar.jpg',
                studyGroupID: 'studyGroup1',
                comments: [],
                timestamp: new Date(),
                save: jest.fn().mockResolvedValue({
                    _id: '1',
                    likes: ['user1'],
                    user: 'user1',
                    content: 'Test Content',
                    image: 'test.jpg',
                    name: 'Test User',
                    avatar: 'avatar.jpg',
                    studyGroupID: 'studyGroup1',
                    comments: [],
                    timestamp: new Date()
                })
            };

            Post.findById.mockResolvedValue(post);

            await likePost(req, res);

            expect(Post.findById).toHaveBeenCalledWith(req.params.postId);
            expect(post.likes).toContain(req.user.id);
            expect(post.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                post: {
                    _id: '1',
                    likes: ['user1'],
                    user: 'user1',
                    content: 'Test Content',
                    image: 'test.jpg',
                    name: 'Test User',
                    avatar: 'avatar.jpg',
                    studyGroupID: 'studyGroup1',
                    comments: [],
                    timestamp: expect.any(Date) // Match any Date object
                }
            });
        });

        it('should handle errors if post not found', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findById.mockResolvedValue(null);

            await likePost(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post not found" });
        });

        it('should handle errors if post already liked', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                likes: ['user1'],
                save: jest.fn()
            };

            Post.findById.mockResolvedValue(post);

            await likePost(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post already liked" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error liking post');
            Post.findById.mockRejectedValue(error);

            await likePost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('unlikePost', () => {
        it('should unlike the post successfully', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                likes: ['user1', 'user2'],
                user: 'user1',
                content: 'Test Content',
                image: 'test.jpg',
                name: 'Test User',
                avatar: 'avatar.jpg',
                studyGroupID: 'studyGroup1',
                comments: [],
                timestamp: new Date(),
                save: jest.fn().mockResolvedValue({
                    _id: '1',
                    likes: ['user2'],
                    user: 'user1',
                    content: 'Test Content',
                    image: 'test.jpg',
                    name: 'Test User',
                    avatar: 'avatar.jpg',
                    studyGroupID: 'studyGroup1',
                    comments: [],
                    timestamp: new Date()
                })
            };

            Post.findById.mockResolvedValue(post);

            await unlikePost(req, res);

            expect(Post.findById).toHaveBeenCalledWith(req.params.postId);
            expect(post.likes).not.toContain(req.user.id);
            expect(post.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                post: expect.objectContaining({
                    _id: '1',
                    likes: ['user2'],
                    user: 'user1',
                    content: 'Test Content',
                    image: 'test.jpg',
                    name: 'Test User',
                    avatar: 'avatar.jpg',
                    studyGroupID: 'studyGroup1',
                    comments: [],
                    timestamp: expect.any(Date) // Match any Date object
                })
            });
        });

        it('should handle errors if post not found', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findById.mockResolvedValue(null);

            await unlikePost(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post not found" });
        });

        it('should handle errors if post has not been liked', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                likes: ['user2'],
                save: jest.fn()
            };

            Post.findById.mockResolvedValue(post);

            await unlikePost(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post has not been liked" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: {
                    postId: '1'
                },
                user: {
                    id: 'user1'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error unliking post');
            Post.findById.mockRejectedValue(error);

            await unlikePost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('commentOnPost', () => {
        it('should comment on the post successfully', async () => {
            const req = {
                params: { postId: '1' },
                body: { content: 'Test comment' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                comments: [],
                save: jest.fn().mockResolvedValue({
                    _id: '1',
                    comments: [{
                        userID: 'user1',
                        content: 'Test comment',
                        name: 'Test User',
                        avatar: 'avatar.jpg',
                        date: expect.any(Date)
                    }]
                })
            };

            const user = {
                _id: 'user1',
                name: 'Test User',
                avatar: 'avatar.jpg'
            };

            Post.findById.mockResolvedValue(post);
            User.findById.mockResolvedValue(user);

            await commentOnPost(req, res);

            expect(Post.findById).toHaveBeenCalledWith(req.params.postId);
            expect(User.findById).toHaveBeenCalledWith({ _id: req.user.id });
            expect(post.comments.length).toBe(1);
            expect(post.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                post: {
                    _id: '1',
                    comments: [{
                        userID: 'user1',
                        content: 'Test comment',
                        name: 'Test User',
                        avatar: 'avatar.jpg',
                        date: expect.any(Date)
                    }]
                }
            });
        });

        it('should handle errors if post not found', async () => {
            const req = {
                params: { postId: '1' },
                body: { content: 'Test comment' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findById.mockResolvedValue(null);

            await commentOnPost(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post not found" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: { postId: '1' },
                body: { content: 'Test comment' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error commenting on post');
            Post.findById.mockRejectedValue(error);

            await commentOnPost(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });


    describe('deleteComment', () => {
        it('should delete the comment successfully', async () => {
            const req = {
                params: { postId: '1', commentId: 'comment1' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                comments: [
                    {
                        id: 'comment1',
                        userID: 'user1',
                        content: 'Test Comment',
                        name: 'Test User',
                        avatar: 'avatar.jpg',
                        date: new Date()
                    },
                    {
                        id: 'comment2',
                        userID: 'user2',
                        content: 'Another Comment',
                        name: 'Another User',
                        avatar: 'avatar2.jpg',
                        date: new Date()
                    }
                ],
                save: jest.fn().mockResolvedValue({
                    _id: '1',
                    comments: [
                        {
                            id: 'comment2',
                            userID: 'user2',
                            content: 'Another Comment',
                            name: 'Another User',
                            avatar: 'avatar2.jpg',
                            date: new Date()
                        }
                    ]
                })
            };

            Post.findById.mockResolvedValue(post);

            await deleteComment(req, res);

            // Remove 'save' function from the expected post object
            const expectedPost = {
                _id: '1',
                comments: [
                    {
                        id: 'comment2',
                        userID: 'user2',
                        content: 'Another Comment',
                        name: 'Another User',
                        avatar: 'avatar2.jpg',
                        date: expect.any(Date) // Match any Date object
                    }
                ]
            };

            expect(Post.findById).toHaveBeenCalledWith(req.params.postId);
            expect(post.comments.length).toBe(1);
            expect(post.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: "Comment deleted",
                post: expect.objectContaining({
                    _id: '1',
                    comments: expect.arrayContaining([
                        expect.objectContaining({
                            id: 'comment2',
                            userID: 'user2',
                            content: 'Another Comment',
                            name: 'Another User',
                            avatar: 'avatar2.jpg',
                            date: expect.any(Date)
                        })
                    ])
                })
            });
        });

        it('should handle errors if post not found', async () => {
            const req = {
                params: { postId: '1', commentId: 'comment1' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findById.mockResolvedValue(null);

            await deleteComment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "Post not found" });
        });

        it('should handle errors if comment not found', async () => {
            const req = {
                params: { postId: '1', commentId: 'comment3' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                comments: [
                    {
                        id: 'comment1',
                        userID: 'user1',
                        content: 'Test Comment',
                        name: 'Test User',
                        avatar: 'avatar.jpg',
                        date: new Date()
                    }
                ]
            };

            Post.findById.mockResolvedValue(post);

            await deleteComment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "Comment not found" });
        });

        it('should handle authorization errors if user is not the comment owner', async () => {
            const req = {
                params: { postId: '1', commentId: 'comment1' },
                user: { id: 'user2' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                comments: [
                    {
                        id: 'comment1',
                        userID: 'user1',
                        content: 'Test Comment',
                        name: 'Test User',
                        avatar: 'avatar.jpg',
                        date: new Date()
                    }
                ]
            };

            Post.findById.mockResolvedValue(post);

            await deleteComment(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ msg: "User not authorized" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: { postId: '1', commentId: 'comment1' },
                user: { id: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error deleting comment');
            Post.findById.mockRejectedValue(error);

            await deleteComment(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

    describe('getPostByStudyGroup', () => {
        it('should return all posts for a given study group ID', async () => {
            const req = {
                params: { studyGroupId: 'studyGroup1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const posts = [
                {
                    _id: '1',
                    user: 'user1',
                    content: 'Content 1',
                    image: 'image1.jpg',
                    name: 'User 1',
                    avatar: 'avatar1.jpg',
                    studyGroupID: 'studyGroup1',
                    likes: [],
                    comments: [],
                    timestamp: new Date()
                },
                {
                    _id: '2',
                    user: 'user2',
                    content: 'Content 2',
                    image: 'image2.jpg',
                    name: 'User 2',
                    avatar: 'avatar2.jpg',
                    studyGroupID: 'studyGroup1',
                    likes: [],
                    comments: [],
                    timestamp: new Date()
                }
            ];

            Post.find.mockResolvedValue(posts);

            await getPostByStudyGroup(req, res);

            expect(Post.find).toHaveBeenCalledWith({ studyGroupID: req.params.studyGroupId });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ posts });
        });

        it('should handle errors if no posts are found', async () => {
            const req = {
                params: { studyGroupId: 'studyGroup1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.find.mockResolvedValue(null);

            await getPostByStudyGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "No posts found" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: { studyGroupId: 'studyGroup1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error finding posts');
            Post.find.mockRejectedValue(error);

            await getPostByStudyGroup(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });


    describe('getPostById', () => {
        it('should return the post for a given post ID', async () => {
            const req = {
                params: { postId: '1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const post = {
                _id: '1',
                user: 'user1',
                content: 'Content 1',
                image: 'image1.jpg',
                name: 'User 1',
                avatar: 'avatar1.jpg',
                studyGroupID: 'studyGroup1',
                likes: [],
                comments: [],
                timestamp: new Date()
            };

            Post.findById.mockResolvedValue(post);

            await getPostById(req, res);

            expect(Post.findById).toHaveBeenCalledWith(req.params.postId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ post });
        });

        it('should handle errors if no post is found', async () => {
            const req = {
                params: { postId: '1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.findById.mockResolvedValue(null);

            await getPostById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'No Post Found' }] });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: { postId: '1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error finding post');
            Post.findById.mockRejectedValue(error);

            await getPostById(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: error.message }] });
        });
    });

    describe('getPostByUser', () => {
        it('should return all posts for a given user ID', async () => {
            const req = {
                params: { userId: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const posts = [
                {
                    _id: '1',
                    user: 'user1',
                    content: 'Content 1',
                    image: 'image1.jpg',
                    name: 'User 1',
                    avatar: 'avatar1.jpg',
                    studyGroupID: 'studyGroup1',
                    likes: [],
                    comments: [],
                    timestamp: new Date()
                },
                {
                    _id: '2',
                    user: 'user1',
                    content: 'Content 2',
                    image: 'image2.jpg',
                    name: 'User 1',
                    avatar: 'avatar1.jpg',
                    studyGroupID: 'studyGroup2',
                    likes: [],
                    comments: [],
                    timestamp: new Date()
                }
            ];

            Post.find.mockResolvedValue(posts);

            await getPostByUser(req, res);

            expect(Post.find).toHaveBeenCalledWith({ user: req.params.userId });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ posts });
        });

        it('should handle errors if no posts are found', async () => {
            const req = {
                params: { userId: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Post.find.mockResolvedValue(null);

            await getPostByUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: "No posts found" });
        });

        it('should handle errors if an exception occurs', async () => {
            const req = {
                params: { userId: 'user1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const error = new Error('Error finding posts');
            Post.find.mockRejectedValue(error);

            await getPostByUser(req, res);

            expect(console.error).toHaveBeenCalledWith(error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ msg: error.message });
        });
    });

});
