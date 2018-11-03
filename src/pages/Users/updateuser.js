import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Input} from 'reactstrap';

// import './MainApp.css';
// component that renders a single user
class UpdateUserComponent extends Component {
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            fullname: '',
            email: '',
            role: '',
            successUpdate: null
        };
    }
    componentDidMount() {
 
        var userId = this.props.userId;
        const that = this;
        const readoneUrl = `http://localhost:8080/api/users/readone?id=${userId}`;
        axios.get(readoneUrl) 
        .then(function (response){
            const user = response.data;
            that.setState({
							id: user._id,
							fullname: user.fullname, 
							email: user.email, 
							role: user.role
						});
        })
        .catch(function(error){
                console.log('can not load data',error);
        });

        $('.page-header h1').text('Update User');
    }

    // handle fullname change
    handleFullnameChange = (e) => {
        this.setState({fullname: e.target.value});
    }

    // handle email change
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    // handle role change
    handleRoleChange = (e) => {
        this.setState({role: e.target.value});
    }

    // handle save button clicked
    onSave = (e) => {
    
        // data in the form
        var form_data={
            id: this.state.id,
            fullname: this.state.fullname,
            email: this.state.email,
            role: this.state.role
        };

        // submit form data to api
        const that = this;
        const updateUrl = `http://localhost:8080/api/user/${form_data.id}`;
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
								className='btn btn-primary margin-bottom-1em'> Read Users
						</a>
		
						<form onSubmit={this.onSave}>
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
											<td>Role</td>
											<td>
												<input
												type='text'
												className='form-control'
												value={this.state.role}
												required
												onChange={this.handleRoleChange}/>
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
export default UpdateUserComponent;