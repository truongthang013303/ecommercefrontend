import {
  FILTER_CATEGORIES_FAILURE,
  FILTER_CATEGORIES_REQUEST,
  FILTER_CATEGORIES_SUCCESS,
  FIND_CATEGORIES_FAILURE,
  FIND_CATEGORIES_PAGI_FAILURE,
  FIND_CATEGORIES_PAGI_REQUEST,
  FIND_CATEGORIES_PAGI_SUCCESS,
  FIND_CATEGORIES_REQUEST,
  FIND_CATEGORIES_SUCCESS,
  FIND_CATEGORY_BY_NAME_AND_PARENT_FAILURE,
  FIND_CATEGORY_BY_NAME_AND_PARENT_REQUEST,
  FIND_CATEGORY_BY_NAME_AND_PARENT_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
} from "./ActionType";

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};
export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CATEGORIES_REQUEST:
    case FIND_CATEGORY_BY_NAME_AND_PARENT_REQUEST:
    case FIND_CATEGORIES_PAGI_REQUEST:
    case FILTER_CATEGORIES_REQUEST:
    case GET_ALL_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };

    case FIND_CATEGORY_BY_NAME_AND_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: action.payload,
      };

    case FIND_CATEGORIES_FAILURE:
    case FIND_CATEGORY_BY_NAME_AND_PARENT_FAILURE:
    case FIND_CATEGORIES_PAGI_FAILURE:
    case FILTER_CATEGORIES_FAILURE:
    case GET_ALL_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FIND_CATEGORIES_PAGI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload.content,
        totalElements: action.payload.totalElements
      };
    case FILTER_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload.content,
        totalElements: action.payload.totalElements
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };
    default:
      return state;
  }
};
