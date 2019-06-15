import initialState from './initialState.json'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux"

const consoleMessages = store => next => action => {
    //console.log("old : ",JSON.stringify(store.getState()));
    console.log(action)
    let results = next(action);
    //console.log("new : ",(store.getState()));
    return results;
}

export default () =>{
    return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer,initialState)
}