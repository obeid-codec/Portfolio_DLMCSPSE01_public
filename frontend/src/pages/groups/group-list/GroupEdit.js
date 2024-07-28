import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as groupReducer from '../../../redux/groups/groups.reducers';
import * as groupActions from '../../../redux/groups/groups.actions';
import * as userReducer from '../../../redux/users/users.reducer';
import Spinner from '../../../layout/misc/spinner/Spinner';

const GroupEdit = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [localGroup, setLocalGroup] = useState({
        name: '',
        description: '',
    });

    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const { user } = userInfo || {};

    const groupInfo = useSelector((state) => state[groupReducer.groupFeatureKey]);
    const { loading, selectedGroup } = groupInfo;

    useEffect(() => {
        dispatch(groupActions.getSpecificGroup(groupId));
    }, [dispatch, groupId]);

    useEffect(() => {
        if (selectedGroup) {
            setLocalGroup({
                name: selectedGroup.name,
                description: selectedGroup.description,
            });
        }
    }, [selectedGroup]);

    const updateInput = (e) => {
        setLocalGroup({
            ...localGroup,
            [e.target.name]: e.target.value,
        });
    };

    const submitEditGroup = (e) => {
        e.preventDefault();
        dispatch(groupActions.updateGroup(groupId, localGroup, navigate));
    };

    return (
        <Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h3 className="text-teal">
                                <i className="fa fa-users-cog" /> UniConnect Group Edit
                            </h3>
                            <p className="lead">Edit Study Group</p>
                        </div>
                    </div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="row">
                            {Object.keys(user).length > 0 && user.isAdmin && (
                                <div className="col-md-8 mx-auto">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <form onSubmit={submitEditGroup}>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Group Name</label>
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
                                                    <label htmlFor="description">Description</label>
                                                    <textarea
                                                        required
                                                        name="description"
                                                        value={localGroup.description}
                                                        onChange={updateInput}
                                                        rows="4"
                                                        className="form-control"
                                                        placeholder="Description.."
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-teal btn-block">Edit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export default GroupEdit;
