
import { all } from 'redux-saga/effects';
import {imageSaga} from './saga/imageSaga'

export default function* rootSaga() {
  yield all([imageSaga()]);
}