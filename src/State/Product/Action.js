import { api } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
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

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  if(reqData.minPrice==null || reqData.minPrice==undefined) reqData.minPrice='';
  if(reqData.maxPrice==null || reqData.maxPrice==undefined) reqData.maxPrice='';
  if(reqData.minDiscount==null || reqData.minDiscount==undefined) reqData.minDiscount='';
  if(reqData.colors==null || reqData.colors==undefined) reqData.colors='';
  if(reqData.sizes==null || reqData.sizes==undefined) reqData.sizes='';
  if(reqData.sort==null || reqData.sort==undefined) reqData.sort='price_high';
  if(reqData.stock==null || reqData.stock==undefined) reqData.stock='';
  if(reqData.category==null || reqData.category==undefined) reqData.category='';
  if(reqData.pageNumber==null || reqData.pageNumber==undefined) reqData.pageNumber=0;
  if(reqData.pageSize==null || reqData.pageSize==undefined) reqData.pageSize=1;
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  // if(minPrice==null || minPrice==undefined) minPrice='';
  // if(maxPrice==null || maxPrice==undefined) maxPrice='';
  // if(minDiscount==null || minDiscount==undefined) minDiscount='';
  // if(colors==null || colors==undefined) colors='';
  // if(sizes==null || sizes==undefined) sizes='';
  // if(sort==null || sort==undefined) sort='price_high';
  // if(stock==null || stock==undefined) stock='';
  // if(category==null || category==undefined) category='';
  // if(pageNumber==null || pageNumber==undefined) pageNumber=0;
  // if(pageSize==null || pageSize==undefined) pageSize=1;
  try {
    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log("findProducts-data-Product.Action.js");
    console.log(data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("findProductsById-data-Product.Action.js");
    console.log(data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const { data } = await api.post(`/api/admin/products`, product);
    console.log("createProduct-Product.Action.js");
    console.log(data);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const updateProduct = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  const {req, productId}=reqData;
  try {
    const { data } = await api.put(`/api/admin/products/${productId}/update`, req);
    console.log("updateProduct-Product.Action.js");
    console.log(data);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/products/${productId}/delete`);
    console.log("deleteProduct-Product.Action.js");
    console.log(data);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
