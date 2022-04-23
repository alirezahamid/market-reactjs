import { configureStore } from "@reduxjs/toolkit"
import CartReducer from "./features/cartSlice"
import ImagesReducer from './features/imagesSlice'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();


export default configureStore({
  reducer: {
    cart: CartReducer,
    images: ImagesReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga);


