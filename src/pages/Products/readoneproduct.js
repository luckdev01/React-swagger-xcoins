
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {date2str, diffhours} from './func';
// import './MainApp.css';
// component that contains all the logic and other smaller components
// that form the Read Products view

class ReadOneProductComponent extends Component {
     // initialize values
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            startdate: '',
            enddate: '',
            distance: '',
            comment: '',
        };
    }
 
    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
 
        var productId = this.props.productId;
        const that = this;
        const readoneUrl = `http://localhost:8080/api/products/readone?id=${productId}`;
        axios.get(readoneUrl) 
        .then(function (response){
            const product = response.data;
            that.setState({
                id: product._id, 
                startdate: product.startdate,
                enddate: product.enddate,
                distance: product.distance,
                comment: product.comment
            });
        })
        .catch(function(error){
                console.log('can not load data',error);
        });

        $('.page-header h1').text('Read Product');
    }
 
    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
    }
 
    // render component on the page
    render() {
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>StartDate</td>
                            <td>{date2str(this.state.startdate)}</td>
                        </tr>
     
                        <tr>
                            <td>EndDate</td>
                            <td>{date2str(this.state.enddate)}</td>
                        </tr>
     
                        <tr>
                            <td>Distance(km)</td>
                            <td>{parseFloat(this.state.distance).toFixed(2)}km</td>
                        </tr>

                        <tr>
                            <td>AVG Velocity(km)</td>
                            <td>{parseFloat(this.state.distance/diffhours(this.state.startdate,this.state.enddate)).toFixed(2)} km/h</td>
                        </tr>
     
                        <tr>
                            <td>Comment</td>
                            <td>{this.state.comment}</td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
};

export default ReadOneProductComponent;