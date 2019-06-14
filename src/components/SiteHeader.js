import React, { Component }  from 'react';
import { NavLink } from "react-router-dom";
import logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {connect } from 'react-redux'

const mapStateToProps = (state,props) =>{
    return {
        listOfAllProductsInCart : state.cart.listOfAllProductsInCart,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
    }
  }
class SiteHeader extends Component{
    render(){
        
        return(

            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="index.html"><img src={logo} alt="Logo" /> </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-item active">
                                <NavLink className="nav-link" exact  to={`/`}>Home</NavLink>

                            </li>
                            <li className="navbar-item ">
                                <NavLink className="nav-link" exact  to={`/catalog/`}>Catalog</NavLink>

                            </li>
                            <li className="navbar-item ">
                                <a className="nav-link disabled" href="#">About</a>
                            </li>
                            <li className="navbar-item ">
                                    <a className="nav-link disabled" href="#">Blog</a>
                            </li>
                            <li className="navbar-item ">
                                <a className="nav-link disabled" href="#">Connect</a>
                            </li>
                            <li className="navbar-item ">
                                <NavLink className="nav-link" exact  to={`/cart/`}><FontAwesomeIcon icon={faShoppingCart} />[{this.props.listOfAllProductsInCart.length}]</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>


        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SiteHeader);