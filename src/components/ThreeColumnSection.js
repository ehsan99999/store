import React from 'react';
import barcode from '../img/barcode.png'
import delivery from '../img/delivery.png'
import creditCard from '../img/credit-card.png'


const ThreeColumnSection = () => {
    return (
        <div id="whyOnlineshop" className ="container-fluid ">
            <div className="row text-center padding">
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <img src={delivery} alt="Free Shipping" />
                    <h3>Free Shipping</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <img src={barcode} alt="Customer Support" />
                    <h3>Customer Support</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="col-xs-12 col-md-4">
                    <img src={creditCard} alt="Secure Payments" />
                    <h3>Secure Payments</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    )
}

export default ThreeColumnSection;