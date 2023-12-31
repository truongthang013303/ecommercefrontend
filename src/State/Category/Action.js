import { api } from "../../config/apiConfig";
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

export const findCategories = () => async (dispatch) => {
  dispatch({ type: FIND_CATEGORIES_REQUEST });
  try {
    const response = await api.get(`/api/categories/all`);
    console.log("findCategories-Category.Action.js");

    const levelOne = response.data.filter((c) => c.level === 1);
    const levelTwo = response.data.filter((c) => c.level === 2);
    let levelThree = response.data.filter((c) => c.level === 3);

    for (let val of levelTwo) {
      val.items = [];
    }
    for (let val of levelTwo) {
      for (let va of levelThree) {
        if (va.parentCategory.id === val.id) {
          val.items.push(va);
          levelThree = levelThree.filter((c) => c.id != va.id);
        }
      }
    }

    for (let val of levelOne) {
      val.sections = [];
    }

    for (let i of levelOne) {
      let arr = levelTwo.filter((c) => c.parentCategory.id === i.id);
      for (let l of arr) {
        i.sections.push(l);
      }
    }
    console.log(levelOne);
    //response.data = response.data.filter(c=>c.level===1);

    // let data = response.data;
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].level === 1) {
    //     data[i] = { ...data[i], sections: [] };
    //     for (let j = i + 1; j < data.length; j++) {
    //       if (data[j].parentCategory.id === data[i].id) {
    //         data[i].sections.push(data[j]);
    //       }
    //     }
    //   }
    // }
    // console.log("data fixed");
    // console.log(data);

    // dispatch({ type: FIND_CATEGORIES_SUCCESS, payload: response.data });
    dispatch({ type: FIND_CATEGORIES_SUCCESS, payload: levelOne });
  } catch (error) {
    dispatch({ type: FIND_CATEGORIES_FAILURE, payload: error.message });
  }
};

export const getAllCategories = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
  try {
    const response = await api.get(`/api/categories/all`);
    console.log("getAllCategories-Category.Action.js");
    console.log(response);
    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_CATEGORIES_FAILURE, payload: error.message });
  }
};

export const findCategoriesPagi = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_CATEGORIES_PAGI_REQUEST });
  const { sort, pageNumber, pageSize } = reqData;
  try {
    const response = await api.get(`/api/categories?sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    console.log("findCategoriesPagi-Category.Action.js");
    console.log(response);
    dispatch({ type: FIND_CATEGORIES_PAGI_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FIND_CATEGORIES_PAGI_FAILURE, payload: error.message });
  }
};

export const filterCategories = (reqData) => async (dispatch) => {
  dispatch({ type: FILTER_CATEGORIES_REQUEST });
  const { sort, pageNumber, pageSize, level } = reqData;
  try {
    const response = await api.get(`/api/categories?sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}&level=${level}`);
    console.log("filterCategories-Category.Action.js");
    console.log(response);
    dispatch({ type: FILTER_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FILTER_CATEGORIES_FAILURE, payload: error.message });
  }
};

export const findByNameAndParent = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_CATEGORY_BY_NAME_AND_PARENT_REQUEST });
  try {
    const { name, parentCategoryName } = reqData;
    const response = await api.get(
      `/api/categories/${parentCategoryName}/${name}`
    );
    console.log("findByNameAndParent-Category.Action.js");
    console.log(response);
    dispatch({
      type: FIND_CATEGORY_BY_NAME_AND_PARENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FIND_CATEGORY_BY_NAME_AND_PARENT_FAILURE,
      payload: error.message,
    });
  }
};
