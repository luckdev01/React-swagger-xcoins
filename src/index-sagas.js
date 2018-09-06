import SignupSaga from './pages/Auth/signup/sagas'
import LoginSaga from './pages/Auth/login/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
  ]
}
