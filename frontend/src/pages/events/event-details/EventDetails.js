import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../../redux/events/event.actions';
import * as eventReducer from '../../../redux/events/event.reducer';
import * as groupReducer from '../../../redux/groups/groups.reducers';
import * as groupActions from '../../../redux/groups/groups.actions';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../../layout/misc/spinner/Spinner';
import './EventDetails.css'; // Import custom CSS for additional styling

const EventDetails = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();

    const eventsInfo = useSelector((state) => state[eventReducer.eventFeatureKey]);
    const { loading, SelectedEvent } = eventsInfo;

    const groupInfo = useSelector((state) => state[groupReducer.groupFeatureKey]);
    const { groups } = groupInfo;

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId));
    }, [dispatch, eventId]);

    useEffect(() => {
        dispatch(groupActions.getGroups());
    }, [dispatch]);

    const getGroupNameById = (groupId) => {
        const group = groups.find(group => group._id === groupId);
        return group ? group.name : 'Unknown Group';
    };

    if (loading || !SelectedEvent) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card event-card shadow-lg">
                            <img src={`http://127.0.0.1:3000/${SelectedEvent.image}`} alt={SelectedEvent.name} className="card-img-top event-img" />
                            <div className="card-body">
                                <h2 className="card-title text-teal">{SelectedEvent.name}</h2>
                                <p className="card-text"><strong>Date:</strong> {new Date(SelectedEvent.eventDate).toLocaleString()}</p>
                                <p className="card-text"><strong>Group:</strong> {getGroupNameById(SelectedEvent.relatedGroupID)}</p>
                                <p className="card-text event-description">{SelectedEvent.description}</p>
                                <Link to="/events" className="btn btn-teal mt-3">Back to Events</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EventDetails;
