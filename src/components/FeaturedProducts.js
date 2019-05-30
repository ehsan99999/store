import React, { Component }  from 'react';
import ProductCard from './ProductCard'

class FeaturedProducts extends Component{

    render(){
        let productsListString = this.props.products.map((product,index) => {
            if(index >= 4) return;
            return(
              <ProductCard key={product.id} product = {product} />

            )
        });

        return(
            <div>
            <div className="container-fluid">
                <div className="row welcome text-center">
                    <div className="col-12">
                        <h2 className="display-6 text-uppercase">New Arrivals </h2>
                    </div>
                    <div className="col-12">
                        <p className="lead">
                            Nibh venenatis cras sed felis eget. Posuere sollicitudin aliquam ultrices sagittis orci.
                            Sapien faucibus et molestie ac feugiat.
                        </p>
                    </div>
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