import { api } from "../../../config/apiConfig";
import { CALCELED_ORDER_FAILURE, CALCELED_ORDER_REQUEST, CALCELED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_PAGI_FAILURE, GET_ORDERS_PAGI_REQUEST, GET_ORDERS_PAGI_SUCCESS, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActioneType";

export const getOrders = ()=> {
    return async (dispatch)=>{
        dispatch({type:GET_ORDERS_REQUEST});
        try{
            const response = await api.get(`/api/admin/orders/`)
            console.log('response-getOrders()-AdminOrder', response);
            dispatch({type:GET_ORDERS_SUCCESS, payload:response.data});
        }catch(error){
            console.log(error);
            dispatch({type:GET_ORDERS_FAILURE, payload:error.message})
        }
    }
}
export const getOrdersPagi = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ORDERS_PAGI_REQUEST });
    const {
      sort,
      pageNumber,
      pageSize,
    } = reqData;
    try {
      const res = await api.get(
        `/api/admin/orders?sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      console.log("getOrdersPagi-data-AdminOrder.Action.js");
      console.log(res);
      dispatch({ type: GET_ORDERS_PAGI_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_PAGI_FAILURE, payload: error.message });
    }
  };

export const confirmOrder = (orderId)=> {
    console.log('confirmOrder', orderId);

    return async (dispatch)=>{
        dispatch({type:CONFIRMED_ORDER_REQUEST});
        try{
            const response = await api.put(`/api/admin/orders/${orderId}/confirmed`)
            console.log('response', response);
            const data = response.data;
            dispatch({type:CONFIRMED_ORDER_SUCCESS, payload:data});
        }catch(error){
            console.log(error);
            dispatch({type:CONFIRMED_ORDER_FAILURE, payload:error.message})
        }
    }
}

export const shipOrder = (orderId)=> {
    console.log('shipOrder:', orderId);

    return async (dispatch)=>{
        dispatch({type:SHIP_ORDER_REQUEST});
        try{
            const response = await api.put(`/api/admin/orders/${orderId}/ship`)
            console.log('response', response);
            const data = response.data;
            dispatch({type:SHIP_ORDER_SUCCESS, payload:data});
        }catch(error){
            console.log(error);
            dispatch({type:SHIP_ORDER_FAILURE, payload:error.message})
        }
    }
}

export const deleveredOrder = (orderId)=> {
    console.log('deleveredOrder- orderId:', orderId);

    return async (dispatch)=>{
        dispatch({type:DELETE_ORDER_REQUEST});
        try{
            const response = await api.put(`/api/admin/orders/${orderId}/deliver`)
            console.log('response', response);
            const data = response.data;
            dispatch({type:DELETE_ORDER_SUCCESS, payload: data });
        }catch(error){
            console.log(error);
            dispatch({type:DELETE_ORDER_FAILURE, payload: error.message})
        }
    }
}

export const deleteOrder = (orderId)=> {
    console.log('deleteOrder-orderId:', orderId);

    return async (dispatch)=>{
        dispatch({type:DELETE_ORDER_REQUEST});
        try{
            const response = await api.delete(`/api/admin/orders/${orderId}/delete`)
            console.log('response', response);
            // const data = response.data;
            dispatch({type:DELETE_ORDER_SUCCESS, payload: response });
        }catch(error){
            console.log(error);
            dispatch({type:DELETE_ORDER_FAILURE, payload: error.message})
        }
    }
}

export const cancleOrder = (orderId)=> {
    console.log('cancleOrder-orderId:', orderId);

    return async (dispatch)=>{
        dispatch({type:CALCELED_ORDER_REQUEST});
        try{
            const response = await api.delete(`/api/admin/orders/${orderId}/cancel`)
            console.log('response', response);
            // const data = response.data;
            dispatch({type:CALCELED_ORDER_SUCCESS, payload: response });
        }catch(error){
            console.log(error);
            dispatch({type:CALCELED_ORDER_FAILURE, payload: error.message})
        }
    }
}