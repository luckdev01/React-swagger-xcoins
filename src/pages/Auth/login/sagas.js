import { take,takeEvery, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import axios from 'axios';
import { push } from 'react-router-redux';
import { effects } from 'redux-saga';
import { history } from './../../../store';

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

// const loginUrl = `http://13.56.148.150:5000/api/User/Login/`;
const loginUrl = `http://localhost:8080/api/checkuser`;

function loginApi (email, password) {
  // ,{
  //   validateStatus: function (status) {
  //     return status < 500; // Reject only if the status code is greater than or equal to 500
  //   }
  // }
  return axios.post(loginUrl,{'email': email,'password':password},{
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    });
}

function* logout () {
  // remove our token
  localStorage.removeItem('token')
  yield put(push('/login'));

}

function* loginFlow (email, password) {
  let token
  try {
    // try to call to our loginApi() function.  
    token = yield call(loginApi, email, password)

    // .. also inform redux that our login was successful
    if(token.data!=="incorrect") {
      yield put({ type: LOGIN_SUCCESS});
      localStorage.setItem('loggedin', email);
      yield put(push('/app'));
    }
    else {
      yield put({ type: LOGIN_ERROR, error:"Email or password is incorrect." });
    }

    // set a stringified version of our token to localstorage on our domain
    localStorage.setItem('token', JSON.stringify(token))

  } catch (error) {
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    if (yield cancelled()) {
      yield put(push('/login'));
    }
  }

  return token
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher () {
  
  while (true) {
   
    const { email, password } = yield take(LOGIN_REQUESTING)
    
    const task = yield fork(loginFlow, email, password)

  }
}

export default loginWatcher
