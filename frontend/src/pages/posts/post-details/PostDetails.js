import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as postReducer from '../../../redux/posts/post.reducer';
import * as postActions from '../../../redux/posts/post.actions';
import * as userReducer from '../../../redux/users/users.reducer';
import Spinner from '../../../layout/misc/spinner/Spinner';
import './PostDetails.css'; // Import the custom CSS file

const PostDetails = () => {
    const [comment, setComment] = useState({
        content: ''
    });

    const dispatch = useDispatch();
    const { postId } = useParams();

    const postInfo = useSelector((state) => state[postReducer.postFeatureKey]);
    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const { user } = userInfo;

    const { loading, selectedPost } = postInfo;

    useEffect(() => {
        dispatch(postActions.getPost(postId));
    }, [dispatch, postId]);

    const submitCreateComment = (e) => {
        e.preventDefault();
        dispatch(postActions.createComment(comment, postId));
        setComment({
            content: ''
        });
    };

    const clickDeleteComment = (commentId) => {
        dispatch(postActions.deleteComment(postId, commentId));
    };

    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <section className="p-3">
                        <div className="container">
                            <div className="row mb-3">
                                <div className="col">
                                    <Link to="/posts" className="btn btn-light btn-sm">Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {selectedPost && Object.keys(selectedPost).length > 0 && (
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2 d-flex flex-column align-items-center">
                                                        <img src={selectedPost.avatar} alt="" className="rounded-circle mb-2" width="60" height="60" />
                                                        <small className="text-muted">{selectedPost.name}</small>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div className="col-md-6">
                                                            <img src={`http://127.0.0.1:3000/${selectedPost.image}`} alt="" className="img-fluid d-block m-auto" />
                                                        </div>
                                                        <p>{selectedPost.text}</p>
                                                        <small className="text-muted">{new Date(selectedPost.timestamp).toLocaleString()}</small>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <form onSubmit={submitCreateComment}>
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text">
                                                                    <img src={user.avatar} alt="" width="40" height="40" className="rounded-circle" />
                                                                </span>
                                                                <textarea
                                                                    required
                                                                    name="content"
                                                                    value={comment.content}
                                                                    onChange={(e) => setComment({ content: e.target.value })}
                                                                    rows="2"
                                                                    className="form-control"
                                                                    placeholder="What's on your mind..."
                                                                />
                                                            </div>
                                                            <div>
                                                                <button type="submit" className="btn btn-teal btn-sm">Comment</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {selectedPost && selectedPost.comments && selectedPost.comments.length > 0 && (
                        <section className="p-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        {selectedPost.comments.map((comment) => (
                                            <div className="card mb-3" key={comment._id}>
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-2 d-flex flex-column align-items-center">
                                                            <img src={comment.avatar} alt="" className="rounded-circle mb-2" width="50" height="50" />
                                                            <small className="text-muted">{comment.name}</small>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <p className="mb-1">{comment.content}</p>
                                                            <small className="text-muted">{new Date(comment.date).toLocaleString()}</small>
                                                        </div>
                                                        {comment.userID === user._id && (
                                                            <div className="col-md-1 text-end">
                                                                <button
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() => clickDeleteComment(comment._id)}
                                                                >
                                                                    <i className="fa fa-times-circle" /> Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default PostDetails;
