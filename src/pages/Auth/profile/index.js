import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';

class Profile extends Component {
	constructor(props) {
		super(props);
 
		this.state = {
			imageURL: '',
			previewURL: ''
		};
 
		this.handleUploadImage = this.handleUploadImage.bind(this);
	}
	fileChangedHandler = (event) => {
		this.setState({previewURL: URL.createObjectURL(event.target.files[0])});
	}
	
	handleUploadImage = (ev) => {
		ev.preventDefault();
		var data = new FormData();
		data.append('avatar', this.uploadInput.files[0]);
 
		axios.post('http://localhost:8080/api/upload', data, {
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"x-auth-token": localStorage.getItem('token')
			},
		}).then((response) => {
			this.setState({ imageURL: 'http://localhost:8080'+response.data.file });
		});
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
				});
		})
		.catch(function(error){
						console.log('can not load data',error);
		});

	}

  render() {
		let avata = "";
    return (
      <div className="Profile">
        <header className="Profile-header">
          <img src={this.state.imageURL} className="Profile-avata" alt="avata" />
          <h1 className="Profile-title">Welcome</h1>
        </header>
        <p className="Profile-intro">
          Please update profile.
        </p>
				<form onSubmit={this.handleUploadImage} encType={"multipart/form-data"}>
					<div>
						<input ref={(ref) => { this.uploadInput = ref; }} type="file" onChange={this.fileChangedHandler}/>
					</div>
					
					<img src={this.state.previewURL} alt="img" />
					<div>
						<button>Upload</button>
					</div>
				</form>
      </div>
    );
  }
}

export default Profile;
