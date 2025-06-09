import * as types from "../actionTypes";
import { searchNoticeboardApi } from "../../apis/notice/searchNoticeBoardApi"; // Update path if needed

// Action Creators
export const searchNoticeboardStart = () => ({
  type: types.SEARCH_NOTICEBOARD_START,
});

export const searchNoticeboardSuccess = (data) => ({
  type: types.SEARCH_NOTICEBOARD_SUCCESS,
  payload: data,
});

export const searchNoticeboardError = (error) => ({
  type: types.SEARCH_NOTICEBOARD_ERROR,
  payload: error,
});

// Thunk Function
export const searchNoticeboardInitiate = (queryParams, callback) => {
  console.log("searchNoticeboardInitiate", queryParams);
  return function (dispatch) {
    dispatch(searchNoticeboardStart());

    searchNoticeboardApi(queryParams)
      .then((res) => {
        dispatch(searchNoticeboardSuccess(res));
        if (callback) callback(true, res);
      })
      .catch((error) => {
        dispatch(searchNoticeboardError(error.message || "Something went wrong"));
        if (callback) callback(false, error);
      });
  };
};
