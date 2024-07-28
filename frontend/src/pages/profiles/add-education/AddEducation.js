import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as profileActions from "../../../redux/profiles/profile.actions";
import './AddEducation.css';  // Assuming you have a separate CSS file for styling

const AddEducation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [education, setEducation] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const updateInput = (e) => {
        const { name, value, type, checked } = e.target;
        setEducation({
            ...education,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const submitAddEducation = (e) => {
        e.preventDefault();
        dispatch(profileActions.addEducation(education, navigate));
    };

    return (
        <React.Fragment>
            <section className="p-3 add-education-header">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h3 className="text-teal">
                                <i className="fa fa-graduation-cap" /> Add Education
                            </h3>
                            <p>
                                Provide details about your educational background. Fill in the fields below and click 'Add Education' to save.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <form onSubmit={submitAddEducation} className="add-education-form">
                                <div className="form-group mb-3">
                                    <label className="form-label">School</label>
                                    <input
                                        required
                                        name="school"
                                        value={education.school}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="School"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Degree</label>
                                    <input
                                        required
                                        name="degree"
                                        value={education.degree}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Degree"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Field Of Study</label>
                                    <input
                                        required
                                        name="fieldOfStudy"
                                        value={education.fieldOfStudy}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Field Of Study"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">From Date</label>
                                    <input
                                        required
                                        name="from"
                                        value={education.from}
                                        onChange={updateInput}
                                        type="date"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        name="current"
                                        checked={education.current}
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
                                        value={education.to}
                                        onChange={updateInput}
                                        type="date"
                                        className="form-control"
                                        disabled={education.current}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={education.description}
                                        onChange={updateInput}
                                        rows="3"
                                        className="form-control"
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <input type="submit" value="Add Education" className="btn btn-teal" />
                                    <Link to="/profiles/dashboard" className="btn btn-secondary">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default AddEducation;
