import React, { Component }  from 'react';


class FeaturedCategories extends Component{

    render(){
        console.log(this.props.categories);
        let categories = this.props.categories;
        let i,j,chunk = 6;
        let categoriesChunks = [];
        for (i=0,j=categories.length; i<j; i+=chunk) {
            categoriesChunks.push(categories.slice(i,i+chunk));
            // do whatever
        }
        console.log(categoriesChunks.length);
        //Carousel indicators
        let carouselIndicatorsJsx = [];
        for(i=0;i<categoriesChunks.length;i++){
            let active = (i === 0)? "active" : "";
            carouselIndicatorsJsx.push(<li key={"multiItemsCarousel"+i} data-target="#multiItemsCarousel" data-slide-to={i} className={"red " + active} ></li>);
        }

        let categoriesListJsx = categoriesChunks.map((chunk , index) => {
            let categoriesChunkList = chunk.map((category , index) =>{
                return (
                    <div key={category.id} className="col-sm-6 col-md-3 col-lg-2 ">
                        <div className=" " >
                                <img className="card-img-top" src={category.image} alt="Cardcap" />
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                        </div>
                    </div>
                );
            });
            let active = (index < 1)? "active" : "";

            return(
                <div key={"carousel-item"+index} className={"carousel-item px-1 py-1 " + active}>
                    <div className="row ">
                        {categoriesChunkList}
                    </div>
                </div>

            );


        });


        return(
            <div>
                <div className="container-fluid">
                        <div className="row welcome text-center">
                            <div className="col-12">
                                <h2 className="display-6 text-uppercase">Categories</h2>
                            </div>
                            <div className="col-12">
                                <p className="lead">
                                    Nibh venenatis cras sed felis eget. Posuere sollicitudin aliquam ultrices sagittis orci.
                                    Sapien faucibus et molestie ac feugiat.
                                </p>
                            </div>
                        </div>
                </div>
                <div id="CategoriesMultiItemCarousel" className="container-fluid padding">
                    <div id="multiItemsCarousel" className="carousel slide col-12" data-ride="carousel" data-interval="false">
                        <ol className="carousel-indicators">
                            {carouselIndicatorsJsx}
                        </ol>
                        <a className="carousel-control-prev left align-middle  " href="#multiItemsCarousel" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next right align-middle" href="#multiItemsCarousel" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                        </a>
                        <div className="carousel-inner">
                            {categoriesListJsx}
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}

export default FeaturedCategories;