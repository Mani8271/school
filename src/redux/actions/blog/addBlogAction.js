import * as types from "../actionTypes";
import { addBlogApi } from "../../apis/blog/addBlogApi";

// Action Creators
export const createBlogStart = (formData) => ({
  type: types.ADD_BLOG_START,
  payload: formData,
});

export const createBlogSuccess = (res) => ({
  type: types.ADD_BLOG_SUCCESS,
  payload: res,
});

export const createBlogError = (error) => ({
  type: types.ADD_BLOG_ERROR,
  payload: error,
});

// Thunk Action to initiate blog addition
export const AddBlogInitiate = (formData) => {
  return function (dispatch) {
    dispatch(createBlogStart(formData));

    addBlogApi(formData)
      .then((res) => {
        dispatch(createBlogSuccess(res));
        if (res.status === 200) {
          console.log("Blog added successfully:", res);
        }
      })
      .catch((error) => {
        dispatch(createBlogError(error.response?.data?.errors?.[0] || error.message));
      });
  };
};

export default {
  AddBlogInitiate,
};
