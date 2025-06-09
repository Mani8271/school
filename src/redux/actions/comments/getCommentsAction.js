import * as types from "../actionTypes";
import { getAllCommentsApi } from "../../apis/comments/getCommentsApi";

// Action Creators
export const getCommentStart = () => ({
  type: types.GET_COMMENT_START,
});

export const getCommentSuccess = (res) => ({
  type: types.GET_COMMENT_SUCCESS,
  payload: res,
});

export const getCommentError = (error) => ({
  type: types.GET_COMMENT_ERROR,
  payload: error,
});

// ✅ Thunk Action to fetch all comments for a specific blog
export const GetAllCommentInitiate = (blogId) => {
  return function (dispatch) {
    if (!blogId) {
      console.error("❌ blogId is required to fetch comments");
      return;
    }

    dispatch(getCommentStart());

    getAllCommentsApi(blogId)
      .then((res) => {
        dispatch(getCommentSuccess(res));
        if (res.status === 200) {
          console.log("✅ Comments fetched successfully", res);
        }
      })
      .catch((error) => {
        dispatch(getCommentError(error.message));
      });
  };
};

export default {
  GetAllCommentInitiate,
};
