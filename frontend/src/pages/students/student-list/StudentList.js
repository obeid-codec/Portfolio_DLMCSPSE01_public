import React, { Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as studentActions from '../../../redux/students/student.actions';
import * as studentReducer from '../../../redux/students/student.reducer';
import * as userActions from '../../../redux/users/users.actions';
import Spinner from "../../../layout/misc/spinner/Spinner";
import './StudentList.css';  // Assuming you have a separate CSS file for styling

const StudentList = () => {

    const dispatch = useDispatch();
    const studentInfo = useSelector((state) => state[studentReducer.studentFeatureKey]);

    const { loading, profiles } = studentInfo;

    useEffect(() => {
        dispatch(studentActions.fetchAllStudents());
    }, [dispatch]);

    const handleToggleAdmin = (userId, isAdmin) => {
        dispatch(userActions.toggleAdmin(userId, !isAdmin, () => {
            dispatch(studentActions.fetchAllStudents());
        }));
    };

    return (
        <Fragment>
            <div className="student-list">
                <section className="student-list-header">
                    <div className="container text-center">
                        <h3 className="text-teal"><i className="fa fa-user-tie" /> Students</h3>
                        <p className="description">
                            Explore the profiles of all our students. Click to view detailed information and their related posts.
                        </p>
                    </div>
                </section>
                <section>
                    {loading ? (
                        <Spinner />
                    ) : (
                        profiles.length > 0 ? (
                            <div className="container">
                                <div className="row">
                                    {profiles.map(profile => (
                                        <div className="col-md-6 col-lg-4" key={profile._id}>
                                            <div className="card profile-card shadow-sm">
                                                <div className="card-body text-center">
                                                    <img src={profile.user.avatar} className="profile-avatar mb-3" alt={profile.user.name} />
                                                    <h5 className="profile-name">{profile.user.name}</h5>
                                                    {profile.user.isAdmin && (
                                                        <p className="text-muted text-danger">ADMIN</p>
                                                    )}
                                                    <p className="profile-location">{profile.location}</p>
                                                    <div className="profile-actions">
                                                        <Link to={`/student/${profile._id}`} className="btn btn-custom btn-sm me-2">View Profile</Link>
                                                        <Link to={`/students/posts/${profile.user._id}`} className="btn btn-custom btn-sm me-2">View Posts</Link>
                                                        <button
                                                            className={`btn btn-sm ${profile.user.isAdmin ? 'btn-custom-danger' : 'btn-custom-warning'} mt-2`}
                                                            onClick={() => handleToggleAdmin(profile.user._id, profile.user.isAdmin)}
                                                        >
                                                            {profile.user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <p>No students found</p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </section>
            </div>
        </Fragment>
    );
};

export default StudentList;
