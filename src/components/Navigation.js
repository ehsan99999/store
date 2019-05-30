import React, { Component }  from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/categories"> Categories</NavLink>
        </div>
    )
}

export default Navigation;