import C from './constants'
import fetch from 'isomorphic-fetch'
import { ProductService } from '../services/product.service'
import { CategoryService } from '../services/category.service'
let serverURL = "http://localhost:3001/?";



export const fetchProductById = (productId) => async (dispatch , getState) =>{
    try{
        let product = await ProductService.getById(productId);
        dispatch({
            type: C.PRODUCTS.FETCH_PRODUCT_BY_ID,
            payload: product
        });
    }catch(error){
        return new Error(error)

    }
}

export const fetchProductsByCategoryId = (categoryId,loadedProductsOffset,searchKey,sortBy) => async (dispatch,getState) =>{
    try{
        let products = await ProductService.getByCategoryId(categoryId,loadedProductsOffset,searchKey,sortBy);
        dispatch({
            type: C.PRODUCTS.FETCH_PRODUCTS_BY_CATEGORY_ID,
            payload: products
        });
    }catch(error){
        return new Error(error)

    }
}



export const fetchRelatedItemsByProductId = (productId) => async (dispatch,getState) => {
    try{
        let products = await ProductService.getRelateProductsByProductId(productId);
        dispatch({
            type: C.PRODUCTS.FETCH_RELATED_ITEMS_BY_PRODUCT_ID,
            payload: products
        });
    }catch(error){
        return new Error(error)

    }
}


export const fetchListOfCategories = () => async (dispatch , getState) =>{
    try{
        let categories = await CategoryService.getAll();
        dispatch({
            type: C.CATEGORY.FETCH_LIST_OF_CATEGORIES,
            payload: categories
        });
    }catch(error){
        return new Error(error)

    }

}


export const addItemToCart = (product) =>(dispatch , getState) =>{
    console.log(product)
    dispatch({
        type : C.CART.ADD_TO_CART,
        payload:product
    });
}
export const updateNumberOfUnitsAndShippingMethodForOneItemInCart = (product) =>(dispatch , getState) =>{
    console.log(product)
    dispatch({
        type : C.CART.UPDATE_NUMBER_OF_UNITS_AND_SHIPPING_METHOD_FOR_ONE_ITEM_IN_CART,
        payload:product
    });
}
export const removeItemFromCart = (productId) =>(dispatch , getState) =>{
    dispatch({
        type : C.CART.DELETE_ONE_FROM_CART,
        payload:productId
    });
}
export const toggleFavorite = (productId) =>(dispatch , getState) =>{
    if(getState().favorites.includes(productId)){
        dispatch({
            type : C.FAVORITES.REMOVE_FROM_FAVORITES,
            payload:productId
        });
    }else{
        dispatch({
            type : C.FAVORITES.ADD_TO_FAVORITES,
            payload:productId
        });
    }

}


export const setSelectedCategory = (categoryId) =>(dispatch , getState) =>{
    console.log("setSelectedCategory")
    dispatch({
        type : C.VIEW.SELECTED_CATEGORY,
        payload:categoryId
    });
}

export const setLoadedProductsOffset = (offsetValue) =>(dispatch , getState) =>{
    dispatch({
        type : C.VIEW.LOADED_PRODUCTS_OFFSET,
        payload:offsetValue
    });
}
export const setSortBy = (sortBy) =>(dispatch , getState) =>{
    dispatch({
        type : C.VIEW.SET_SORT_BY,
        payload:sortBy
    });
}
export const flushProductsArray = () =>(dispatch , getState) =>{
    dispatch({
        type : C.PRODUCTS.FLUSH_PRODUCTS_ARRAY,
        payload:""
    });
}





export const fetchHomepageComponents = () =>(dispatch , getState) =>{
    fetch(serverURL + "action=fetchHomepageComponents")
    .then(reponse => reponse.json())
    .then(res => {
        dispatch({  
            type : C.HOME_PAGE_COMPONENT.FETCH_HOMEPAGE_COMPONENTS,
            payload:res
        });
        // get List of products from featuredProducts and todayDeals to save in store
        let productsArray = [];
        res.featuredProducts.map(category => {
            let categoryKey = Object.keys(category)[0];
            category[categoryKey].map(product => {
                productsArray.push(product)
            });
        });
        res.todayDeals.map(product => {
            productsArray.push(product)
        });
        dispatch({
            type : C.CATEGORY.FETCH_LIST_OF_CATEGORIES,
            payload:res.categories
        });
    })
    .catch(err =>{
        //TODO handel error
        console.log(err);
    })
}
