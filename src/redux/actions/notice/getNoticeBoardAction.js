import * as types from "../actionTypes";
import { getNoticeboardsApi } from "../../apis/notice/getNoticeBoardApi";

// Action Creators
export const getNoticeboardStart = () => ({
  type: types.GET_NOTICEBOARD_START,
});

export const getNoticeboardSuccess = (res) => ({
  type: types.GET_NOTICEBOARD_SUCCESS,
  payload: res,
});

export const getNoticeboardError = (error) => ({
  type: types.GET_NOTICEBOARD_ERROR,
  payload: error,
});

// Thunk Action
export const getNoticeboardInitiate = () => {
  return function (dispatch) {
    dispatch(getNoticeboardStart());
    getNoticeboardsApi()
      .then((res) => {
        dispatch(getNoticeboardSuccess(res));
        if (res.status === 200) {
          console.log("✅ Fetched noticeboard data", res);
        }
      })
      .catch((error) => {
        dispatch(getNoticeboardError(error.message));
      });
  };
};

export default {
  getNoticeboardInitiate,
};
