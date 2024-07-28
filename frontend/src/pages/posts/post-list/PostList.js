import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as postReducer from '../../../redux/posts/post.reducer';
import * as postActions from '../../../redux/posts/post.actions';
import * as userReducer from '../../../redux/users/users.reducer';
import * as groupReducer from '../../../redux/groups/groups.reducers';
import * as groupActions from '../../../redux/groups/groups.actions';
import Spinner from '../../../layout/misc/spinner/Spinner';
import './PostList.css'; // Import the custom CSS file

const PostList = () => {
    const [localPost, setLocalPost] = useState({
        content: '',
        image: null,
        studyGroupID: ''
    });

    const fileInputRef = useRef(null);
    const { groupId, studentId } = useParams();

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const { user } = userInfo || {};

    const postInfo = useSelector((state) => state[postReducer.postFeatureKey]);
    const { loading, posts } = postInfo || { loading: false, posts: [] };

    const groupInfo = useSelector((state) => state[groupReducer.groupFeatureKey]);
    const { groups } = groupInfo || { groups: [] };

    useEffect(() => {
        if (studentId) {
            dispatch(postActions.getPostsbyUser(studentId));
            setLocalPost({
                content: '',
                image: null,
                studyGroupID: ''
            });
        } else if (groupId) {
            dispatch(postActions.getPostsbyGroup(groupId));
            setLocalPost((prevPost) => ({
                ...prevPost,
                studyGroupID: groupId
            }));
        } else {
            dispatch(postActions.getAllPosts());
            setLocalPost({
                content: '',
                image: null,
                studyGroupID: ''
            });
        }
    }, [dispatch, groupId, studentId]);

    useEffect(() => {
        dispatch(groupActions.getGroups());
    }, [dispatch]);

    const updateInput = (e) => {
        const { name, value } = e.target;
        setLocalPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setLocalPost((prevPost) => ({
            ...prevPost,
            image: e.target.files[0]
        }));
    };

    const submitCreatePost = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', localPost.content);
        formData.append('image', localPost.image);
        formData.append('studyGroupID', localPost.studyGroupID);

        dispatch(postActions.createPost(formData));

        // Reset the form and file input
        setLocalPost({
            content: '',
            image: null,
            studyGroupID: ''
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Fetch posts again after creating a new post
        if (groupId) {
            dispatch(postActions.getPostsbyGroup(groupId));
        } else if (studentId) {
            dispatch(postActions.getPostsbyUser(studentId));
        } else {
            dispatch(postActions.getAllPosts());
        }
    };

    const clickDeletePost = (postId) => {
        dispatch(postActions.deletePost(postId)).then(() => {
            if (groupId) {
                dispatch(postActions.getPostsbyGroup(groupId));
            } else if (studentId) {
                dispatch(postActions.getPostsbyUser(studentId));
            } else {
                dispatch(postActions.getAllPosts());
            }
        });
    };

    const clickLikePost = (postId) => {
        dispatch(postActions.likePost(postId));
    };

    const clickUnLikePost = (postId) => {
        dispatch(postActions.unlikePost(postId));
    };

    const getGroupNameById = (groupId) => {
        const group = groups.find((group) => group._id === groupId);
        return group ? group.name : 'Unknown Group';
    };

    return (
        <Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className="text-teal">Welcome to UniConnect</h3>
                        </div>
                    </div>
                    {user && Object.keys(user).length > 0 && (
                        <div className="row mb-4">
                            <div className="col-md-8">
                                <form onSubmit={submitCreatePost}>
                                    <div className="mb-3 d-flex align-items-center">
                                        <img src={user.avatar} alt="" width="50" height="50" className="rounded-circle me-3" />
                                        <textarea
                                            required
                                            name="content"
                                            value={localPost.content}
                                            onChange={updateInput}
                                            rows="3"
                                            className="form-control"
                                            placeholder="What's on your mind..."
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            name="image"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            type="file"
                                            className="form-control"
                                            placeholder="Image"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            id="groupSelect"
                                            name="studyGroupID"
                                            value={localPost.studyGroupID}
                                            onChange={updateInput}
                                            className="form-control"
                                        >
                                            <option value="" disabled>Select a group</option>
                                            {groups.map((group) => (
                                                <option key={group._id} value={group._id}>{group.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-teal">Post</button>
                                </form>
                            </div>
                        </div>
                    )}
                    <hr />
                </div>
            </section>
            <section>
                {loading ? <Spinner /> : (
                    <Fragment>
                        {posts && posts.length > 0 ? (
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        {posts.map((post) => (
                                            <div className="card my-3" key={post._id}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-2 d-flex flex-column align-items-center">
                                                            <img src={post.avatar} alt="" className="rounded-circle mb-2" width="60" height="60" />
                                                            <small className="text-muted">{post.name}</small>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-10">
                                                                    <img src={`http://127.0.0.1:3000/${post.image}`} alt="" className="img-fluid d-block m-auto mb-2" />
                                                                </div>
                                                            </div>
                                                            <p>{post.content}</p>
                                                            <small className="text-muted">{new Date(post.timestamp).toLocaleString()}</small>
                                                            <div className="mt-2 d-flex align-items-center">
                                                                <button className="btn btn-outline-success btn-sm me-2" onClick={() => clickLikePost(post._id)}>
                                                                    <i className="fa fa-thumbs-up" /> {post.likes.length}
                                                                </button>
                                                                <button className="btn btn-outline-danger btn-sm me-2" onClick={() => clickUnLikePost(post._id)}>
                                                                    <i className="fa fa-thumbs-down" />
                                                                </button>
                                                                <Link to={`/posts/${post._id}`} className="btn btn-outline-primary btn-sm me-2">
                                                                    <i className="fab fa-facebook-messenger" /> Discussions {post.comments.length}
                                                                </Link>
                                                                {post.user === user._id && (
                                                                    <button className="btn btn-outline-warning btn-sm" onClick={() => clickDeletePost(post._id)}>
                                                                        <i className="fa fa-times-circle" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 text-end d-flex flex-column justify-content-center">
                                                            <p className="mb-0"><strong>Group:</strong> {getGroupNameById(post.studyGroupID)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p>No posts found</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>
                )}
            </section>
        </Fragment>
    );
};

export default PostList;
