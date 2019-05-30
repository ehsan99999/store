import React, { Component }  from 'react';
import {connect } from 'react-redux'
import {fetchListOfCategories} from '../store/actions'

const mapStateToProps = (state,props) =>{
    return {
        categories : state.categories
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
        fetchListOfCategories(){
        dispatch(fetchListOfCategories())
      }
    }
  }

class CategoriesRoute extends Component {
    componentDidMount(){
        //this.props.fetchProductById(0);
        console.log("fetchListOfCategories")
        this.props.fetchListOfCategories();
    }
    render(){
        let content = (this.props.categories.length > 0 )?
        (
            this.props.categories.map(category => {
                return(
                    <div  key={category.id}>
                        <img src={category.image} />
                    </div>
                )
                })
        ):
        (
             <div className="App">
                <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" />
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoriesRoute);