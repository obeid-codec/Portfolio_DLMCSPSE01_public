import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as groupReducer from '../../../redux/groups/groups.reducers';
import * as groupActions from '../../../redux/groups/groups.actions';
import * as userReducer from '../../../redux/users/users.reducer';
import Spinner from '../../../layout/misc/spinner/Spinner';
import './GroupList.css'; // Import the custom CSS file

const GroupList = () => {
    const [localGroup, setLocalGroup] = useState({
        name: '',
        description: ''
    });
    const [filter, setFilter] = useState('all');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const { user } = userInfo || {};

    const groupInfo = useSelector((state) => state[groupReducer.groupFeatureKey]);
    const { loading, groups } = groupInfo;

    useEffect(() => {
        if (filter === 'joined') {
            dispatch(groupActions.getGroup());
        } else {
            dispatch(groupActions.getGroups());
        }
    }, [dispatch, filter]);

    const updateInput = (e) => {
        setLocalGroup({
            ...localGroup,
            [e.target.name]: e.target.value
        });
    };

    const submitCreateGroup = (e) => {
        e.preventDefault();
        dispatch(groupActions.createGroup(localGroup, navigate));
        setLocalGroup({
            name: '',
            description: ''
        });
    };

    const clickDeleteGroup = (groupId) => {
        dispatch(groupActions.deleteGroup(groupId)).then(() => {
            dispatch(groupActions.getGroups());
        });
    };

    const clickJoin = (groupId) => {
        dispatch(groupActions.joinGroup(groupId)).then(() => {
            dispatch(groupActions.getGroups());
        });
    };

    const clickLeave = (groupId) => {
        dispatch(groupActions.leaveGroup(groupId)).then(() => {
            dispatch(groupActions.getGroups());
        });
    };

    const showAllGroups = () => {
        setFilter('all');
    };

    const showJoinedGroups = () => {
        setFilter('joined');
    };

    return (
        <Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col text-center">
                            <h3 className="text-teal"><i className="fa fa-users" /> UniConnect Groups</h3>
                            <p className="lead">Join or create study groups to collaborate and share knowledge.</p>
                        </div>
                    </div>
                    {user.isAdmin && (
                        <div className="row mb-4">
                            <div className="col-md-8 mx-auto">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Add a New Study Group</h5>
                                        <form onSubmit={submitCreateGroup}>
                                            <div className="form-group mb-3">
                                                <input
                                                    required
                                                    name="name"
                                                    value={localGroup.name}
                                                    onChange={updateInput}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Group Name"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <textarea
                                                    required
                                                    name="description"
                                                    value={localGroup.description}
                                                    onChange={updateInput}
                                                    rows="3"
                                                    className="form-control"
                                                    placeholder="Description"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-teal">Create Group</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr />
                </div>
            </section>

            <section className="p-3">
                <div className="container mb-4">
                    <div className="row">
                        <div className="col text-center">
                            <button
                                className={`btn ${filter === 'all' ? 'btn-teal' : 'btn-outline-teal'} me-2`}
                                onClick={showAllGroups}
                            >
                                All
                            </button>
                            <button
                                className={`btn ${filter === 'joined' ? 'btn-teal' : 'btn-outline-teal'}`}
                                onClick={showJoinedGroups}
                            >
                                Joined
                            </button>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="container">
                        <div className="row">
                            {groups.length > 0 ? (
                                groups.map((group) => (
                                    <div className="col-lg-4 col-md-6 mb-4" key={group._id}>
                                        <div className="card h-100 shadow-sm">
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{group.name}</h5>
                                                <p className="card-text">{group.description}</p>
                                                {group.members.includes(user._id) && (
                                                    <span className="badge bg-success position-absolute top-0 end-0 m-2">Joined</span>
                                                )}
                                                <div className="mt-auto">
                                                    <Link to={`/groups/${group._id}`} className="btn btn-outline-primary btn-sm me-2 mb-2">
                                                        Visit
                                                    </Link>
                                                    <Link to={`/events/${group._id}`} className="btn btn-outline-secondary btn-sm me-2 mb-2">
                                                        Events
                                                    </Link>
                                                    {user.isAdmin && (
                                                        <>
                                                            <Link to={`/groups/edit/${group._id}`} className="btn btn-outline-warning btn-sm me-2 mb-2">
                                                                Update
                                                            </Link>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm mb-2"
                                                                onClick={() => clickDeleteGroup(group._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                                <Fragment>
                                                    {group.members.includes(user._id) ? (
                                                        <button
                                                            className="btn btn-outline-danger btn-sm mb-2"
                                                            onClick={() => clickLeave(group._id)}
                                                        >
                                                            Leave
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-outline-success btn-sm mb-2"
                                                            onClick={() => clickJoin(group._id)}
                                                        >
                                                            Join
                                                        </button>
                                                    )}
                                                </Fragment>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col text-center">
                                    <p>No groups found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </Fragment>
    );
};

export default GroupList;
