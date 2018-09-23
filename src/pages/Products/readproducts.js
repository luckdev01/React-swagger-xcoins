import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import TopActionsComponent from './topactions';
import ProductsTable from './productstable';
import SearchFormComponent from './searchform';

/// component for the whole products table

class ReadProductsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    onFilter = (startdate,enddate) => {
        const that = this;
        const productsUrl = `http://localhost:8080/api/products/${startdate}/${enddate}`;
        axios.get(productsUrl)
        .then(function (response){
            that.setState({products: response.data});
        })
        .catch(function(error){
            console.log('can not load data',error);
        });
    }
    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        const that = this;
        const productsUrl = `http://localhost:8080/api/products`;
        axios.get(productsUrl)
        .then(function (response){
            that.setState({products :response.data});
        })
        .catch(function(error){
            console.log('can not load data',error);
        });
    }
 
    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
    }
 
    // render component on the page
    render() {
        // list of products
        var filteredProducts = this.state.products;
        $('.page-header h1').text('Read Products');
 
        return (
            <div className='overflow-hidden'>
                <SearchFormComponent onFilter={this.onFilter} />
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
}

export default ReadProductsComponent;