import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as userActions from '../../../redux/users/users.actions';
import * as alertActions from '../../../redux/alert/alert.actions';

const UserRegister = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    let [userError, setUserError] = useState({
        nameError: '',
        emailError: '',
        passwordError: ''
    })


    let validateUsername = (event) => {
        setUser({ ...user, name: event.target.value });
        // Regular expression to allow usernames with letters, numbers, underscores, hyphens, and periods, but not starting or ending with special characters.
        let regExp = /^(?![_\-.])[a-zA-Z0-9_\-.]{4,10}(?<![_\-.])$/;
        !regExp.test(event.target.value) ?
            setUserError({ ...userError, nameError: 'Enter a proper Username (4-10 characters, no special characters at the beginning or end).' })
            : setUserError({ ...userError, nameError: '' });
    }


    let validateEmail = (event) => {
        setUser({ ...user, email: event.target.value });
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
            setUserError({ ...userError, emailError: 'Enter a proper Email' })
            : setUserError({ ...userError, emailError: '' });
    }

    let validatePassword = (event) => {
        setUser({ ...user, password: event.target.value });

        // Regular expression to check for at least one uppercase, one lowercase, one digit, one special character, and length 8-16
        let regExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

        !regExp.test(event.target.value) ?
            setUserError({ ...userError, passwordError: 'Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.' })
            : setUserError({ ...userError, passwordError: '' });
    }


    let submitRegister = (event) => {
        event.preventDefault();
        if (user.name !== '' && user.email !== '' && user.password !== '') {
            dispatch(userActions.registerUser(user, navigate));
            console.log(user);
        }
        else {
            dispatch(alertActions.setAlert('Please fill in  the fields', 'danger'));
        }
    };


    return (
        <Fragment>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitRegister}>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} id="email" name='email'
                                            value={user.email}
                                            onChange={validateEmail}

                                        />
                                        {userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : ''}

                                    </div>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} id="name" name='name'
                                            value={user.name}
                                            onChange={validateUsername}
                                        />
                                        {userError.nameError.length > 0 ? <small className="text-danger">{userError.nameError}</small> : ''}

                                    </div>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} id="password" name='password'

                                            value={user.password}
                                            onChange={validatePassword}
                                        />
                                        {userError.passwordError.length > 0 ? <small className="text-danger">{userError.passwordError}</small> : ''}

                                    </div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Register" />
                                </form>
                                <small>Already have an account ?
                                    <Link to="/users/login" className="font-weight-bold text-teal"> Login</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UserRegister