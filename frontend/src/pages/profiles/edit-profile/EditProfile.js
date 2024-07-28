import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as profileReducer from '../../../redux/profiles/profile.reducer';
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../layout/misc/spinner/Spinner";
import './EditProfile.css';  // Assuming you have a separate CSS file for styling

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [localProfile, setLocalProfile] = useState({
        youtube: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
    });

    const profileInfo = useSelector((state) => state[profileReducer.profileFeatureKey]);
    const { loading, profile } = profileInfo;

    useEffect(() => {
        dispatch(profileActions.getProfile());
        setLocalProfile({
            youtube: profile && profile.social?.youtube ? profile.social.youtube : '',
            twitter: profile && profile.social?.twitter ? profile.social.twitter : '',
            facebook: profile && profile.social?.facebook ? profile.social.facebook : '',
            instagram: profile && profile.social?.instagram ? profile.social.instagram : '',
            linkedin: profile && profile.social?.linkedin ? profile.social.linkedin : '',
        });
    }, [dispatch]);

    const updateInput = (event) => {
        setLocalProfile({
            ...localProfile,
            [event.target.name]: event.target.value
        });
    };

    const submitUpdateProfile = (event) => {
        event.preventDefault();
        dispatch(profileActions.updateProfile(localProfile, navigate));
    };

    return (
        <Fragment>
            <section className="p-3 edit-profile-header">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h3 className="text-teal">
                                <i className="fa fa-user-circle" /> Edit Profile
                            </h3>
                            <p>
                                Update your social links to stay connected. Fill in the fields below and click 'Update' to save changes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : (
                <Fragment>
                    <section className="p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 mx-auto">
                                    <form onSubmit={submitUpdateProfile} className="edit-profile-form">
                                        <small className="text-muted mb-2">Social Links</small>
                                        <div className="form-group mb-3">
                                            <input
                                                required
                                                name="youtube"
                                                value={localProfile.youtube}
                                                onChange={updateInput}
                                                type="text"
                                                className="form-control"
                                                placeholder="YouTube"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                required
                                                name="twitter"
                                                value={localProfile.twitter}
                                                onChange={updateInput}
                                                type="text"
                                                className="form-control"
                                                placeholder="Twitter"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                required
                                                name="facebook"
                                                value={localProfile.facebook}
                                                onChange={updateInput}
                                                type="text"
                                                className="form-control"
                                                placeholder="Facebook"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                required
                                                name="linkedin"
                                                value={localProfile.linkedin}
                                                onChange={updateInput}
                                                type="text"
                                                className="form-control"
                                                placeholder="LinkedIn"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                required
                                                name="instagram"
                                                value={localProfile.instagram}
                                                onChange={updateInput}
                                                type="text"
                                                className="form-control"
                                                placeholder="Instagram"
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <input type="submit" className="btn btn-teal" value="Update" />
                                            <Link to="/profiles/dashboard" className="btn btn-secondary">Back</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
            <div style={{ marginBottom: '150px' }} />
        </Fragment>
    );
};

export default EditProfile;
