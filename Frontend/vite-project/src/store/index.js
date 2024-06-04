import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import orderStatusReducer from './orderStatus'

const store = configureStore({
    reducer:{
        auth:authReducer,
        orderStatus: orderStatusReducer,
    },
})


export default store;