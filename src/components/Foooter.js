import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram,faFacebookSquare,faTwitter } from '@fortawesome/free-brands-svg-icons'

const Foooter = () => {
    return (
<footer className="sitefooter">
	<div className="container-fluid padding">
		<div className="row text-center">
			<div className="col-md-3">
				<p>HELP & INFORMATION</p>
				<hr className="light"/>
				<p>Help</p>
				<p>Delivery and Returns</p>
				<p>10% Student Discount</p>
				<p>Terms & Conditions</p>
			</div>
			<div className="col-md-3">
				<p>About OnlineShop</p>
				<hr className="light"/>
				<p>About Us</p>
				<p>Carriers at OnlineShop</p>
				<p>Our Partners</p>
				<p>Who made the website</p>
			</div>
			<div className="col-md-3">
				<p>Menu</p>
				<hr className="light"/>
				<p>Shop</p>
				<p>Journal</p>
				<p>Track Order</p>
				<p>Contact Us</p>
			</div>
			<div className="col-md-3">
				<p>Our Offices</p>
				<hr className="light"/>
				<p>City , State , 00000</p>
				<p>City , State , 00000</p>
				<p>City , State , 00000</p>
				<p>
					<span className="socialIcon" href="#"><FontAwesomeIcon icon={faInstagram} /></span>
					<span className="socialIcon" href="#"><FontAwesomeIcon icon={faTwitter} /></span>
					<span className="socialIcon" href="#"><FontAwesomeIcon icon={faFacebookSquare} /></span>
				</p>
			</div>
			<div className="col-12">
				<hr className="light-100"/>
				<h5><a target="blank" href="http://sotoodeh.pro" >&copy; Sotoodeh.pro </a></h5>
					</div>
				</div>
			</div>

		</footer>

    );
    
}
export default Foooter;
