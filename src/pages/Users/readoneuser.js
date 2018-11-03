
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
// import './MainApp.css';
// component that contains all the logic and other smaller components
// that form the Read Users view

class ReadOneUserComponent extends Component {
     // initialize values
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            fullname: '',
            email: '',
            role: '',
            avatarurl: ''
        };
    }
 
    // on mount, fetch all users and stored them as this component's state
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
                avatarurl: user.avatarurl
            });
        })
        .catch(function(error){
                console.log('can not load data',error);
        });

        $('.page-header h1').text('Read User');
    }
 
    // on unmount, kill user fetching in case the request is still pending
    componentWillUnmount() {
    }
 
    // render component on the page
    render() {
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Users
                </a>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Full Name</td>
                            <td>{this.state.fullname}</td>
                        </tr>
     
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
     
                        <tr>
                            <td>Role</td>
                            <td>{this.state.role}</td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
};

export default ReadOneUserComponent;