import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as profileActions from "../../../redux/profiles/profile.actions";
import './AddCourse.css'; // Assuming you have a separate CSS file for styling

const AddCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courses, setCourses] = useState({
        course: '',
        semester: '',
        description: ''
    });

    const updateInput = (e) => {
        const { name, value, type, checked } = e.target;
        setCourses({
            ...courses,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const submitAddCourses = (e) => {
        e.preventDefault();
        dispatch(profileActions.addCourse(courses, navigate));
    };

    return (
        <React.Fragment>
            <section className="p-3 add-course-header">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h3 className="text-teal">
                                <i className="fa fa-user-clock" /> Add Course
                            </h3>
                            <p>
                                Provide details about the course you have taken. Fill in the fields below and click 'Add Course' to save.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <form onSubmit={submitAddCourses} className="add-course-form">
                                <div className="form-group mb-3">
                                    <label className="form-label">Course</label>
                                    <input
                                        required
                                        name="course"
                                        value={courses.course}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Course"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Semester</label>
                                    <input
                                        required
                                        name="semester"
                                        value={courses.semester}
                                        onChange={updateInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Semester"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={courses.description}
                                        onChange={updateInput}
                                        rows="3"
                                        className="form-control"
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <input type="submit" value="Add Course" className="btn btn-teal" />
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

export default AddCourse;
