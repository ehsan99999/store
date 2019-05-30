import React, { Component }  from 'react';
import {connect } from 'react-redux'
import {fetchProductsByCategoryId} from '../store/actions'
import C from '../store/constants'

const mapStateToProps = (state,props) =>{
    return{
        products : state.products
    }
}
  
  const mapDispatchToProps = dispatch => {
    return{
        fetchProductsByCategoryId(categotyId){
        dispatch(fetchProductsByCategoryId(categotyId))
      }
    }
  }

class ProductsPage extends Component {
    componentDidMount(){
        //this.props.fetchProductById(0);
        let categotyId = this.props.match.params.categoryId
        this.props.fetchProductsByCategoryId(categotyId);

    }
    render(){

        let content = (this.props.products.length > 0 )?
        (
            this.props.products.map(product => {
                return(
                    <div  key={product.id}>
                        <img src={C.STORE_SETTINGS.IMAGES_URL + "products/"+product.images[0]} />
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductsPage);