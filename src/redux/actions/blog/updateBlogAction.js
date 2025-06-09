import { updateBlogApi } from "../../apis/blog/updateBlogApi";
import * as types from "../actionTypes";

// Action Creators
export const updateBlogStart = (formData) => ({
  type: types.UPDATE_BLOG_START,
  payload: formData,
});

export const updateBlogSuccess = (res) => ({
  type: types.UPDATE_BLOG_SUCCESS,
  payload: res,
});

export const updateBlogError = (error) => ({
  type: types.UPDATE_BLOG_ERROR,
  payload: error,
});

// Thunk Action to initiate blog update
export const UpdateBlogInitiate = (formData, callback) => {
  return function (dispatch) {
    dispatch(updateBlogStart(formData));
    updateBlogApi(formData)
      .then((res) => {
        dispatch(updateBlogSuccess(res));
        if (res.status === 200) {
          callback(true);
          console.log("✅ Blog update response:", res);
        }
      })
      .catch((error) => {
        dispatch(updateBlogError(error.message));
      });
  };
};

export default {
  UpdateBlogInitiate,
};
