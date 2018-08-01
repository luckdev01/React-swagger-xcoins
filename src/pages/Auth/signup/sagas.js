import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants'

// The url derived from our .env file
// const signupUrl = `${process.env.REACT_APP_API_URL}/api/Clients`
const signupUrl = `http://localhost:8080/api/user/`;

function signupApi (email, password) {
  // call to the "fetch".  this is a "native" function for browsers
  // that's conveniently polyfilled in create-react-app if not available
  //console.log(JSON.stringify({ email, password }); return;
  return axios.post(signupUrl,{'email': email,'password':password},{
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    });
}

// This will be run when the SIGNUP_REQUESTING
// Action is found by the watcher
function* signupFlow (action) {
  try {
    const { email, password } = action

    // pulls "calls" to our signupApi with our email and password
    // from our dispatched signup action, and will PAUSE
    // here until the API async function, is complete!
    const response = yield call(signupApi, email, password)
    // when the above api call has completed it will "put",
    // or dispatch, an action of type SIGNUP_SUCCESS with
    // the successful response.
    if(response.data!=="duplicate") yield put({ type: SIGNUP_SUCCESS, response: response.data });
    else yield put({ type: SIGNUP_ERROR, error:"Account is already exist." });

  } catch (error) {
    // if the api call fails, it will "put" the SIGNUP_ERROR
    // into the dispatch along with the error.
    yield put({ type: SIGNUP_ERROR, error })
  }
}

// Watches for the SIGNUP_REQUESTING action type
// When it gets it, it will call signupFlow()
// WITH the action we dispatched
function* signupWatcher () {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
