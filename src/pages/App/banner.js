import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Banner extends Component {

    constructor(props) {
		super(props);
		this.state = {
            imageURL: '',
            fullname: ''
		};
	}

    componentDidMount() {

		const that = this;
		const getuserUrl = `http://localhost:8080/api/users/readonebytoken`;
		axios.get(getuserUrl, {
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"x-auth-token": localStorage.getItem('token')
			},
		}).then((response) => {
                const user = response.data;
				that.setState({
                    imageURL: 'http://localhost:8080'+user.avatarurl, 
                    fullname: user.fullname
				});
		})
		.catch(function(error){
						console.log('can not load data',error);
		});

	}
  
    render() {
        return (
            <header className="Banner-header">
            <img src={this.state.imageURL} className="Banner-avatar" alt="avata" />
            <h1 className="Banner-title">{this.state.fullname}</h1>
            </header>
        ); 
    }
}

export default Banner;
