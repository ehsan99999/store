import React , { Component } from 'react';
import C from '../store/constants'
import { NavLink } from "react-router-dom";
import fullStar from '../img/fullStar.png'
import halfStar from '../img/halfStar.png'
import emptyStar from '../img/emptyStar.png'

class ProductCard extends Component{

	render(){
		let productTitleLength = 16;
		let product = this.props.product;
		let priceWas = (product.priceWas === -1)?
			"":
			<small><del>${product.priceWas}</del></small>

		let productTitle = (product.productTitle.length > productTitleLength)? 
					product.productTitle.substr(0,(productTitleLength-1))+"..." :
					product.productTitle;
		return (
				<div  key={product.id} className="productCard col-sm-6 col-md-4 col-lg-3 my-2 ">
					<div className="card" >
						<NavLink product={product} exact to={`/product/${product.id}`}> 
							<img className="card-img-top ImgScaleDown img-fluid" src={C.STORE_SETTINGS.IMAGES_URL + "products/"+product.images[0]} alt={productTitle} />
							<div className="card-body">
								<div className="d-flex flex-row pb-1">
									<div className="text-left w-50 " >
										<b to="#" className="categoryLink">LIFESTYLE</b>
									</div>
									<div className="text-right  w-50 "  >
										<img src={fullStar} className="star" alt="rating star" />
										<img src={fullStar} className="star" alt="rating star"  />
										<img src={fullStar} className="star" alt="rating star"  />
										<img src={halfStar} className="star" alt="rating star"  />
										<img src={emptyStar} className="star" alt="rating star"  />
									</div>
								</div>
								<h5 className="card-title text-dark text-left">{productTitle}</h5>
								<span className="card-text text-dark d-block w-100 text-left">{priceWas} ${product.priceIs} </span>
							</div>

						</NavLink>
					</div>  
				</div>
		);

	}
    
}
export default ProductCard;
