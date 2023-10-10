import { api } from "../../../config/apiConfig";
import { ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS, GET_USERS_PAGI_FAILURE, GET_USERS_PAGI_REQUEST, GET_USERS_PAGI_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActioneType";

export const getUsersPagi = (reqData) => async (dispatch) => {
    dispatch({ type: GET_USERS_PAGI_REQUEST });
    const {
      sort,
      pageNumber,
      pageSize,
    } = reqData;
    try {
      const res = await api.get(
        `/api/users/all?sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      console.log("getUsersPagi-AdminUser.Action.js");
      console.log(res);
      dispatch({ type: GET_USERS_PAGI_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_USERS_PAGI_FAILURE, payload: error.message });
    }
  };

export const updateUser = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/user`, reqData
      );
      console.log("updateUser-AdminUser.Action.js");
      console.log(res);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
  };

export const addUser = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/user/signup`, reqData
      );
      console.log("addUser-AdminUser.Action.js");
      console.log(res);
      dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_USER_FAILURE, payload: error.message });
    }
  };

// export const deleteOrder = (orderId)=> {
//     console.log('deleteOrder-orderId:', orderId);

//     return async (dispatch)=>{
//         dispatch({type:DELETE_ORDER_REQUEST});
//         try{
//             const response = await api.delete(`/api/admin/orders/${orderId}/delete`)
//             console.log('response', response);
//             // const data = response.data;
//             dispatch({type:DELETE_ORDER_SUCCESS, payload: response });
//         }catch(error){
//             console.log(error);
//             dispatch({type:DELETE_ORDER_FAILURE, payload: error.message})
//         }
//     }
// }