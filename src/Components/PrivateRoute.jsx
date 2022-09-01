import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
    //UseState
    const [isExpiredTime, setIsExpiredTime] = useState(true);
    //UseEffect
    useEffect(() => {
        checkExpiryTime();
    }, []);
    //Functions
    const checkExpiryTime = () => {
        if (JSON.parse(localStorage.getItem("miftaahadmin"))) {
            setIsExpiredTime(true);
        } else {
            setIsExpiredTime(false);
        }
    };
    return isExpiredTime ? children : <Navigate to="/" />;
}

export default PrivateRoute;