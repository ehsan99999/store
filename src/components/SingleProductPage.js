import React, { Component }  from 'react';
import { NavLink } from "react-router-dom";
import C from '../store/constants'
import {connect } from 'react-redux'

const mapStateToProps = (state,props) =>{
    let productId = parseInt(props.match.params.productId)
    return {
        products : state.products.filter(product => {
            console.log(product.id , productId)
            console.log(product.id , productId)
            return product.id == productId
        })
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
    //   fetchHomepageComponents(){
    //     dispatch(fetchHomepageComponents())
    //   }
    }
  }

class SingleProductPage extends Component{

    render(){
        console.log(this.props);
        return(
            <h1>${JSON.stringify(this.props)}</h1>
        )
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(SingleProductPage);