import React, { Component }  from 'react';
import  Testimonials  from "./Testimonials";
import  Instagram  from "./Instagram";


class InstagramTesimonials extends Component{

    render(){
        return(
            <div className="container-fluid padding">
                <div className="row text-center">
                    <Instagram />
                    <Testimonials />
                </div>
            </div>

        )
    }
}

export default InstagramTesimonials;