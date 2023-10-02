import { FIND_CATEGORIES_FAILURE, FIND_CATEGORIES_REQUEST, FIND_CATEGORIES_SUCCESS, FIND_CATEGORY_BY_NAME_AND_PARENT_FAILURE, FIND_CATEGORY_BY_NAME_AND_PARENT_REQUEST, FIND_CATEGORY_BY_NAME_AND_PARENT_SUCCESS } from "./ActionType";

const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null
  };
  export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case FIND_CATEGORIES_REQUEST:
      case FIND_CATEGORY_BY_NAME_AND_PARENT_REQUEST:
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
        return { ...state, loading: false, error: action.payload };
        
      default:
        return state;
    }
  };