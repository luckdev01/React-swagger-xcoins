import LoginSaga from './pages/Auth/login/sagas'

export default function* IndexSaga () {
  yield [
    LoginSaga(),
  ]
}
