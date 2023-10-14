import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./ActionType";
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  deletedProduct: null
};
export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: {...state.products, content:[...state.products.content, action.payload]},
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: {...state.products, content:[...state.products?.content.map(p=>p.id===action.payload.id?action.payload:p)]},
      };
    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
        totalElements: action.payload.totalElements,
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
      };
    // case DELETE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     products: state.products?.filter(item=>item.id!==action.payload),
    //   };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case CREATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};
