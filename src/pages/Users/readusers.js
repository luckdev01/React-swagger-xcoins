import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import TopActionsComponent from './topactions';
import UsersTable from './userstable';

/// component for the whole users table

class ReadUsersComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    // on mount, fetch all users and stored them as this component's state
    componentDidMount() {
        const that = this;
        const usersUrl = `http://localhost:8080/api/users`;
        axios.get(usersUrl)
        .then(function (response){
            that.setState({users: response.data});
        })
        .catch(function(error){
            console.log('can not load data',error);
        });
    }
 
    // on unmount, kill user fetching in case the request is still pending
    componentWillUnmount() {
    }
 
    // render component on the page
    render() {
        // list of users
        var filteredUsers = this.state.users;
        $('.page-header h1').text('Read Users');
 
        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
                <UsersTable
                    users={filteredUsers}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
}

export default ReadUsersComponent;