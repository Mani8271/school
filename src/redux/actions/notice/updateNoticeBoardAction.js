import * as types from "../actionTypes";
import { updateNoticeboardApi } from "../../apis/notice/updateNoticeBoardApi";

// Action Creators
export const updateNoticeboardStart = () => ({
  type: types.UPDATE_NOTICEBOARD_START,
});

export const updateNoticeboardSuccess = (updatedNoticeboard) => ({
  type: types.UPDATE_NOTICEBOARD_SUCCESS,
  payload: updatedNoticeboard,
});

export const updateNoticeboardError = (error) => ({
  type: types.UPDATE_NOTICEBOARD_ERROR,
  payload: error,
});

// Thunk Action to update a noticeboard
export const updateNoticeboardInitiate = ( noticeboardData) => {
  
  return function (dispatch) {
    dispatch(updateNoticeboardStart());
    updateNoticeboardApi( noticeboardData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateNoticeboardSuccess(res.data.noticeboard));
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.errors?.[0] || error.message;
        dispatch(updateNoticeboardError(errorMsg));
      });
  };
};

export default {
  updateNoticeboardInitiate,
};
