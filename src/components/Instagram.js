import React from 'react';
import insta1 from '../img/insta1.jpg'
import insta2 from '../img/insta2.jpg'
import insta3 from '../img/insta3.jpg'
import insta4 from '../img/insta4.jpg'

const Instagram = () => {
    return (
			<div id="instaPhotos" className="col-md-6">
				<div className="row pr-1">
					<div className="col-md-6 p-0 m-0" >
						<img src={insta1} alt="" className="img-fluid "/>
					</div>
					<div className="col-md-6 p-0 m-0">
						<img src={insta2} alt="" className="img-fluid "/>
					</div>
					<div className="col-md-6 p-0 m-0" >
						<img src={insta3} alt="" className="img-fluid "/>
					</div>
					<div className="col-md-6 p-0 m-0">
						<img src={insta4} alt="" className="img-fluid "/>
					</div>
					<div className="col-md-6 p-0 m-0 d-none d-md-block d-lg-none" >
						<img src={insta1} alt="" className="img-fluid "/>
					</div>
					<div className="col-md-6 p-0 m-0 d-none d-md-block d-lg-none">
						<img src={insta2} alt="" className="img-fluid "/>
					</div>
	
				</div>
			</div>
    );
    
}
export default Instagram;
