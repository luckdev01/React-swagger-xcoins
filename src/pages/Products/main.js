import React, { Component } from 'react';
import ReadProductsComponent from './readproducts';
import ReadOneProductComponent from './readoneproduct';
import CreateProductComponent from './createproduct';
import UpdateProductComponent from './updateproduct';
import DeleteProductComponent from './deleteproduct';
// import './MainApp.css';
class ProductsMain extends Component {

    // initial mode is 'read' mode
		constructor(props) {
			super(props);
			this.state = {
				currentMode: 'read',
				productId: null
			};
		}
	

    // used when use clicks something that changes the current mode
    changeAppMode = (newMode, productId) => {
        this.setState({currentMode: newMode});
            if(productId !== undefined){
            this.setState({productId: productId}); 
        }
    }
  
		render() {
			var modeComponent =
					<ReadProductsComponent
					changeAppMode={this.changeAppMode} />;
	
					switch(this.state.currentMode){
							case 'read':
									break;
							case 'readOne':
									modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
									break;
							case 'create':
									modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
									break;
							case 'update':
									modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
									break;
							case 'delete':
									modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
									break;
							default:
									break;
					}
					return modeComponent;
		}
}

export default ProductsMain;