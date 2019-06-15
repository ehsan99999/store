import React, { Component }  from 'react';
import ProductCard from './ProductCard'

class FeaturedProducts extends Component{

    render(){
        let productsListString = this.props.products.map((product,index) => {
            if(index >= 4) 
                return(<span></span>);
            return(
              <ProductCard key={product.id} product = {product} />

            )
        });
        let titleJsx = (this.props.title === undefined)?
                            (<div></div>) :
                            (
                                <div className="col-12">
                                    <h2 className="display-6 text-uppercase">{this.props.title}</h2>
                                </div>
                            );
        


        let descriptionJsx = (this.props.description === undefined)? 
                                (<div></div>):
                                (
                                    <div className="col-12">
                                        <p className="lead">{this.props.description} </p>
                                    </div>
                                );

        
        
        return(
            <div>
            <div className="container-fluid">
                <div className="row welcome text-center">
                    {titleJsx}
                    {descriptionJsx}

                </div>
            </div>
            <div className="container-fluid padding">
		        <div className="row padding">{productsListString}</div>
            </div>

            </div>
        )
    }
}

export default FeaturedProducts;