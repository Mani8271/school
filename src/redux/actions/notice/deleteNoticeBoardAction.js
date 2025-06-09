import * as types from "../actionTypes";
import { deleteNoticeboardApi } from "../../apis/notice/deleteNoticeBoardApi";

// Action Creators
export const deleteNoticeboardStart = () => ({
  type: types.DELETE_NOTICEBOARD_START,
});

export const deleteNoticeboardSuccess = (noticeId) => ({
  type: types.DELETE_NOTICEBOARD_SUCCESS,
  payload: noticeId,
});

export const deleteNoticeboardError = (error) => ({
  type: types.DELETE_NOTICEBOARD_ERROR,
  payload: error,
});

// Thunk Action to delete a notice
export const deleteNoticeboardInitiate = (noticeId) => {
  return function (dispatch) {
    dispatch(deleteNoticeboardStart());
    deleteNoticeboardApi(noticeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteNoticeboardSuccess(noticeId));
        } else {
          dispatch(deleteNoticeboardError("Failed to delete notice"));
        }
      })
      .catch((error) => {
        dispatch(deleteNoticeboardError(error.message));
      });
  };
};

export default {
  deleteNoticeboardInitiate,
};
