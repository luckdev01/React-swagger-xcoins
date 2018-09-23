import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import {Input} from 'reactstrap';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';
// import './MainApp.css';
// component that renders a single product
class UpdateProductComponent extends Component {
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            startdate: moment().startOf('day'),
						enddate: moment().endOf('day'),
            distance: '',
            comment: '',
            successUpdate: null
        };
    }
    componentDidMount() {
 
        var productId = this.props.productId;
        const that = this;
        const readoneUrl = `http://localhost:8080/api/products/readone?id=${productId}`;
        axios.get(readoneUrl) 
        .then(function (response){
            const product = response.data;
            that.setState({
							id: product._id,
							startdate: moment(product.startdate), 
							enddate: moment(product.enddate), 
							distance: product.distance, 
							comment: product.comment
						});
        })
        .catch(function(error){
                console.log('can not load data',error);
        });

        $('.page-header h1').text('Update Product');
    }

    // handle name change
    handleStartdateChange = (moment) => {
        this.setState({startdate: moment});
    }

    // handle description change
    handleEnddateChange = (moment) => {
        this.setState({enddate: moment});
    }

    // handle price change
    handleDistanceChange = (e) => {
        this.setState({distance: e.target.value});
    }

    // handle price change
    handleCommentChange = (e) => {
        this.setState({comment: e.target.value});
    }

    // handle save button clicked
    onSave = (e) => {
        // data in the form
        var form_data={
            id: this.state.id,
            startdate: this.state.startdate.format('YYYY-MM-DD HH:mm'),
            enddate: this.state.enddate.format('YYYY-MM-DD HH:mm'),
            distance: this.state.distance,
            comment: this.state.comment
        };

        // submit form data to api
        const that = this;
        const updateUrl = `http://localhost:8080/api/product/${form_data.id}`;
        axios.put(updateUrl,{data:JSON.stringify(form_data)}) 
        .then(function (response){
            that.setState({successUpdate: response.data.state});
        })
        .catch(function(error){
                console.log('can not update data',error);
                that.setState({successUpdate: "FAIL"});
        });

        e.preventDefault();
    }

    render() {
			const shortcuts = {
				'Today': moment(),
				'Yesterday': moment().subtract(1, 'days'),
			};
			return (
				<div>
						{
                            this.state.successUpdate === "SUCC" ?
                                <div className='alert alert-success'>
                                    Jogging was updated.
                                </div>
                            : null
                        }
                        {
                            this.state.successUpdate === "NOUDATE" ?
                                <div className='alert alert-info'>
                                    Nothing was updated.
                                </div>
                            : null
                        }
                        {
                            this.state.successUpdate === "FAIL" ?
                                <div className='alert alert-danger'>
                                    Unable to update Jogging. Please try again.
                                </div>
                            : null
                        }
                    
		
						<a href='#'
								onClick={() => this.props.changeAppMode('read')}
								className='btn btn-primary margin-bottom-1em'> Read Products
						</a>
		
						<form onSubmit={this.onSave}>
								<table className='table table-bordered table-hover'>
								<tbody>
										<tr>
												<td>StartdDate</td>
												<td>
														<DatetimePickerTrigger
														shortcuts={shortcuts} 
														moment={this.state.startdate}
														onChange={this.handleStartdateChange}>
														<Input type="text" value={this.state.startdate.format('YYYY-MM-DD HH:mm')} readOnly />
														</DatetimePickerTrigger>
												</td>
										</tr>
		
										<tr>
												<td>EndDate</td>
												<td>
														<DatetimePickerTrigger
														shortcuts={shortcuts} 
														moment={this.state.enddate}
														onChange={this.handleEnddateChange}>
														<Input type="text" value={this.state.enddate.format('YYYY-MM-DD HH:mm')} readOnly />
														</DatetimePickerTrigger>
												</td>
										</tr>
		
										<tr>
												<td>Distance(km)</td>
												<td>
														<input
														type='number'
														className='form-control'
														value={this.state.distance}
														required
														onChange={this.handleDistanceChange}/>
												</td>
										</tr>
		
										<tr>
												<td>Comment</td>
												<td>
														<input
														type='text'
														className='form-control'
														value={this.state.comment}
														onChange={this.handleCommentChange}/>
												</td>
										</tr>
		
										<tr>
												<td></td>
												<td>
														<button
														className='btn btn-primary'
														onClick={this.onSave}>Save</button>
												</td>
										</tr>
										</tbody>
								</table>
						</form>
				</div>
				);
    }
}
export default UpdateProductComponent;