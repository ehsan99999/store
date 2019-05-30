import C from './constants'
import {combineReducers} from 'redux'
export const products = (state = {},action)=>{
    switch(action.type){
        case C.PRODUCTS.FETCH_PRODUCT_BY_ID :
            return state = action.payload;
        case C.PRODUCTS.FETCH_PRODUCTS_BY_CATEGORY_ID :
            return state = action.payload;
        case C.PRODUCTS.UPDATE_PRODUCTS_LIST :
            return state = action.payload;
        default:
            return state;
    }
}




export const cart = (state = {}, action) =>{
    return state;
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

export default combineReducers({
    products,
    categories,
    cart,
    homePageComponents


});