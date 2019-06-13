import React, { Component }  from 'react';
import {connect } from 'react-redux'
import {fetchListOfCategories,fetchProductsByCategoryId,setSelectedCategory,setLoadedProductsOffset,flushProductsArray} from '../store/actions'
import  ProductCard  from "./ProductCard";
import  SiteHeader  from "./SiteHeader";
import  Foooter  from "./Foooter";
const mapStateToProps = (state,props) =>{
    return {
        categories : state.categories,
        products : state.products,
        selectedCategory : state.view.selectedCategory,
        loadedProductsOffset : state.view.loadedProductsOffset,
    }
  }
  
  const mapDispatchToProps = (dispatch,state) => {
    return{
        fetchListOfCategories(){
            dispatch(fetchListOfCategories())
        },
        fetchProductsByCategoryId(categoryId,loadedProductsOffset){
            dispatch(fetchProductsByCategoryId(categoryId,loadedProductsOffset))
        },
        setSelectedCategory(categoryId,loadedProductsOffset){
            console.log(this)
            dispatch(setLoadedProductsOffset(0));
            dispatch(setSelectedCategory(categoryId,loadedProductsOffset));
            dispatch(flushProductsArray());
            dispatch(fetchProductsByCategoryId(categoryId,0));

        },
        setLoadedProductsOffset(loadedProductsOffset,selectedCategory){
            console.log(selectedCategory)
            dispatch(setLoadedProductsOffset(loadedProductsOffset));
            dispatch(fetchProductsByCategoryId(selectedCategory,loadedProductsOffset));


        }
    }
  }

class CatalogPage extends Component {
    constructor(props){
        super(props);
        this.loadMore = this.loadMore.bind(this);

    }
    componentDidMount(){
        this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset)

    }
    fetchProductsByCategory (categoryId,loadedProductsOffset){
        //this.props.setSelectedCategory(categoryId,loadedProductsOffset);
        this.props.fetchProductsByCategoryId(categoryId,loadedProductsOffset);
        console.log(this.state)

        
    }
    loadMore(){
        console.log(this.props.loadedProductsOffset)

        this.props.setLoadedProductsOffset(this.props.loadedProductsOffset+1,this.props.selectedCategory);
        console.log(this.props.loadedProductsOffset)

        //this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset);

    }


    render(){
        //TODO Add favorites 
        /*TODO add search
            - add search box
            - add event listener 
            
        */
        //TODO add sort {price up - price down - rating }
        // TODO LoadMore ... 

        console.log(this.props)
        if(this.props.categories.length === 0 ){
            this.props.fetchListOfCategories();
        }

        let activeCategoryName = "";
        let categoriesList = [...this.props.categories];
        categoriesList.unshift({
            "id": -1,
            "image": "http://gwf-demo.usask.ca/DummyServer/images/miniLogo2.png",
            "name": "All Products",
            "numberOfProducts": 202,
            "parentId": 0
        });

        let categoriesJsx = categoriesList.map((category,index ) => {
            let active = "";
            if (this.props.selectedCategory === category.id){
                active = "activeli";
                activeCategoryName = category.name;
            }
            return(
                <li 
                    className=" list-group-item list-group-item-action d-flex" 
                    key={"categoryId-"+category.id} 
                    onClick={()=>{this.props.setSelectedCategory(category.id,this.props.loadedProductsOffset)}}>
                        <img src={category.image} alt={"category of "+category.name} className="mr-2" />
                        <span className={"font-weight-bold my-auto "+active}> {category.name} </span>
                        <span className="badge badge-pill badge-info font-weight-light  my-auto pull-right ml-auto">{category.numberOfProducts}</span>
                </li>
            )
        });

        // Wether or not to show "load more products" button 
        let indexOfSelectedCategory = categoriesList.findIndex(category =>{
            return category.id === this.props.selectedCategory;
        });
        let numberOfProductsInSeletedCategory = categoriesList[indexOfSelectedCategory].numberOfProducts;
        let showMoreButtonJsx = (numberOfProductsInSeletedCategory <= this.props.products.length)?(
            <div></div>
        ):(
            <div className="d-flex justify-content-center mt-0">
                <button className="btn btn-outline-primary" onClick={this.loadMore}>Load More Products...</button>
            </div>
        );
        console.log(numberOfProductsInSeletedCategory," : ",this.props.products.length)
        console.log(showMoreButtonJsx)

        return (
            <div className="catalogPage">
                <SiteHeader />
                <div className="row headerMargin" >
                    <div className="col-3 headerMargin">
                        <ul className=" categoriesList list-group list-group-flush  ">
                            {categoriesJsx}

                        </ul>
                    </div>
                    <div className="col-9">
                        <Products  products = {this.props.products} title={activeCategoryName}  ></Products>
                        {showMoreButtonJsx}

                    </div>

                </div>


                <Foooter />

            </div>
        )
    }
}

function Products({products,title}){
    if(products.length === 0){
        return (<img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" /> );
    }
    let productsJsx = products.map((product,index) => {
        return (<ProductCard  key={"loaddedProduct-"+product.id} product = {product} />)
    });
    let titleJsx = (title === undefined)?
    (<div></div>) :
    (
        <div className="col-12">
            <h2 className="display-6 text-uppercase">{title}</h2>
        </div>
    );

    return(
        <div>
            <div className="container-fluid">
                <div className="row welcome text-center">
                    {titleJsx}

                </div>
            </div>
            <div className="container-fluid padding">
                <div className="row padding">{productsJsx}</div>
            </div>

        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(CatalogPage);