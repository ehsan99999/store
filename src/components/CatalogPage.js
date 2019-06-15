import React, { Component }  from 'react';
import {connect } from 'react-redux'
import {fetchListOfCategories,fetchProductsByCategoryId,setSelectedCategory,setLoadedProductsOffset,flushProductsArray,setSortBy} from '../store/actions'
import  ProductCard  from "./ProductCard";
import  SiteHeader  from "./SiteHeader";
import  Foooter  from "./Foooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faCog} from '@fortawesome/free-solid-svg-icons'


const mapStateToProps = (state) =>{
    return {
        categories : state.categories,
        products : state.products,
        selectedCategory : state.view.selectedCategory,
        loadedProductsOffset : state.view.loadedProductsOffset,
        sortBy : state.view.sortBy
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
        fetchListOfCategories(){
            dispatch(fetchListOfCategories())
        },
        fetchProductsByCategoryId(categoryId,loadedProductsOffset,searchKey,sortBy){
            dispatch(fetchProductsByCategoryId(categoryId,loadedProductsOffset,searchKey,sortBy))
        },
        setSelectedCategory(categoryId,loadedProductsOffset,sortBy){
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
            dispatch(setLoadedProductsOffset(loadedProductsOffset));
            dispatch(fetchProductsByCategoryId(selectedCategory,loadedProductsOffset,searchKey,sortBy));


        }
    }
  }

class CatalogPage extends Component {
    delayTimer;
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
        this.props.fetchProductsByCategoryId(categoryId,loadedProductsOffset,this.state.searchKey,this.props.sortBy);       
    }
    loadMore(){
        this.props.setLoadedProductsOffset(this.props.loadedProductsOffset+1,this.props.selectedCategory,this.state.searchKey,this.props.sortBy);
    }
    formPreventDefault(e) {
        this.search(e)
    }
      
    search(e) {
        e.preventDefault();
        this.props.flushProductsArray();
        this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset,this.state.searchKey,this.props.sortBy);

    }
    changeSearchKey(e){
        this.setState({"searchKey":e.target.value});
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            this.props.flushProductsArray();
            this.props.fetchProductsByCategoryId(this.props.selectedCategory,this.props.loadedProductsOffset,this.state.searchKey,this.props.sortBy);
    
        }, 1500);

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

        let categoriesJsx = categoriesList.map((category ) => {
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
                        <img src={category.image} alt={"category of "+category.name} className="d-none d-md-block mr-2" />
                        <span className={"font-weight-bold my-auto "+active}> {category.name} </span>
                        <span className="badge badge-pill badge-info font-weight-light  my-auto pull-right ml-auto d-block d-md-none d-lg-block">{category.numberOfProducts}</span>
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
                <div className="headerMargin  w-100  ">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className=""><FontAwesomeIcon icon={faCog} className="" /></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item p-0  d-none d-md-block">
                                <form className="" onSubmit={this.formPreventDefault}>
                                        <div className="searchbar bg-info mx-1">
                                            <input className="search_input text-light "
                                                    type="text"
                                                    name="" 
                                                    value={this.state.searchKey} 
                                                    placeholder="Search..." 
                                                    onChange={this.changeSearchKey} />

                                            <button type="submit" className="search_icon" onClick={this.search}><FontAwesomeIcon icon={faSearch} className="" /></button>
                                        </div>
                                </form>
                            </li>
                            <li className="nav-item ">
                                <SortComponentSmall  setSortMethod={this.setSortMethod} sortBy={this.props.sortBy}  />
                            </li>

                            <li className="nav-item d-block d-md-none">
                                <form className="form-inline  input-group my-2 my-lg-0" onSubmit={this.formPreventDefault}>
                                    <input className="form-control btn-outline-info mr-sm-2" type="search"
                                            placeholder="Search" aria-label="Search"
                                            value={this.state.searchKey} 
                                            placeholder="Search..." 
                                            onChange={this.changeSearchKey}/>
                                    <button className="btn btn-outline-info input-group-append " onClick={this.search} type="submit"><FontAwesomeIcon icon={faSearch} className="" /></button>
                                </form>
                            </li>
                            <li className="nav-item dropdown d-block d-md-none">
                                <a className="btn btn-outline-info text-info w-100  nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categories
                                </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {categoriesJsx}
                                    </ul>

                            </li>
                        </ul>

                    </div>
                </nav>

                </div>{/* Div Navbar  */}
                <div className="row  mx-0 " >
                    <div className="col-md-3 d-none d-md-block">
                        <ul className="categoriesList list-group list-group-flush  ">
                            {categoriesJsx}

                        </ul>
                    </div>
                    <div className="col-md-9">
                        <Products  products = {this.props.products} title={activeCategoryName}  ></Products>
                        {showMoreButtonJsx}

                    </div>

                </div>


                <Foooter />

            </div>
        )
    }
}

function SortComponentSmall({setSortMethod,sortBy}){
    let sortByJsx;
    switch (sortBy) {
        case "priceLowToHigh":
                sortByJsx =  (<span className="align-middle">
                            Price: Low to High 
                        </span>);
                break;
        case "priceHighToLow":
                sortByJsx = (<span className="align-middle">
                    Price: High To Low
                </span>);
                break;
        case "ratingHighToLow":
                sortByJsx = (<span className="align-middle">
                    Rating: High To Low
                </span>)
                break;

        default:
                sortByJsx = (<span className="align-middle">
                    Sort Products
                </span>)
                break;

    }
    
    return(
        <div className="dropdown">
            <button className="btn btn-outline-info dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {sortByJsx}
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item text-info"  onClick={()=>{setSortMethod("priceLowToHigh")}}>Price: Low to High</a>
                <a className="dropdown-item text-info"  onClick={()=>{setSortMethod("priceHighToLow")}}>Price: High To Low</a>
                <a className="dropdown-item text-info"  onClick={()=>{setSortMethod("ratingHighToLow")}}>Price: Rating</a>
                <a className="dropdown-item text-info"  onClick={()=>{setSortMethod("")}}>Default</a>
            </div>
        </div>


    )
}

function Products({products,title}){
    if(products.length === 0){
        return (<img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" /> );
    }
    let productsJsx = products.map((product) => {
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