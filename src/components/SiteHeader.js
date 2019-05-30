import React, { Component }  from 'react';
import { NavLink } from "react-router-dom";
import logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class SiteHeader extends Component{

    render(){
        return(

            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div className="container-fluid container">
                    <a className="navbar-brand" href="index.html"><img src={logo} alt="Logo" /> </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="navbar-item ">
                                <a className="nav-link" href="#">Catalog</a>
                            </li>
                            <li className="navbar-item ">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="navbar-item ">
                                    <a className="nav-link" href="#">Blog</a>
                            </li>
                            <li className="navbar-item ">
                                <a className="nav-link" href="#">Connect</a>
                            </li>
                            <li className="navbar-item ">
                                <a className="nav-link" href="#"><FontAwesomeIcon icon={faShoppingCart} />[0]</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>


        )
    }
}

export default SiteHeader;