import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as eventActions from '../../../redux/events/event.actions';
import * as eventReducer from '../../../redux/events/event.reducer';
import * as userReducer from '../../../redux/users/users.reducer';
import * as groupReducer from '../../../redux/groups/groups.reducers';
import * as groupActions from '../../../redux/groups/groups.actions';
import Spinner from '../../../layout/misc/spinner/Spinner';

const Upload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const { user } = userInfo || {};

    const groupInfo = useSelector((state) => state[groupReducer.groupFeatureKey]);
    const { groups, loading } = groupInfo;

    const [event, setEvent] = useState({
        name: "",
        image: "",
        description: "",
        eventDate: "",
        location: "",
        relatedGroupID: '',
    });

    useEffect(() => {
        dispatch(groupActions.getGroups());
    }, [dispatch]);

    const updateInput = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setEvent({
            ...event,
            image: e.target.files[0]
        });
    };

    const submitUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', event.name);
        formData.append('image', event.image);
        formData.append('description', event.description);
        formData.append('eventDate', event.eventDate);
        formData.append('location', event.location);
        formData.append('relatedGroupID', event.relatedGroupID);

        dispatch(eventActions.createEvent(formData, navigate));
        setEvent({
            name: "",
            image: "",
            description: "",
            eventDate: "",
            location: "",
            relatedGroupID: '',
        });
    };

    const getGroupNameById = (groupId) => {
        const group = groups.find(group => group._id === groupId);
        return group ? group.name : 'Unknown Group';
    };

    return (
        <Fragment>
            <section className="p-3 upload-header">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className="text-teal">
                                <i className="fa fa-file-upload" /> Create an Event
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus molestiae omnis quis! Autem commodi cum, doloremque ducimus et illo incidunt ipsa laboriosam magni natus nostrum nulla odio omnis praesentium recusandae, sit soluta ullam voluptatem?</p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? (
                <Spinner />
            ) : (
                user?.isAdmin ? (
                    <Fragment>
                        <section className="upload-form-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <form onSubmit={submitUpload}>
                                            <div className="form-group mb-3">
                                                <input
                                                    name="name"
                                                    value={event.name}
                                                    onChange={updateInput}
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input
                                                    name="image"
                                                    onChange={handleFileChange}
                                                    required
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Image"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <select
                                                    name="relatedGroupID"
                                                    value={event.relatedGroupID}
                                                    onChange={updateInput}
                                                    required
                                                    className="form-control"
                                                >
                                                    <option value="" disabled>Select a group</option>
                                                    {groups.map((group) => (
                                                        <option key={group._id} value={group._id}>{group.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group mb-3">
                                                <input
                                                    name="location"
                                                    value={event.location}
                                                    onChange={updateInput}
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Location"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input
                                                    name="eventDate"
                                                    value={event.eventDate}
                                                    onChange={updateInput}
                                                    required
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <textarea
                                                    name="description"
                                                    value={event.description}
                                                    onChange={updateInput}
                                                    rows="4"
                                                    className="form-control"
                                                    placeholder="Description"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="submit" className="btn btn-teal" value="Upload" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Fragment>
                ) : (
                    <Fragment>
                        <section className="p-3 text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h4 text-danger">You are not Authorized to Upload</p>
                                        <small>If you are an admin, please contact your DBA to allow access</small>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Fragment>
                )
            )}
        </Fragment>
    );
};

export default Upload;
