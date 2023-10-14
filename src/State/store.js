import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { customerProductReducer } from './Product/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import adminOrderReducer from './Admin/Order/Reducer';
import { categoryReducer } from './Category/Reducer';
import adminUserReducer from './Admin/User/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    product: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
    category: categoryReducer,
    adminUser: adminUserReducer
})
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))
