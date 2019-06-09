import React, { Component }  from 'react';
import {connect } from 'react-redux'
import { NavLink } from "react-router-dom";

import {fetchHomepageComponents} from '../store/actions'
import  FeaturedCategories  from "./FeaturedCategories";
import  FeaturedProducts  from "./FeaturedProducts";
import  SiteHeader  from "./SiteHeader";
import  MainSlider  from "./MainSlider";
import  Jumbotron  from "./Jumbotron";
import  ProductsTabs  from "./ProductsTabs";
import  ThreeColumnSection  from "./ThreeColumnSection";
import  InstagramTesimonials  from "./InstagramTesimonials";
import  Foooter  from "./Foooter";

const mapStateToProps = (state,props) =>{
    return {
      homePageComponents : state.homePageComponents
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
      fetchHomepageComponents(){
        dispatch(fetchHomepageComponents())
      }
    }
  }

  class Home extends Component {
    componentDidMount(){
        //this.props.fetchProductById(0);
        this.props.fetchHomepageComponents();
    }

    render(){

        let content = (Object.keys(this.props.homePageComponents).length === 0)? (
            //Show loading
            <div className="App">
                <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" />
            </div>
        ):(
            <div className="App">
              <SiteHeader />
              <MainSlider  slides = {this.props.homePageComponents.mainSlider} />
              <Jumbotron />
              <FeaturedProducts
                            products = {this.props.homePageComponents.todayDeals}
                            title="New Arrivals"
                            description = "Nibh venenatis cras sed felis eget. Posuere sollicitudin aliquam ultrices sagittis orci.
                            Sapien faucibus et molestie ac feugiat."
                            >
              </FeaturedProducts>
              <ProductsTabs  products = {this.props.homePageComponents.featuredProducts}></ProductsTabs>
              <FeaturedCategories  categories = {this.props.homePageComponents.categories}></FeaturedCategories>
              <hr/>
              <ThreeColumnSection  />
              <hr/>
              <InstagramTesimonials />
              <Foooter />
              
            {/* <p>
                <NavLink to="/categories"> Categories</NavLink>
            </p> */}
            

            </div>
        );
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
