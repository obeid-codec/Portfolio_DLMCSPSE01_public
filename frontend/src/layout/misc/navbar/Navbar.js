import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userReducer from '../../../redux/users/users.reducer';
import * as userActions from '../../../redux/users/users.actions';
import './Navbar.css'; // Import custom CSS for additional styling

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
    const { user, isAuthenticated } = userInfo;

    const clickLogOut = () => {
        dispatch(userActions.logoutUser(navigate));
    };

    const beforeLogin = (
        <React.Fragment>
            <li className="nav-item">
                <Link to="/users/register" className="nav-link">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/users/login" className="nav-link">
                    Login
                </Link>
            </li>
        </React.Fragment>
    );

    const afterLogin = (
        <React.Fragment>
            {isAuthenticated && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link to="/profiles/dashboard" className="nav-link">
                            <i className="fa fa-sitemap" /> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/posts" className="nav-link">
                            <i className="fa fa-list" /> Posts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/groups" className="nav-link">
                            <i className="fa fa-users" /> Groups
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/events" className="nav-link">
                            <i className="fa fa-calendar" /> Events
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users/edit" className="nav-link">
                            <img src={user.avatar} alt="" width="25" height="25" className="rounded-circle" />
                        </Link>
                    </li>
                </React.Fragment>
            )}
            <li className="nav-item">
                <Link to="/" className="nav-link" onClick={clickLogOut}>
                    LogOut
                </Link>
            </li>
        </React.Fragment>
    );

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <i className="fa fa-code" /> UniConnect
                </Link>
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/students" className="nav-link">
                                <i className="fa fa-user-tie" /> Students
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ? afterLogin : beforeLogin}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
