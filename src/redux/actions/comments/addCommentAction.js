import * as types from "../actionTypes";
import { addCommentApi } from "../../apis/comments/addCommentApi";

// Action Creators
export const createCommentStart = (formData) => ({
  type: types.ADD_COMMENT_START,
  payload: formData,
});

export const createCommentSuccess = (res) => ({
  type: types.ADD_COMMENT_SUCCESS,
  payload: res,
});

export const createCommentError = (error) => ({
  type: types.ADD_COMMENT_ERROR,
  payload: error,
});

// Thunk Action to initiate comment addition
export const AddCommentInitiate = (formData) => {
  return function (dispatch) {
    dispatch(createCommentStart(formData));

    addCommentApi(formData)
      .then((res) => {
        dispatch(createCommentSuccess(res));
        if (res.status === 200) {
          console.log("Comment added successfully:", res);
        }
      })
      .catch((error) => {
        dispatch(createCommentError(error.response?.data?.errors?.[0] || error.message));
      });
  };
};

export default {
  AddCommentInitiate,
};
