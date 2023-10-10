import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_USERS_PAGI_FAILURE,
  GET_USERS_PAGI_REQUEST,
  GET_USERS_PAGI_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./ActioneType";

const initialState = {
  loading: false,
  user: null,
  users: [],
  error: "",
};

const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_PAGI_REQUEST:
    case UPDATE_USER_REQUEST:
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_PAGI_SUCCESS:
      return {
        loading: false,
        users: action.payload.content,
        error: "",
        totalElements: action.payload.totalElements,
        pageNumber: action.payload.pageable.pageNumber,
        pageSize: action.payload.pageable.pageSize,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users?.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: "",
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: "",
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USERS_PAGI_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
        totalElements: 0,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default adminUserReducer;
