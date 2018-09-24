import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
 
class GLogin extends Component{
  
  onFailure = (response) => {
    console.log(response);
  }
  googleResponse = (response) => {
    // var id_token = googleUser.getAuthResponse().id_token;
    // var googleId = googleUser.getId();
    var history = this.props.history;
    console.log(response.accessToken, response.googleId);
    //anything else you want to do(save to localStorage)...
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:8080/api/auth/google', options).then(response => {
            const token = response.headers.get('x-auth-token');
            console.log('token---',token);
            response.json().then(user => {
                if (token) {
                  console.log('user---',user);
                  history.push('/app');
                }
            });
        })
  }
 
  render () {
    return (
      <div>
        <GoogleLogin
                        clientId="421348630681-pmp5kogfu007ojbn4mo4qmq95if7l08a.apps.googleusercontent.com"
                        buttonText="Google Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
      </div>
    );
  }
 
}

export default (GLogin);