import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as userReducer from '../../../redux/users/users.reducer';
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as profileReducer from '../../../redux/profiles/profile.reducer';
import Spinner from '../../../layout/misc/spinner/Spinner';
import './Dashboard.css'; // Import custom CSS for additional styling

const Dashboard = () => {
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const profileInfo = useSelector((state) => state[profileReducer.profileFeatureKey]);

    const { profile, loading } = profileInfo || {};
    const { user } = userInfo || {};

    useEffect(() => {
        dispatch(profileActions.getProfile());
    }, [dispatch]);

    const clickDeleteExperience = (experienceId) => {
        dispatch(profileActions.deleteExperience(experienceId));
    };

    const clickDeleteEducation = (educationId) => {
        dispatch(profileActions.deleteEducation(educationId));
    };

    const clickDeleteCourse = (courseId) => {
        dispatch(profileActions.deleteCourse(courseId));
    };

    return (
        <React.Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <section className="dashboard-header p-4 mb-4">
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <h2 className="text-teal mb-4">
                                        <i className="fa fa-sitemap" /> Dashboard
                                    </h2>
                                    {user && <p className="h5">Welcome, {user.name}</p>}
                                    <div className="btn-group mt-3" role="group">
                                        <Link to="/profiles/edit" className="btn btn-teal btn-sm">
                                            <i className="fa fa-user-cog"></i> Edit Profile
                                        </Link>
                                        <Link to="/profiles/add-experience" className="btn btn-teal btn-sm">
                                            <i className="fa fa-user-tie"></i> Add Experience
                                        </Link>
                                        <Link to="/profiles/add-education" className="btn btn-teal btn-sm">
                                            <i className="fa fa-graduation-cap"></i> Add Education
                                        </Link>
                                        <Link to="/profiles/add-course" className="btn btn-teal btn-sm">
                                            <i className="fa fa-book"></i> Add Course
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            )}
            {profile && Object.keys(profile).length > 0 ? (
                <React.Fragment>
                    {profile.experience?.length > 0 && (
                        <section className="experience-section p-4">
                            <div className="container">
                                <div className="row mb-3">
                                    <div className="col">
                                        <h3 className="text-teal">Experience Details</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table table-hover text-center table-light table-striped">
                                            <thead className="bg-teal text-white">
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Company</th>
                                                    <th>Location</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profile.experience.map((exp) => (
                                                    <tr key={exp._id}>
                                                        <td>{exp.title}</td>
                                                        <td>{exp.company}</td>
                                                        <td>{exp.location}</td>
                                                        <td>{new Date(exp.from).toLocaleDateString()}</td>
                                                        <td>{exp.to && exp.to !== ' ' ? new Date(exp.to).toLocaleDateString() : 'Present'}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => clickDeleteExperience(exp._id)}
                                                                className="btn btn-danger btn-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {profile.education?.length > 0 && (
                        <section className="education-section p-4">
                            <div className="container">
                                <div className="row mb-3">
                                    <div className="col">
                                        <h3 className="text-teal">Education Details</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table table-hover text-center table-light table-striped">
                                            <thead className="bg-teal text-white">
                                                <tr>
                                                    <th>School</th>
                                                    <th>Degree</th>
                                                    <th>Field Of Study</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profile.education.map((edu) => (
                                                    <tr key={edu._id}>
                                                        <td>{edu.school}</td>
                                                        <td>{edu.degree}</td>
                                                        <td>{edu.fieldOfStudy}</td>
                                                        <td>{new Date(edu.from).toLocaleDateString()}</td>
                                                        <td>{edu.to && edu.to !== ' ' ? new Date(edu.to).toLocaleDateString() : 'Present'}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => clickDeleteEducation(edu._id)}
                                                                className="btn btn-danger btn-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {profile.courses?.length > 0 && (
                        <section className="course-section p-4">
                            <div className="container">
                                <div className="row mb-3">
                                    <div className="col">
                                        <h3 className="text-teal">Course Details</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table table-hover text-center table-light table-striped">
                                            <thead className="bg-teal text-white">
                                                <tr>
                                                    <th>Course</th>
                                                    <th>Semester</th>
                                                    <th>Description</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profile.courses.map((crs) => (
                                                    <tr key={crs._id}>
                                                        <td>{crs.course}</td>
                                                        <td>{crs.semester}</td>
                                                        <td>{crs.description}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => clickDeleteCourse(crs._id)}
                                                                className="btn btn-danger btn-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <section className="p-4">
                        <div className="container text-center">
                            <div className="row">
                                <div className="col">
                                    <p>You don't have a profile yet! Please create one.</p>
                                    <Link to="/profiles/create" className="btn btn-teal btn-sm">
                                        <i className="fa fa-user-cog"></i> Create Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Dashboard;
