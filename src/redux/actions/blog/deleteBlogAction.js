import * as types from "../actionTypes";
import { deleteBlogApi } from "../../apis/blog/deleteBlogApi";

// Action Creators
export const deleteBlogStart = () => ({
  type: types.DELETE_BLOG_START,
});

export const deleteBlogSuccess = (blogId) => ({
  type: types.DELETE_BLOG_SUCCESS,
  payload: blogId,
});

export const deleteBlogError = (error) => ({
  type: types.DELETE_BLOG_ERROR,
  payload: error,
});

// Thunk Action to delete a blog
export const DeleteBlogInitiate = (blogId) => {
  return function (dispatch) {
    dispatch(deleteBlogStart());
    deleteBlogApi(blogId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteBlogSuccess(blogId));
        } else {
          dispatch(deleteBlogError("Failed to delete blog"));
        }
      })
      .catch((error) => {
        dispatch(deleteBlogError(error.message));
      });
  };
};

export default {
  DeleteBlogInitiate,
};
