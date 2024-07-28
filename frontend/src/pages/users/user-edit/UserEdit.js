import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as userActions from '../../../redux/users/users.actions';
import * as alertActions from '../../../redux/alert/alert.actions';

const UserEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [userError, setUserError] = useState({
        nameError: '',
        emailError: '',
        passwordError: ''
    });

    const validateUsername = (event) => {
        const value = event.target.value;
        setUser({ ...user, name: value });
        const regExp = /^[A-Za-z]\w{7,14}$/;
        setUserError({
            ...userError,
            nameError: !regExp.test(value) ? 'Enter a proper name' : ''
        });
    };

    const validateEmail = (event) => {
        const value = event.target.value;
        setUser({ ...user, email: value });
        const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        setUserError({
            ...userError,
            emailError: !regExp.test(value) ? 'Enter a proper Email' : ''
        });
    };

    const validatePassword = (event) => {
        const value = event.target.value;
        setUser({ ...user, password: value });
        const regExp = /^[A-Za-z]\w{7,14}$/;
        setUserError({
            ...userError,
            passwordError: !regExp.test(value) ? 'Enter a proper Password' : ''
        });
    };

    const submitLogin = (event) => {
        event.preventDefault();
        dispatch(userActions.editUserInfoRequest(user, navigate));
        dispatch(alertActions.setAlert('Your information is modified', 'success'));
    };

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Edit User Information</h2>
                        <form onSubmit={submitLogin}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${userError.nameError ? 'is-invalid' : ''}`}
                                    id="name"
                                    value={user.name}
                                    onChange={validateUsername}
                                    placeholder="Enter your name"
                                />
                                {userError.nameError && <div className="invalid-feedback">{userError.nameError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${userError.emailError ? 'is-invalid' : ''}`}
                                    id="email"
                                    value={user.email}
                                    onChange={validateEmail}
                                    placeholder="Enter your email"
                                />
                                {userError.emailError && <div className="invalid-feedback">{userError.emailError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${userError.passwordError ? 'is-invalid' : ''}`}
                                    id="password"
                                    value={user.password}
                                    onChange={validatePassword}
                                    placeholder="Enter your password"
                                />
                                {userError.passwordError && <div className="invalid-feedback">{userError.passwordError}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserEdit;
