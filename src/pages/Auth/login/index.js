import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//react-router-dom
import './login.css';
import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import loginRequest from './actions'
import 'bootstrap/dist/css/bootstrap.css'

class Login extends Component {
  
  submit = (values) => {
    this.props.loginRequest(values)
  }

  render () {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      login: {
        requesting,
        messages,
        errors,
      },
    } = this.props
    
    if(localStorage.getItem('loggedin')){
      this.props.history.push("/app");
    }

    return (
      
      <div className="App">
          
        <section className="App-body justify-content-center">
        {/* !requesting && !!errors.length */}
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}

          <video autoPlay muted loop id="backVideo">
            <source src="background-video.mp4" type="video/mp4"/>
            Your browser does not support HTML5 video.
          </video> 
          <div className="login">
            <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
              <img src="images/Logo.png"/>
              <p className="text-center">Bitcoin for everyone</p>
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="Email"
                id="email"
                className="email"
              />
              <Field
                name="password"
                component="input"
                placeholder="Password"
                type="password"
                id="password"
                className="password"
              />
              <a href="">Forgot password?</a>
              <button action="submit" className="btn-block">LOGIN</button>
              <div >
                <p>Don't have account?</p>
                <div className="auth-messages">
                  {/* As in the signup, we're just using the message and error helpers */}

                  {requesting && <div className="loading"><img src="http://gifimage.net/wp-content/uploads/2017/09/ajax-loading-gif-transparent-background-8.gif"/></div>}
                  {!requesting &&  (
                    <Link to="/signup">Sign up</Link>
                  )}
                </div>
              </div>
            </form>
            
          </div>
        </section>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.login,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, { loginRequest })(Login)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'login',
})(connected)

// Export our well formed login component
export default formed
