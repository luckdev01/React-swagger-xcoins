import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  messages: [],
  errors: [],
}

const reducer = function loginReducer (state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      }
    case LOGIN_SUCCESS:
      return {
        requesting: false,
        messages: [],
        errors: [],
      }
    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
      }

    default:
      return state
  }
}

export default reducer
