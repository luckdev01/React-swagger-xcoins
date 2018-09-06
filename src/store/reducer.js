import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux';
import signup from '../pages/Auth/signup/reducer'
import login from '../pages/Auth/login/reducer'

const IndexReducer = combineReducers({
  router: routerReducer,
  signup,
  login,
  form,
})

export default IndexReducer;
