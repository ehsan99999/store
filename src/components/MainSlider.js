import React, { Component }  from 'react';


class MainSlider extends Component{
    //Gets the data about home page slider and generate code for the slider
    render(){
        if(this.props.slides === undefined)
            return("");
        let slides = this.props.slides;
        let slideIndexesString = slides.map((slide , index)=>{
            return(
                <li key={index} data-target="#slides" data-slide-to={index} className={(index===0)? "active" : ""}></li>
            )

        })
        let sliderString = slides.map((slide , index)=> {
            let slideIndex = index+1;
            let isActive = (slideIndex===1)? "active" : "";
            return(
                    <div key={"slide"+index+1} id={"slide"+slideIndex} className={"carousel-item " + isActive}>
                        <img src={slide.img} alt={slide.caption.title} />
                        <div className="carousel-caption row " >
                            <div className="text-left">
                                <span className="newArrivalTag">{slide.caption.tag}</span>
                                <h1 className="display-2">{slide.caption.title}</h1>
                                <h3>{slide.caption.description}</h3>
                                <button className="btn btn-primary " type="button">Discover</button>
                            </div>
                        </div>
                    </div>
            )
        })

        return(
            <div id="slides" className="carousel slide" data-ride="carousel" >
                <ul className="carousel-indicators d-none d-sm-flex">
                    {slideIndexesString}
                </ul>
                <div className="carousel-inner " >
                    {sliderString}
                </div>  

            </div>
        )
    }
}

export default MainSlider;