import { GET_USERS_PAGI_FAILURE, GET_USERS_PAGI_REQUEST, GET_USERS_PAGI_SUCCESS } from "./ActioneType";

const initialState = {
  loading: false,
  user:null,
  users: [],
  error: "",
};

const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_PAGI_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_PAGI_SUCCESS:
      return {
        loading: false,
        users: action.payload.content,
        error: "",
        totalElements: action.payload.totalElements
      };
    case GET_USERS_PAGI_FAILURE:
      return {
        loading: true,
        users: [],
        error: action.payload,
        totalElements: 0
      };
    default:
      return state;
  }
};
export default adminUserReducer;
