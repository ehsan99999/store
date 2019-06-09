import C from './constants'
import fetch from 'isomorphic-fetch'
let serverURL = "http://localhost:3001/?";


export const fetchProductById = (productId) =>(dispatch , getState) =>{
    fetch(serverURL + "action=fetchProductById&productId="+productId )
    .then(reponse => reponse.json())
    .then(res => {
        dispatch({
            type : C.PRODUCTS.FETCH_PRODUCT_BY_ID,
            payload:res
        });
    })
    .catch(err =>{
        //TODO handel error
        console.log(err);
    })
}
export const addItemToCart = (product) =>(dispatch , getState) =>{
    dispatch({
        type : C.CART.ADD_TO_CART,
        payload:product
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






export const fetchProductsByCategoryId = (categoryId) =>(dispatch,getState) =>{
    fetch(serverURL + "action=fetchProductsByCategoryId&categoryId="+categoryId)
    .then(response => response.json())
    .then(res => {
        dispatch({
            type : C.PRODUCTS.FETCH_PRODUCTS_BY_CATEGORY_ID,
            payload:res
        });

    })
}
export const fetchRelatedItemsByProductId = (productId) =>(dispatch,getState) =>{
    fetch(serverURL + "action=fetchRelatedItemsByProductId&productId="+productId)
    .then(response => response.json())
    .then(res => {
        dispatch({
            type : C.PRODUCTS.FETCH_RELATED_ITEMS_BY_PRODUCT_ID,
            payload:res
        });

    })
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
            type : C.PRODUCTS.UPDATE_PRODUCTS_LIST,
            payload:productsArray
        });
    })
    .catch(err =>{
        //TODO handel error
        console.log(err);
    })
}
export const fetchListOfCategories = () =>(dispatch , getState) =>{
    fetch(serverURL + "action=fetchListOfCategories")
    .then(reponse => reponse.json())
    .then(res => {
        console.log(res)
        dispatch({  
            type : C.CATEGORY.FETCH_LIST_OF_CATEGORIES,
            payload:res
        });
    })
    .catch(err =>{
        //TODO handel error
        console.log(err);
    })
}