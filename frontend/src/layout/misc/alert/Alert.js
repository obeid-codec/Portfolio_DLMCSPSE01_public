import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import * as alertReducer from '../../../redux/alert/alert.reducer';
import './Alert.css'; // Import custom CSS for additional styling

const Alert = () => {
    const alertInfo = useSelector((state) => state[alertReducer.alertFeatureKey]);
    const { messages } = alertInfo;

    return (
        <Fragment>
            {messages.length > 0 && (
                <div className={`alert alert-${messages[0].color} alert-dismissible m-2 fixed-top animated slideInDown`}>
                    <button className="close" data-dismiss="alert">
                        <i className="fa fa-times-circle" />
                    </button>
                    {messages.map(alert => (
                        <div key={alert.id}>
                            <small className="font-weight-bold">{alert.message}</small><br />
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default Alert;
