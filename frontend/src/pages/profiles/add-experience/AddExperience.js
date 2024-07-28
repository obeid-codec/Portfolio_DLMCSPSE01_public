import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as profileActions from '../../../redux/profiles/profile.actions';
import './AddExperience.css';  // Assuming you have a separate CSS file for styling

const AddExperience = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [experience, setExperience] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const updateInput = (e) => {
        const { name, value, type, checked } = e.target;
        setExperience({
            ...experience,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const submitAddExperience = (e) => {
        e.preventDefault();
        dispatch(profileActions.addExperience(experience, navigate));
    };

    return (
        <Fragment>
            <section className="p-3 add-experience-header">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h3 className="text-teal">
                                <i className="fa fa-user-clock" /> Add Experience
                            </h3>
                            <p>
                                Provide details about your professional experience. Fill in the fields below and click 'Add Experience' to save.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <form onSubmit={submitAddExperience} className="add-experience-form">
                                <div className="form-group mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        required
                                        name="title"
                                        value={experience.title}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Company</label>
                                    <input
                                        required
                                        name="company"
                                        value={experience.company}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Company"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        required
                                        name="location"
                                        value={experience.location}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Location"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">From Date</label>
                                    <input
                                        required
                                        name="from"
                                        value={experience.from}
                                        onChange={updateInput}
                                        type="date"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        name="current"
                                        checked={experience.current}
                                        onChange={updateInput}
                                        className="form-check-input"
                                        type="checkbox"
                                        id="currentCheck"
                                    />
                                    <label className="form-check-label" htmlFor="currentCheck">
                                        Current
                                    </label>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">To Date</label>
                                    <input
                                        name="to"
                                        value={experience.to}
                                        onChange={updateInput}
                                        type="date"
                                        className="form-control"
                                        disabled={experience.current}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={experience.description}
                                        onChange={updateInput}
                                        rows="3"
                                        className="form-control"
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <input type="submit" value="Add Experience" className="btn btn-teal" />
                                    <Link to="/profiles/dashboard" className="btn btn-secondary">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default AddExperience;
