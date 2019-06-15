import React, { Component }  from 'react';
import  Rating  from "react-rating";
import C from '../store/constants'
import {connect } from 'react-redux'
import {fetchProductById , addItemToCart,toggleFavorite,fetchRelatedItemsByProductId , removeItemFromCart} from '../store/actions'
import  SiteHeader  from "./SiteHeader";
import  Foooter  from "./Foooter";
import fullStar from '../img/fullStar.png'
import emptyStar from '../img/emptyStar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faHeart,faCheck } from '@fortawesome/free-solid-svg-icons'
import  FeaturedProducts  from "./FeaturedProducts";
import  ChangeNumberOfUnitsInCart  from "./miniComponents/ChangeNumberOfUnitsInCart";

const PRODUCT_IMG_URL = C.OTHERS.PRODUCT_IMG_URL;


const mapStateToProps = (state,props) =>{
    let productId = parseInt(props.match.params.productId)
    return {
        products : state.products,
        currrentProductId : productId,
        listOfAllProductsInCart : state.cart.listOfAllProductsInCart,
        favorites : state.favorites,
        isItemInCart : (state.cart.listOfAllProductsInCart.filter(item => item.id === productId ).length > 0)? true:false,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
        fetchProductById(productId){
            let result = dispatch(fetchProductById(productId));
            return result;
        },
        addItemToCart(product){
            dispatch(addItemToCart(product))
        },
        removeItemFromCart(product){
            dispatch(removeItemFromCart(product))
        },
        toggleFavorite(productId){
            dispatch(toggleFavorite(productId))
        },
        fetchRelatedItemsByProductId(productId){
            dispatch(fetchRelatedItemsByProductId(productId));
        }
    }
  }

class SingleProductPage extends Component{
    constructor(props){
        super(props);
        this.state = {numberOfUnits: 1 , shippingOption : 1 , areRelatedItemsFetched : false };
        this.modifyNumberOfUnits.bind(this);
        this.productId = parseInt(this.props.match.params.productId);

    }
    componentDidMount() {
        if(!this.state.areRelatedItemsFetched){
            this.props.fetchRelatedItemsByProductId(this.productId);
            this.setState({areRelatedItemsFetched : true});
        }
    }
    modifyNumberOfUnits = (action)=>{
        //TODO UPDATE THE CART AFTER CHANGE IN NUMBER
        switch (action) {
            case "INCREMENT":
                this.setState({
                    numberOfUnits : this.state.numberOfUnits + 1
                });
                break;
            case "DECREMENT":
                if(this.state.numberOfUnits < 2)
                    return;
                this.setState({
                    numberOfUnits : this.state.numberOfUnits - 1
                });
                break;
            default:
                break;
        }

    }
    modifyShippingOption = (event) =>{
        this.setState({shippingOption : parseInt(event.target.value)});
    }
    cartAddRemoveProduct = (product) => {
        if(this.props.isItemInCart){
            this.props.removeItemFromCart({
                id : product.id
            });
        }else{
            this.props.addItemToCart({
                id : product.id,
                productImage : product.images[0],
                productTitle : product.productTitle,
                price : product.priceIs,
                numberOfUnits: this.state.numberOfUnits,
                shippingOption : this.state.shippingOption
            });
        }

    }

    render(){
        let productId = parseInt(this.props.match.params.productId);
        let product = this.props.products.filter(product => product.id === productId)[0];

        if(product === undefined){
            let fetchResult  = this.props.fetchProductById(productId);
            if (!fetchResult.isResolved){
                return(
                   <center><br/><br/><h3 className="text-danger">Failed to connect to server</h3></center>
                )
            }

            return(
                <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="loading gif" />
            )
        }
        let relatedProducts = this.props.products.filter(item => {
            return ((item.category === product.category) && (item.id !== product.id))
        });

        let priceWas = parseFloat(product.priceWas);
        let priceIs = parseFloat(product.priceIs);

        if(priceWas < priceIs){
            let tempPrice = priceIs;
            priceIs = priceWas;
            priceWas = tempPrice;
        }

        let isFavorite = this.props.favorites.includes(productId);

        //TODO remove when we have real product specifications
        product.specifications = [
            "Lorem ipsum dolor sit amet, consectetur ",
            "Adipiscing elit, sed do eiusmod tempor incididunt ",
            "Ut labore et dolore magna aliqua",
            "Exercitation ullamco laboris nisi ut aliquip ex ea ",
            "Duis aute irure dolor in reprehenderit in "
        ];
        let productSpecificationsJsx = product.specifications.map((specification,index) => {
            return(
                <li key={`productSpecifications${index}`}>{specification}</li>
            )
        });

        let shippingOptions = [
            parseInt(((priceIs * 11)/100)),
            parseInt(((priceIs * 14)/100)),
            parseInt(((priceIs * 19)/100))
        ];

        let shippingOptionsJsx =(
                        <div className="my-3 mx-4" >
                            <div className="custom-control custom-radio">
                                <input 
                                    type="radio"
                                    className="custom-control-input"
                                    id="defaultChecked1"
                                    name="defaultExampleRadios"
                                    value={1} 
                                    checked={this.state.shippingOption === 1}
                                    onChange={this.modifyShippingOption}
                                        />
                                <label className="custom-control-label" htmlFor="defaultChecked1">
                                    ${shippingOptions[0]} -- Regular: within 10-15 days delivery
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input 
                                    type="radio"
                                    className="custom-control-input"
                                    id="defaultChecked2" 
                                    name="defaultExampleRadios"
                                    value={2} 
                                    checked={this.state.shippingOption === 2}
                                    onChange={this.modifyShippingOption} />
                                <label className="custom-control-label" htmlFor="defaultChecked2">
                                    ${shippingOptions[1]} -- Fast: within 5-7 days delivery
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input 
                                    type="radio"
                                    className="custom-control-input"
                                    id="defaultChecked3"
                                    name="defaultExampleRadios" 
                                    value={3} 
                                    checked={this.state.shippingOption === 3}
                                    onChange={this.modifyShippingOption}/>
                                <label className="custom-control-label" htmlFor="defaultChecked3">
                                    ${shippingOptions[2]} -- Express: 2-day delivery
                                </label>
                            </div>
                        </div>
        );
        let returnPolicyJsx = <p>You can return a product for up to 30 days from the date you purchased it.
                                Any product you return must be in the same condition you received it and in the original
                                packaging. Please keep the receipt.</p>
        product.desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna duis convallis.
                        Augue mauris augue neque gravida in fermentum et sollicitudin. In tellus integer 
                        feugiat scelerisque varius morbi. Nisl condimentum id venenatis a condimentum vitae
                        sapien. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras.
                        Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nam at lectus urna
                        duis convallis convallis tellus. Curabitur vitae nunc sed velit. Dui vivamus arcu felis 
                        bibendum ut tristique et egestas. Et ligula ullamcorper malesuada proin libero nunc consequat
                        interdum. Facilisi cras fermentum odio eu feugiat. Fringilla phasellus faucibus scelerisque
                        eleifend donec pretium. Leo a diam sollicitudin tempor id eu nisl nunc mi. Id faucibus nisl
                        tincidunt eget nullam. Odio morbi quis commodo odio aenean sed adipiscing diam donec.`;
        let reviewsJsx = product.comments.map((review,index)=>{

            return(
                <li  key={`review${index}`}   className="list-group-item" >
                    {review}
                </li>
            )
        });

        let ratingVal =  (Math.random() * (5 - 3.5) + 3.5).toFixed(1);



        return(
            <div className="singleProductPage">
            <SiteHeader />

            <div className=" headerMargin row container-fluid">
                <ProductPageSlider product={product}  />
                <div className="col-sm-12 col-md-6">
                    <h1 className="productTitle" >
                        {product.productTitle}  
                    </h1>
                    <div className="price">
                        <small><strike className="text-muted">{priceWas}</strike></small> {priceIs}
                    </div>
                    <Rating 
                        readonly
                        initialRating={ratingVal}
                        emptySymbol={<img src={emptyStar} className="icon" alt="raing icon" />}
                        fullSymbol={<img src={ fullStar} className="icon" alt="raing icon"  />}
                    /> <small> ({ratingVal} / 5 ) X {product.numberOfRates}</small>

                    <ul id="singleProductPageTab1" className="nav nav-tabs my-2">
                        <li key="tabBtn1" className="active"><a data-toggle="tab" href="#specifications">Specifications</a></li>
                        <li key="tabBtn2" >|<a data-toggle="tab" href="#shippingOptions">Shipping Options</a></li>
                        <li key="tabBtn3" >|<a data-toggle="tab" href="#returnPolicy">return Policy</a></li>
                    </ul>
                    <div className="tab-content ">
                        <div key="specifications" id="specifications"  className="tab-pane fadeIn active">
                            <ul>
                                {productSpecificationsJsx}
                            </ul>
                        </div>
                        <div key="shippingOptions" id="shippingOptions" className="tab-pane fade">
                            {shippingOptionsJsx}

                        </div>
                        <div key="returnPolicy" id="returnPolicy"  className="tab-pane fade">
                            {returnPolicyJsx}
                        </div>
                    </div>


                    <div id="addToCartModule" className="container">
                        <ChangeNumberOfUnitsInCart 
                            productId={product.id} 
                            modifyNumberOfUnits={this.modifyNumberOfUnits}
                            numberOfUnits={this.state.numberOfUnits}
                          />

                        <button 
                            className={`addToCartComponent float-left rounded-pill align-middle border-0 text-white px-3 py-2 ${(this.props.isItemInCart)? " bg-primary " : " bg-success "}`}
                            onClick={

                                    () => this.cartAddRemoveProduct(product)
                                    }
                         >
                                {(this.props.isItemInCart)? 
                                            (<div><FontAwesomeIcon icon={faCheck} className="text-white" /> Added to Cart</div>):
                                            (<div><FontAwesomeIcon icon={faPlus} className="text-white" /> Add to Cart</div>)}
                            
                        </button>
                        <button onClick={() => this.props.toggleFavorite(productId)} className="CartFavItem border-0 float-left mx-2 rounded-circle align-middle " >
                            <FontAwesomeIcon icon={faHeart} className={(isFavorite)? "text-danger":"text-secondary"}  />
                        </button>
                    </div>


                </div>
                <div className="container-fluid">
                    <ul id="singleProductPageTab2" className="nav nav-tabs">
                        <li key="tabBtn1" className="active"><a data-toggle="tab" href="#description">Description</a></li>
                        <li key="tabBtn2" >|<a data-toggle="tab" href="#reviews">Reviews <small>({product.comments.length})</small></a></li>
                    </ul>
                    <div className="tab-content my-2 ">
                        <div key="description" id="description"  className="tab-pane fadeIn active">
                            <p className="px-3">
                                {product.desc}
                            </p>
                        </div>
                        <div key="reviews" id="reviews"  className="tab-pane fade">
                            <ul className="list-group list-group-flush">{reviewsJsx}</ul>
                        </div>
                    </div>
                </div>
            </div>
                <div className="container-fluid" > 
                    <FeaturedProducts  products = {relatedProducts} title="Related Products" ></FeaturedProducts>

                </div>
                <Foooter />

            
            </div>
        )
    }
}



function ProductPageSlider({product}) {
    let productThumbsJsx = product.images.map((image,index) =>{
        let active = (index === 0)? " active " : "";
        return (
                <li key={`productThumb${index}`} className={`float-left ${active}`} >
                    <a data-toggle="tab" href={`#thumb${index}`} >
                        <img className="img-thumbnail ImgScaleDown img-fluid " src={PRODUCT_IMG_URL+image} alt={product.productTitle} />
                    </a>
                </li>
            )
    });
    let productImagesJsx = product.images.map((image,index) =>{
        let active = (index === 0)? " active " : "";
        return (
                <div key={`productImg${index}`} id={`thumb${index}`}  className={`tab-pane fadeIn ${active}`} >
                    <img className="img-fluid"  src={PRODUCT_IMG_URL+image} alt={product.productTitle}  />
                </div>
            )
    });
    
    return (
        <div id="productPageSlider" className=" col-sm-12 col-md-6 align-middle">
            <div className="row container-fluid">
                <div className="col-sm-12 col-md-2">
                    <ul id="productsThumCarousel" className="nav nav-tabs my-2 float-left">
                        {productThumbsJsx}
                    </ul>
                </div>
                <div className="col-sm-12 col-md-10" >
                    <div className="tab-content float-left">
                        {productImagesJsx}
                    </div>
                </div>
            </div>
        </div>
    ) 
}



export default connect(mapStateToProps,mapDispatchToProps)(SingleProductPage);