import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux';
import login from '../pages/Auth/login/reducer'

const IndexReducer = combineReducers({
  router: routerReducer,
  login,
  form,
})

export default IndexReducer;
