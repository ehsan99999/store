import React, { Component }  from 'react';
import {connect } from 'react-redux'
import  SiteHeader  from "./SiteHeader";
import  Foooter  from "./Foooter";
import C from '../store/constants'
import  ChangeNumberOfUnitsInCart  from "./miniComponents/ChangeNumberOfUnitsInCart";
import {updateNumberOfUnitsAndShippingMethodForOneItemInCart,removeItemFromCart} from '../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faSearchDollar, faShoppingBasket, faCheckSquare} from '@fortawesome/free-solid-svg-icons'
import { faSquare} from '@fortawesome/free-regular-svg-icons'
import { faPaypal} from '@fortawesome/free-brands-svg-icons'
import {Accordion,Card} from 'react-bootstrap'
const PRODUCT_IMG_URL = C.OTHERS.PRODUCT_IMG_URL;
const TAX_RATE = 11;

const mapStateToProps = (state,props) =>{
    return {
        listOfAllProductsInCart : state.cart.listOfAllProductsInCart,
        addresses : state.cart.address
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
        updateNumberOfUnitsAndShippingMethodForOneItemInCart(productId,numberOfUnits){
            dispatch(updateNumberOfUnitsAndShippingMethodForOneItemInCart(productId))
        },
        removeItemFromCart(productId){
            dispatch(removeItemFromCart(productId))
        }
    }
  }

class CartPage extends Component{
    constructor(props){
        super(props);
        this.state = {selectedAddress: 0};

    }
    componentDidMount() {

    }
    updateSelectedAddress = (selectedAddress)=>{
        this.setState({selectedAddress : selectedAddress});

    }

    modifyNumberOfUnits = (action,productId)=>{
        let product = this.props.listOfAllProductsInCart.filter(product => {
            if(product.id === productId){
                return product;
            } 
        })[0];
        
        switch (action) {
            case "INCREMENT":
                product.numberOfUnits++;
                break;
            case "DECREMENT":
                if( product.numberOfUnits < 2)
                    return;
                    product.numberOfUnits--;
                break;
            default:
                break;
        }
        this.props.updateNumberOfUnitsAndShippingMethodForOneItemInCart(product)
    }
    updateShippingMethod = (event,productId)=>{
        var shippingOption = parseInt(event.target.value);
        var index = event.target.selectedIndex;
        var optionElement = event.target.childNodes[index]
        productId =  parseInt(optionElement.getAttribute('data-id'));

        let product = this.props.listOfAllProductsInCart.filter(product => {
            if(product.id === productId) 
                return product;
        })[0];

        product.shippingOption = shippingOption;
        this.props.updateNumberOfUnitsAndShippingMethodForOneItemInCart(product)

    }
    removeFromCart = (productId)=>{
        this.props.removeItemFromCart(productId);

    }
    render(){

        let itemsInCartJsx = this.props.listOfAllProductsInCart.map(product => {
            product.productTitle = (product.productTitle.length > 20)?
                                    product.productTitle.slice(0,19):
                                    product.productTitle;
            product.price = parseInt(product.price);
            let shippingOptions = [
                0, //Cause shipping options in selectShippingMode start from 1
                parseInt(((product.price * 11)/100)),
                parseInt(((product.price * 14)/100)),
                parseInt(((product.price * 19)/100))
            ];

            let shippingOptionsJsx =(
                <select id="selectShippingMode" className="custom-select-sm" onChange={this.updateShippingMethod} value={product.shippingOption}>
                    <option data-id={product.id} value="1"> ${shippingOptions[0]} - Regular: within 10-15 days delivery</option>
                    <option data-id={product.id} value="2">${shippingOptions[1]} - Fast: within 5-7 days delivery</option>
                    <option data-id={product.id} value="3">${shippingOptions[2]} - Express: 2-day delivery</option>
                </select>
            );

            let unitPrice = ((product.price) ) * product.numberOfUnits;
            let shippingCost = shippingOptions[product.shippingOption] * product.numberOfUnits;

            return(
                <tr className="align-middle" key={"product"+product.id+"InCart"} >
                    <td className="px-2 align-middle" >
                        <img className=" productThumb  ImgScaleDown productThumb" src={PRODUCT_IMG_URL+product.productImage} alt={product.productImage} />
                    </td>
                    <td className="pr-3 pl-2 align-middle ">
                        <p className="">{product.productTitle}</p>
                    </td>
                    <td className="px-3 align-middle">
                        <ChangeNumberOfUnitsInCart productId={product.id} modifyNumberOfUnits={this.modifyNumberOfUnits} numberOfUnits={product.numberOfUnits} />
                    </td>
                    <td className="px-3 align-middle">
                    {shippingOptionsJsx}

                    </td>
                    <td className="px-3 align-middle">
                        <p>${unitPrice}</p>
                    </td>
                    <td className="px-3 align-middle">
                        <p>${shippingCost}</p>
                    </td>
                    <td className="px-3 align-middle">
                        <button className="btn btn-danger btn-sm" onClick={()=>{this.removeFromCart(product.id)}}>  remove</button>
                    </td>
                </tr>
            )
        });

         return(
            <div className="cartPage">
                <SiteHeader />
                <div className="headerMargin row container-fluid mx-0">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table id="productsInCart" className="my-3 table  table-hover m-auto">
                                <thead className="">
                                    <tr>
                                        <th> </th>
                                        <th className="">Item</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Shipping Method</th>
                                        <th className="text-center">Total Price</th>
                                        <th className="text-center">Shipping Cost</th>
                                        <th > </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsInCartJsx}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
                <hr/>
                <div className="row container-fluid">
                    <div className="addressSelect col-md-8 ">
                        <AddressAccordion 
                            addresses={this.props.addresses} 
                            selectedAddress={this.state.selectedAddress} 
                            updateSelectedAddress={this.updateSelectedAddress} />

                    </div>
                    <div className="col-md-4 ">
                        <OrderSummary listOfAllProductsInCart={this.props.listOfAllProductsInCart} />
                    </div>
                </div>

                <Foooter />            
            </div>
        )
    }
}



function OrderSummary({listOfAllProductsInCart}) {
    let subTotalCost = 0;
    listOfAllProductsInCart.map(product=>{
        let itemCost = (product.price * product.numberOfUnits);
        let shippingOptions = [
            0, //Cause shipping options in selectShippingMode start from 1
            parseInt(((product.price * 11)/100)),
            parseInt(((product.price * 14)/100)),
            parseInt(((product.price * 19)/100))
        ];
        let shippingCost = shippingOptions[product.shippingOption] * product.numberOfUnits;
        subTotalCost += itemCost + shippingCost;
        return product;
    })
    let totalCost = ((subTotalCost * TAX_RATE)/100) + subTotalCost;
    return(
        <div>
            <div>
                <h3 className="ml-3">Order Summary</h3>
                <p className="ml-3">{listOfAllProductsInCart.length} items total</p>
            </div>
            <div>
                <ul className="list-group list-group-flush ">
                    <li className="list-group-item d-flex flex-row">
                        <div>Subtotal</div> <div className="ml-auto">${subTotalCost}</div>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <div>Total</div> <div className="ml-auto">${totalCost}</div>
                    </li>
                    <li className="list-group-item">
                        <span className="text-primary" data-toggle="collapse" data-target="#promoDiv">
                            Apply promo code <FontAwesomeIcon icon={faChevronDown} className="fontAwesomeIcon" /> 
                        </span>
                        <div id="promoDiv" className="collapse">
                        <div className="input-group input-group-sm mb-3">
                            <input 
                                type="text"
                                className="form-control mt-2 " 
                                placeholder="Enter your promo code" 
                                />
                            <div className="input-group-append mt-2">
                                <button className="input-group-text" id="basic-addon1">
                                    <FontAwesomeIcon icon={faSearchDollar} className="" />
                                </button>
                            </div>
                        </div>

                            <p className="fontAwesomeIcon text-danger">Not Implemented yet...</p>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <button className="btn btn-success w-100" onClick={()=>{alert("Thanks for your time!")}} >
                            <FontAwesomeIcon icon={faShoppingBasket} className="mr-2" /> Checkout
                        </button>
                    </li>
                    <li className="list-group-item">
                        <button className="btn btn-info w-100 font12rem" onClick={()=>{alert("Thanks for your time!")}} >
                            <FontAwesomeIcon icon={faPaypal} className="mr-2" />PayPal <span className="font07rem">Checkout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}


function AddressAccordion({addresses , selectedAddress,updateSelectedAddress}) {
    let addressesJsx = addresses.map((address,index )=>{
        let broder = (index === selectedAddress)?  "border border-warning" : "";
        let checkMarkIcon = (index === selectedAddress)?
                                <FontAwesomeIcon icon={faCheckSquare} className="checkMark text-warning ml-auto" />:
                                <FontAwesomeIcon icon={faSquare} className="  checkMark text-warning ml-auto" />;


        return (

            <div key={`addressCard${index}`} className={`addressCard card ${broder} `}  onClick={()=>{updateSelectedAddress(index)}}>
                <div className="card-body">
                    <div>
                        <h4 className="font10rem card-title  d-flex flex-row">
                            <span>{address.street}</span>
                            {checkMarkIcon}
                        </h4>
                    </div>
                    <hr/>
                    <ul className="px-1">
                        <li className="card-text font09rem">{address.street}</li>
                        <li className="card-text font09rem">{address.city}</li>
                        <li className="card-text font09rem">{address.province}</li>
                        <li className="card-text font09rem">{address.zip}</li>
                    </ul>
                </div>
            </div>
        )
    });
    return(
        <Accordion defaultActiveKey="0">
            <Card >
                <Accordion.Toggle className="d-flex flex-row" as={Card.Header} eventKey="0">
                    <span>Select From Last Purchase</span>
                    <FontAwesomeIcon icon={faChevronDown} className="  align-middle ml-auto my-auto fontAwesomeIcon" />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <div className="card-deck">
                        {addressesJsx}
                    </div>

                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle  className="d-flex flex-row" as={Card.Header} eventKey="1">
                    <span> Enter Address </span>
                    <FontAwesomeIcon icon={faChevronDown} className="  align-middle ml-auto my-auto fontAwesomeIcon" />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="inputAddress" placeholder="Address"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="City" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-4">
                        <select id="inputState" className="form-control" defaultValue={0}>
                            <option >Select Province / State</option>
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <input type="text" className="form-control" placeholder="Zip" id="inputZip"/>
                        </div>
                    </div>
                    </form>

                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}



export default connect(mapStateToProps,mapDispatchToProps)(CartPage);