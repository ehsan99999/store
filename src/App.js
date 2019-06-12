import React from 'react';
import './styles/App.css';
import {connect } from 'react-redux'
import { Component } from 'react';
import {fetchProductById,fetchHomepageComponents} from './store/actions'
import FeaturedCategories from "./components/FeaturedCategories.js"
import {BrowserRouter , Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import CategoriesRoute from './components/CategoriesRoute'
import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage'
import SingleProductPage from './components/SingleProductPage'
import Route404 from './components/Route404'
import Navigation from './components/Navigation'





class App extends Component {
  render(){
    return (
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/categories" component={CategoriesRoute}/>
              <Route path="/products/:categoryId" component={ProductsPage}/>
              <Route path="/product/:productId" component={SingleProductPage}/>
              <Route path="/cart" component={CartPage}/>
              <Route  component={Route404}/>
            </Switch>
          </div>
        </BrowserRouter>
      )
  }

}

export default App;

