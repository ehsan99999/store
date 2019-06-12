import C from './constants'
import {combineReducers} from 'redux'
export const products = (state = {},action)=>{
    switch(action.type){
        case C.PRODUCTS.FETCH_PRODUCT_BY_ID :
            return state = [...state,action.payload];
        case C.PRODUCTS.FETCH_RELATED_ITEMS_BY_PRODUCT_ID :
            return state = [...state,...action.payload];
        case C.PRODUCTS.FETCH_PRODUCTS_BY_CATEGORY_ID :
            return state = action.payload;
        case C.PRODUCTS.UPDATE_PRODUCTS_LIST :
            return state = action.payload;
        default:
            return state;
    }
}




export const cart = (state = {}, action) =>{
    switch (action.type) {
        case C.CART.ADD_TO_CART:
            return{...state,listOfAllProductsInCart:[...state.listOfAllProductsInCart,action.payload]}
        case C.CART.DELETE_ONE_FROM_CART:
            return {...state,listOfAllProductsInCart: state.listOfAllProductsInCart.filter(item => item.id !== action.payload)}
        case C.CART.UPDATE_NUMBER_OF_UNITS_AND_SHIPPING_METHOD_FOR_ONE_ITEM_IN_CART:
            let newListOfProductsInCart = state.listOfAllProductsInCart.map(product =>{
                if(product.id === action.payload.id){
                    return action.payload;
                }else{
                    return product
                }
            });
            console.log(newListOfProductsInCart)
            return{...state,listOfAllProductsInCart:[...newListOfProductsInCart]}

        default:
            return state;
    }
}

export const homePageComponents = (state ={}, action) =>{
    switch(action.type){
        case C.HOME_PAGE_COMPONENT.FETCH_HOMEPAGE_COMPONENTS :
            return state = action.payload;
        default:
            return state;
    }

    
}
export const categories = (state ={}, action) =>{
    switch(action.type){
        case C.CATEGORY.FETCH_LIST_OF_CATEGORIES :
            return state = action.payload;
        default:
            return state;
    }

    
}
export const favorites = (state ={}, action) =>{
    switch(action.type){
        case C.FAVORITES.ADD_TO_FAVORITES :
            return state = [...state,action.payload];
        case C.FAVORITES.REMOVE_FROM_FAVORITES :
            return state = state.filter(fav => fav !== action.payload);
        default:
            return state;
    }

    
}

export default combineReducers({
    products,
    categories,
    cart,
    favorites,
    homePageComponents


});