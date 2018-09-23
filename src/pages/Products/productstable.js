import React, { Component } from 'react';
import ProductRow from './productrow';
// import './MainApp.css';
// component that renders a single product
class ProductsTable extends Component {
    render() {
        var rows = this.props.products
            .map((product, i) => {
                return (
                    <ProductRow
                        key={i}
                        index={i+1}
                        product={product}
                        changeAppMode={this.props.changeAppMode} />
                );
            });
        
            return(
                <div>
                    {!rows.length
                    ? <div className='alert alert-danger'>No products found.</div>
                    :
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>StartDate</th>
                                <th>EndDate</th>
                                <th>Distance</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    }
                </div>
                
            );
    }
}
export default ProductsTable;