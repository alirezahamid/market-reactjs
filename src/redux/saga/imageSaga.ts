import { fetchImagesAPI } from './../../services/api/features/image.api';
import { call, put,takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import{getImagesSuccess} from '../features/imagesSlice'

export const getImages = createAction('images/getImages');

function* fetchImages({payload}: any):any {
  const data = yield call(()=> fetchImagesAPI(payload));
    const filteredData = yield data.json()
    console.log(payload)
    yield put(getImagesSuccess(filteredData));
}

export function* imageSaga() {
  yield takeEvery(getImages, fetchImages);
}