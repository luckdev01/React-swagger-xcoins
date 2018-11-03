import React, { Component } from 'react';
// import './MainApp.css';
// component that renders a single user
class UserRow extends Component {

    render() {
        var imgurl = this.props.user.avatarurl;
        if(imgurl) {
            var result = imgurl.match("/uploads/");
            if(result) imgurl = "http://localhost:8080" + imgurl;
        }
        
        return (
            <tr>
                <td>{this.props.index }</td>
                <td>{this.props.user.fullname}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.role}</td>
                <td><img width="40px" height="40px" src={imgurl}></img></td>
                <td>
                    <a href='#'
                        onClick={() => this.props.changeAppMode('readOne', this.props.user._id)}
                        className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                        onClick={() => this.props.changeAppMode('update', this.props.user._id)}
                        className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.user._id)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
            );
    }
}
export default UserRow;