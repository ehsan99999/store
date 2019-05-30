import React from 'react';
import face1 from '../img/face1.jpg'
import face2 from '../img/face2.jpg'
import face3 from '../img/face3.jpg'

const Testimonials = () => {
    return (
        <div id="testimonialsContainer" className="col-md-6" >
            <div className="col-12 p-1">
					<h3 className="display-6 p-1">Testimonials</h3>
					<hr className="p0 m0 thickShortLine" />
			</div>
            <div id="testimonialsCarousel" className="carousel slide" data-ride="carousel" data-interval="false">
                <ol className="carousel-indicators">
                    <li data-target="#testimonialsCarousel" data-slide-to="0" className="active red"></li>
                    <li data-target="#testimonialsCarousel" data-slide-to="1"></li>
                    <li data-target="#testimonialsCarousel" data-slide-to="2"></li>
				</ol>
                <div className="carousel-inner">
                    <div className="carousel-item active px-1 py-1">
                        <img src={face1} className="testimoniAvatar rounded-circle d-flex justify-content-start" />
                        <blockquote className="blockquote text-left pxy-2 pb-5">
                                <p className="mb-0" >non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi
                                        etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare.</p>
                                <footer className="blockquote-footer ">Jain Doe - <cite title="Source Title">Marketing Manager</cite></footer>
                        </blockquote>
                    </div>
                    <div className="carousel-item  px-1 py-1">
                        <img src={face2} className="testimoniAvatar rounded-circle d-flex justify-content-start" />
                        <blockquote className="blockquote text-left pxy-2 pb-5">
                                <p className="mb-0" >tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium
                                        nibh ipsum consequat nisl lectus quam id.</p>
                                <footer className="blockquote-footer ">Jole Doe - <cite title="Source Title">Marketing Manager</cite></footer>
                        </blockquote>
                    </div>
                    <div className="carousel-item  px-1 py-1">
                        <img src={face3} className="testimoniAvatar rounded-circle d-flex justify-content-start" />
                        <blockquote className="blockquote text-left pxy-2 pb-5">
                                <p className="mb-0" >turpis in eu mi bibendum congue quisque egestas diam in arcu
                                        cursus euismod quis viverra nibh cras pulvinar.</p>
                                <footer className="blockquote-footer ">Jhon Doe - <cite title="Source Title">Marketing Manager</cite></footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
export default Testimonials;
