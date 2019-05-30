import React, { Component }  from 'react';
import { NavLink } from "react-router-dom";
import C from '../store/constants'
import ProductCard from './ProductCard'

class ProductsTabs extends Component{

    render(){
        let categoriesList = this.props.products.map((category,index) => {
            let active = (index < 1)? "active" : "";
            return (
				<li key={Object.keys(category)[0]+"Collapse"} className={active +" px-2"} ><a data-toggle="tab" href={"#"+Object.keys(category)[0]+"Collapse"}>
                   {Object.keys(category)[0]}
                </a></li>
            )
        });         
        let productsListString = this.props.products.map((category,index) => {
            let categoryKey = Object.keys(category)[0];
            let productsTabsJsx = category[categoryKey].map(product => {
                let priceWas = (product.priceWas > -1)?
                    <p className="priceIs" >$CAD {product.priceWas}</p>:
                     "";

                let productTitle = (product.productTitle.length > 15)? 
                        product.productTitle.substr(0,14)+"..." :
                        product.productTitle;
                
                return(
                    <ProductCard key={product.id}  product = {product} />
                )

            });
            let active = (index < 1)? "active" : "";
            return (
                <div key={categoryKey+"Collapse"} id={categoryKey+"Collapse"} className={"tab-pane fadeIn " +active}>
                    <div className="row">
                        {productsTabsJsx}
                    </div>
                
                </div>
                


            )
        });         



        return(
            <div>
                <div id="discover" className="container-fluid">
                    <div className="row text-center padding">
                            <div className="d-block mx-auto  ">
                                <h2  className="display-6 text-uppercase" >DISCOVER</h2>
                                <ul className="nav nav-tabs">
                                    {categoriesList}
                                </ul>
                            </div>
                    </div>
                </div>
                <div id="discoverTabContent" className="tab-content container-fluid padding">
                    {productsListString}
                </div>
            </div>    
        )
    }
}

export default ProductsTabs;