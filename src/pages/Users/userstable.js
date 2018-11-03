import React, { Component } from 'react';
import UserRow from './userrow';
// import './MainApp.css';
// component that renders a single user
class UsersTable extends Component {
    render() {
        var rows = this.props.users
            .map((user, i) => {
                return (
                    <UserRow
                        key={i}
                        index={i+1}
                        user={user}
                        changeAppMode={this.props.changeAppMode} />
                );
            });
        
            return(
                <div>
                    {!rows.length
                    ? <div className='alert alert-danger'>No Users found.</div>
                    :
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Avatar</th>
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
export default UsersTable;