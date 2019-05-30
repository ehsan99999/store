import React from 'react';

const Jumbotron = () => {
    return (
        <div className="container-fluid">
            <div className="row jumbotron ">
                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 ">
                    <p className="lead text-justify" >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci phasellus egestas.
                        Eu feugiat pretium nibh ipsum consequat. 
                    </p>
                </div>
                <div className="callToActionDiv col-xs-12 col-sm-12 col-md-3  col-lg-3 col-xl-2 my-auto text-center">
                    <a href="#"><button className="btn btn-outline-secondary " type="button">Take Action</button></a>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron;