import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as studentAction from '../../../redux/students/student.actions';
import * as studentReducer from '../../../redux/students/student.reducer';
import Spinner from "../../../layout/misc/spinner/Spinner";
import './StudentDetails.css'; // Import custom CSS for additional styling

const StudentDetails = () => {
    const dispatch = useDispatch();

    const studentInfo = useSelector((state) => state[studentReducer.studentFeatureKey]);
    const { loading, selectedProfile } = studentInfo;

    const { studentId } = useParams();

    useEffect(() => {
        dispatch(studentAction.fetchStudent(studentId));
    }, [dispatch, studentId]);

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <React.Fragment>
                    {selectedProfile && Object.keys(selectedProfile).length > 0 && (
                        <React.Fragment>
                            <section className="p-3">
                                <div className="container">
                                    <div className="row animated zoomIn">
                                        <div className="col">
                                            <p className="h3 text-teal">
                                                <i className="fa fa-user-tie" /> {selectedProfile.user.name}'s Profile
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div className="container profile-header text-center p-3">
                                    <div className="row">
                                        <div className="col">
                                            <img
                                                src={selectedProfile.user.avatar}
                                                alt=""
                                                width="200"
                                                height="200"
                                                className="rounded-circle profile-img mb-3"
                                            />
                                            <p className="h2 text-teal">{selectedProfile.user.name}</p>
                                            <p className="text-muted">{selectedProfile.location}</p>
                                            <div className="d-flex justify-content-center">
                                                {selectedProfile.social.facebook && (
                                                    <div className="p-2">
                                                        <a href={selectedProfile.social.facebook} target="_blank" rel="noopener noreferrer">
                                                            <i className="fab fa-facebook text-dark" />
                                                        </a>
                                                    </div>
                                                )}
                                                {selectedProfile.social.twitter && (
                                                    <div className="p-2">
                                                        <a href={selectedProfile.social.twitter} target="_blank" rel="noopener noreferrer">
                                                            <i className="fab fa-twitter text-dark" />
                                                        </a>
                                                    </div>
                                                )}
                                                {selectedProfile.social.linkedin && (
                                                    <div className="p-2">
                                                        <a href={selectedProfile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                            <i className="fab fa-linkedin text-dark" />
                                                        </a>
                                                    </div>
                                                )}
                                                {selectedProfile.social.youtube && (
                                                    <div className="p-2">
                                                        <a href={selectedProfile.social.youtube} target="_blank" rel="noopener noreferrer">
                                                            <i className="fab fa-youtube text-dark" />
                                                        </a>
                                                    </div>
                                                )}
                                                {selectedProfile.social.instagram && (
                                                    <div className="p-2">
                                                        <a href={selectedProfile.social.instagram} target="_blank" rel="noopener noreferrer">
                                                            <i className="fab fa-instagram text-dark" />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="container my-4">
                                    <div className="row">
                                        <div className="col">
                                            {selectedProfile.courses.length > 0 && (
                                                <div className="card mb-4 shadow-sm">
                                                    <div className="card-body bg-light">
                                                        <p className="h4 text-teal">Courses</p>
                                                        <ul className="list-group list-group-flush">
                                                            {selectedProfile.courses.map(crs => (
                                                                <li className="list-group-item" key={crs._id}>
                                                                    <span><strong>Course:</strong> {crs.course}</span><br />
                                                                    <span><strong>Semester:</strong> {crs.semester}</span><br />
                                                                    <span><strong>Description:</strong> {crs.description}</span><br />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {selectedProfile.experience.length > 0 && (
                                                <div className="card mb-4 shadow-sm">
                                                    <div className="card-body bg-light">
                                                        <p className="h4 text-teal">Experience</p>
                                                        <ul className="list-group list-group-flush">
                                                            {selectedProfile.experience.map(exp => (
                                                                <li className="list-group-item" key={exp._id}>
                                                                    <span><strong>Title:</strong> {exp.title}</span><br />
                                                                    <span><strong>Company:</strong> {exp.company}</span><br />
                                                                    <span><strong>Location:</strong> {exp.location}</span><br />
                                                                    <span><strong>From:</strong> {new Date(exp.from).toLocaleDateString()}</span><br />
                                                                    <span><strong>To:</strong> {exp.to ? new Date(exp.to).toLocaleDateString() : 'Present'}</span><br />
                                                                    <span><strong>Description:</strong> {exp.description}</span><br />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            {selectedProfile.education.length > 0 && (
                                                <div className="card mb-4 shadow-sm">
                                                    <div className="card-body bg-light">
                                                        <p className="h4 text-teal">Education</p>
                                                        <ul className="list-group list-group-flush">
                                                            {selectedProfile.education.map(edu => (
                                                                <li className="list-group-item" key={edu._id}>
                                                                    <span><strong>School:</strong> {edu.school}</span><br />
                                                                    <span><strong>Degree:</strong> {edu.degree}</span><br />
                                                                    <span><strong>Field of Study:</strong> {edu.fieldOfStudy}</span><br />
                                                                    <span><strong>From:</strong> {new Date(edu.from).toLocaleDateString()}</span><br />
                                                                    <span><strong>To:</strong> {edu.to ? new Date(edu.to).toLocaleDateString() : 'Present'}</span><br />
                                                                    <span><strong>Description:</strong> {edu.description}</span><br />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
            <div style={{ marginBottom: '150px' }} />
        </React.Fragment>
    );
};

export default StudentDetails;
