import React, { Component }  from 'react';
import {connect } from 'react-redux'
import {fetchListOfCategories,fetchProductsByCategoryId,setSelectedCategory,setLoadedProductsOffset,flushProductsArray,setSortBy} from '../store/actions'
import  ProductCard  from "./ProductCard";
import  SiteHeader  from "./SiteHeader";
import  Foooter  from "./Foooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faDollarSign, faStarHalfAlt,faSortAmountDown} from '@fortawesome/free-solid-svg-icons'
import dollarSymbol from '../img/dollarSymbol.svg'
import upArrow from '../img/upArrow.svg'
import downArrow from '../img/downArrow.svg'
import dollarSignDown from '../img/dollarSignDown.png'
import dollarSignUp from '../img/dollarSignUp.png'


const mapStateToProps = (state,props) =>{
    return {
        categories : state.categories,
        products : state.products,
        selectedCategory : state.view.selectedCategory,
        loadedProductsOffset : state.view.loadedProductsOffset,
        sortBy : state.view.sortBy
    }
  }
  
  const mapDispatchToProps = (dispatch,state) => {
    return{
        fetchListOfCategories(){
            dispatch(fetchListOfCategories())
        },
        fetchProductsByCategoryId(categoryId,loadedProductsOffset,searchKey,sortBy){
            console.log(sortBy);

            dispatch(fetchProductsByCategoryId(categoryId,loadedProductsOffset,searchKey,sortBy))
        },
        setSelectedCategory(categoryId,loadedProductsOffset,sortBy){
            console.log(this)
            dispatch(setLoadedProductsOffset(0));
            dispatch(setSelectedCategory(categoryId,loadedProductsOffset));
            dispatch(flushProductsArray());
            dispatch(fetchProductsByCategoryId(categoryId,0,"",sortBy));

        },
        flushProductsArray(){
            dispatch(flushProductsArray());
        },
        setSortBy(sortBy){
            dispatch(setSortBy(sortBy));
        },
        setLoadedProductsOffset(loadedProductsOffset,selectedCategory,searchKey,sortBy){
            console.log(selectedCategory)
            dispatch(setLoadedProductsOffset(loadedProductsOffset));
            dispatch(fetchProductsByCategoryId(selectedCategory,loadedProductsOffset,searchKey,sortBy));


        }
    }
  }

class CatalogPage extends Component {
    constructor(props){
        super(props);
        this.state = {searchKey: ''};

        this.loadMore = this.loadMore.bind(this);
        this.changeSearchKey = this.changeSearchKey.bind(this);
        this.search = this.search.bind(this);
        this.setSortMethod = this.setSortMethod.bind(this);

    }
    componentDidMount(){
        this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset,this.state.searchKey,this.props.sortBy)

    }
    fetchProductsByCategory (categoryId,loadedProductsOffset){
        //this.props.setSelectedCategory(categoryId,loadedProductsOffset);
        this.props.fetchProductsByCategoryId(categoryId,loadedProductsOffset,this.state.searchKey,this.props.sortBy);
        console.log(this.state)

        
    }
    loadMore(){
        console.log(this.props.loadedProductsOffset)

        this.props.setLoadedProductsOffset(this.props.loadedProductsOffset+1,this.props.selectedCategory,this.state.searchKey,this.props.sortBy);
        console.log(this.props.loadedProductsOffset)

        //this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset);

    }
    formPreventDefault(e) {
        this.search(e)
    }
      
    search(e) {
        e.preventDefault();
        this.props.flushProductsArray();
        this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset,this.state.searchKey,this.props.sortBy);
        alert("0")
    }
    changeSearchKey(e){
        this.setState({"searchKey":e.target.value})
    }

    setSortMethod(sortMethod){
        this.props.setSortBy(sortMethod)
        this.props.flushProductsArray();

        this.props.fetchProductsByCategoryId(this.props.selectedCategory,
                                            this.props.loadedProductsOffset,
                                            this.state.searchKey,
                                            this.props.sortBy);

    }

    render(){
        //TODO Add favorites 
        /*TODO add search
            - add Timer            
        */
        //TODO add sort {price up - price down - rating }

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
                    onClick={()=>{this.props.setSelectedCategory(category.id,this.props.loadedProductsOffset,this.props.sortBy)}}>
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


        return (
            <div className="catalogPage">
                <SiteHeader />
                <div className="row mt-5 mx-0 " >
                    <div className="col-12 ">
                        <nav className="bg-light d-flex flex-row-reverse flex-row  ">
                                <div className="mx-3">
                                    <form className="" onSubmit={this.formPreventDefault}>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={this.state.searchKey} placeholder="Search" onChange={this.changeSearchKey}/>
                                            <div className="input-group-btn">
                                            <button className="btn btn-default" type="submit" onClick={this.search}>
                                                <FontAwesomeIcon icon={faSearch} className="" />
                                            </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>{/* SearchBar */}
                                
                                <SortComponent  setSortMethod={this.setSortMethod} sortBy={this.props.sortBy}  />

                        </nav>
                    </div>{/* Div Navbar  */}
                    <div className="col-3 ">
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

function SortComponent({setSortMethod,sortBy}){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",sortBy);
    let sortByJsx;
     
    switch (sortBy) {
        case "priceLowToHigh":
                sortByJsx =  (<span className="align-middle">
                            <img src={dollarSignUp} width={25} height={25}  />
                        </span>);
                break;
        case "priceHighToLow":
                sortByJsx = (<span className="align-middle">
                    <img src={dollarSignDown} width={25} height={25}  />
                </span>);
                break;
        case "ratingHighToLow":
                sortByJsx = (<FontAwesomeIcon icon={faStarHalfAlt} className="mr-2" />)
                break;

        default:
                sortByJsx = (<FontAwesomeIcon icon={faSortAmountDown} className="" />)
                break;

    }
    
    return(
        <div className="btn-group">
            <button type="button" className="btn btn-sm btn-info dropdown-toggle align-middle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {/* <FontAwesomeIcon icon={faSortAmountDown} className="" /> */}
                {/* <img src={upArrow} width={20} height={20} fill-color="#ffffff" /> */}
                {sortByJsx}
            </button>
            <div className="dropdown-menu ">
                <a className="dropdown-item text-info" onClick={()=>{setSortMethod("priceLowToHigh")}}>
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> Low to High
                </a>
                <a className="dropdown-item text-info"  onClick={()=>{setSortMethod("priceHighToLow")}} >
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> High To Low
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item text-info" onClick={()=>{setSortMethod("ratingHighToLow")}}>
                    <FontAwesomeIcon icon={faStarHalfAlt} className="mr-2" /> Rating
                </a>
            </div>
        </div>
    )
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