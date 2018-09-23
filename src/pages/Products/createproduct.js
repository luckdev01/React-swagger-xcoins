import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import {Input} from 'reactstrap';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';
// import './MainApp.css';
// component that contains all the logic and other smaller components
// that form the Read Products view

class CreateProductComponent extends Component {
     // initialize values
		constructor(props) {
			super(props);
			this.state = {
				startdate: moment().startOf('day'),
				enddate: moment().endOf('day'),
				distance: '',
				comment: '',
				successCreation: null
			};
    }
    
    componentDidMount() {
      $('.page-header h1').text('Create product');
		}
    
    // on unmount, stop getting categories in case the request is still loading
    componentWillUnmount() {
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
						startdate: this.state.startdate.format('YYYY-MM-DD HH:mm'),
						enddate: this.state.enddate.format('YYYY-MM-DD HH:mm'),
						distance: this.state.distance,
						comment: this.state.comment
				};
		
				// submit form data to api
				const that = this;
				const saveUrl = `http://localhost:8080/api/product`;
				axios.post(saveUrl,{data: JSON.stringify(form_data)}) 
				.then(function (response){
					console.log(response);

						// api message
						that.setState({successCreation: response.data.state});
						// empty form
						if(response.data.state === 'SUCC'){
							that.setState(
								{
									startdate: moment().startOf('day'),
									enddate: moment().endOf('day'),
									distance: "",
									comment: ""
								}
							);
						}
				})
				.catch(function(error){
						console.log('can not save data',error);
				});
		
				e.preventDefault();
		}

		render() {
			/*
			- tell the user if a product was created
			- tell the user if unable to create product
			- button to go back to products list
			- form to create a product
			*/
			const shortcuts = {
				'Today': moment(),
				'Yesterday': moment().subtract(1, 'days'),
			};
			return (
				<div>
						{
								this.state.successCreation === "SUCC" ?
										<div className='alert alert-success'>
												Product was saved.
										</div>
								: null
						}
		
						{
								this.state.successCreation === "FAIL" ?
										<div className='alert alert-danger'>
												Unable to save product. Please try again.
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

export default CreateProductComponent;