import React, { Component } from 'react';
import {date2str} from './func';
// import './MainApp.css';
// component that renders a single product
class ProductRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.index }</td>
                <td>{date2str(this.props.product.startdate)}</td>
                <td>{date2str(this.props.product.enddate)}</td>
                <td>{parseFloat(this.props.product.distance).toFixed(2)}km</td>
                <td>{this.props.product.comment}</td>
                <td>
                    <a href='#'
                        onClick={() => this.props.changeAppMode('readOne', this.props.product._id)}
                        className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                        onClick={() => this.props.changeAppMode('update', this.props.product._id)}
                        className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.product._id)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
            );
    }
}
export default ProductRow;