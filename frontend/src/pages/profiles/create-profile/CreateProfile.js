import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as profileActions from '../../../redux/profiles/profile.actions';

let CreateProfile = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [profile, setProfile] = useState({
        youtube: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
    });

    let updateInput = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    let submitCreateProfile = (e) => {
        e.preventDefault();
        dispatch(profileActions.createProfile(profile, navigate));
    };

    return (
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-user-circle" />
                                {' '} Create a Profile
                            </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dignissimos distinctio dolor error expedita id incidunt, iusto laborum, molestiae mollitia optio placeat quod recusandae soluta unde, vel! Deserunt, quisquam!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitCreateProfile}>

                                <small>Social Links</small>
                                <div className="form-group">
                                    <input
                                        required
                                        name="youtube"
                                        value={profile.youtube}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="YouTube" />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        name="twitter"
                                        value={profile.twitter}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Twitter" />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        name="facebook"
                                        value={profile.facebook}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Facebook" />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        name="linkedin"
                                        value={profile.linkedin}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="LinkedIn" />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        name="instagram"
                                        value={profile.instagram}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Instagram" />
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Create Profile" />
                                    <Link to="/profiles/dashboard" className="btn bg-light-grey btn-sm">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default CreateProfile;
