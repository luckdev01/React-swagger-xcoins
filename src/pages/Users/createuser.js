import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import {USERROLES,DEFAULTROLE} from './constants';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-dropdown/style.css';
// import './MainApp.css';
// component that contains all the logic and other smaller components
// that form the Read Users view

class CreateUserComponent extends Component {
     // initialize values
		constructor(props) {
			super(props);
			this.state = {
				fullname: '',
				email: '',
				password: '',
				passwordconfirm: '',
				role: DEFAULTROLE.value,
				avatarurl: '',
				successCreation: null
			};
    }
    
    componentDidMount() {
      $('.page-header h1').text('Create user');
		}
    
    // on unmount, stop getting categories in case the request is still loading
    componentWillUnmount() {
		}

		// handle fullname change
		handleFullnameChange = (e) => {
			this.setState({fullname: e.target.value});
		}

		// handle email change
		handleEmailChange = (e) => {
			this.setState({email: e.target.value});
		}

		// handle password change
		handlePasswordChange = (e) => {
			this.setState({password: e.target.value});
		}

		// handle passwordconfirm change
		handlePasswordConfirmChange = (e) => {
			this.setState({passwordconfirm: e.target.value});
		}

		// handle role change
		handleRoleChange = (r) => {
			this.setState({role: r.value});
		}

		// handle save button clicked
		onSave = (e) => {
				if(this.state.password != this.state.passwordconfirm) {
					alert('Password does not match');
					return;
				}
		
				// data in the form
				var form_data={
						fullname: this.state.fullname,
						email: this.state.email,
						password: this.state.password,
						role: this.state.role
				};
		
				// submit form data to api
				const that = this;
				const saveUrl = `http://localhost:8080/api/user`;
				axios.post(saveUrl,{data: JSON.stringify(form_data)}) 
				.then(function (response){
					console.log(response);

						// api message
						that.setState({successCreation: response.data.state});
						// empty form
						if(response.data.state === 'SUCC'){
							that.setState(
								{
									fullname: '',
									email: '',
									password: '',
									passwordconfirm: '',
									role: '',
									avatarurl: ''
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
			return (
				<div>
						{
								this.state.successCreation === "SUCC" ?
										<div className='alert alert-success'>
												User was saved.
										</div>
								: null
						}
		
						{
								this.state.successCreation === "FAIL" ?
										<div className='alert alert-danger'>
												Unable to save user. Please try again.
										</div>
								: null
						}
		
						<a href='#'
								onClick={() => this.props.changeAppMode('read')}
								className='btn btn-primary margin-bottom-1em'> Read Users
						</a>
		
						<form >
							<table className='table table-bordered table-hover'>
								<tbody>
									<tr>
											<td>Full Name</td>
											<td>
												<input
												type='text'
												className='form-control'
												value={this.state.fullname}
												required
												onChange={this.handleFullnameChange}/>
											</td>
									</tr>
	
									<tr>
											<td>Email</td>
											<td>
												<input
												type='text'
												className='form-control'
												value={this.state.email}
												required
												onChange={this.handleEmailChange}/>
											</td>
									</tr>
									<tr>
											<td>Password</td>
											<td>
												<input
												type='text'
												className='form-control'
												value={this.state.password}
												required
												onChange={this.handlePasswordChange}/>
											</td>
									</tr>
									<tr>
											<td>Confirm Password</td>
											<td>
												<input
												type='text'
												className='form-control'
												value={this.state.passwordconfirm}
												required
												onChange={this.handlePasswordConfirmChange}/>
											</td>
									</tr>
	
									<tr>
											<td>Role</td>
											<td>
												<Dropdown options={USERROLES} onChange={this.handleRoleChange} value={USERROLES[this.state.role]} placeholder="Select an option" />
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

export default CreateUserComponent;