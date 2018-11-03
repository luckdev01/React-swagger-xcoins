import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
// import './MainApp.css';
// component that renders a single user
class DeleteUserComponent extends Component {
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            successUpdate: null
        };
    }
    componentDidMount() {
        $('.page-header h1').text('Delete User');
    }

    // handle save button clicked
    onDelete = (e) => {
        // submit form data to api
        const that = this;
        const deleteUrl = `http://localhost:8080/api/user/${this.props.userId}`;
        axios.delete(deleteUrl) 
        .then(function (response){
            that.props.changeAppMode('read');
        })
        .catch(function(error){
                console.log('can not update data',error);
        });

        e.preventDefault();
    }

    render() {
		return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                    className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
}
export default DeleteUserComponent;