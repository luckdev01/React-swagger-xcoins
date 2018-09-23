import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';

class Profile extends Component {
	constructor(props) {
		super(props);
 
		this.state = {
			imageURL: '',
		};
 
		this.handleUploadImage = this.handleUploadImage.bind(this);
	}
 
	handleUploadImage = (ev) => {
		ev.preventDefault();
		var data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', this.fileName.value);
 
		axios.post('http://localhost:8080/api/upload', data, {
			headers: { "X-Requested-With": "XMLHttpRequest" },
		}).then((response) => {
			console.log('rrr',response.data.file)
			this.setState({ imageURL: 'http://localhost:8080'+response.data.file });
		});
	}
  render() {
		let avata = "";
    return (
      <div className="Profile">
        <header className="Profile-header">
          <img src={avata} className="Profile-avata" alt="avata" />
          <h1 className="Profile-title">Welcome</h1>
        </header>
        <p className="Profile-intro">
          Please update profile.
        </p>
				<form onSubmit={this.handleUploadImage}>
					<div>
						<input ref={(ref) => { this.uploadInput = ref; }} type="file" />
					</div>
					<div>
						<input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
					</div>
					<br />
					<div>
						<button>Upload</button>
					</div>
					<img src={this.state.imageURL} alt="img" />
				</form>
      </div>
    );
  }
}

export default Profile;
