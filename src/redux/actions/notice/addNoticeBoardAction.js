import * as types from "../actionTypes";
import { addNoticeBoardApi } from "../../apis/notice/addNoticeBoardApi";

// Action Creators
export const createNoticeBoardStart = (formData) => ({
  type: types.ADD_NOTICEBOARD_START,
  payload: formData,
});

export const createNoticeBoardSuccess = (res) => ({
  type: types.ADD_NOTICEBOARD_SUCCESS,
  payload: res,
});

export const createNoticeBoardError = (error) => ({
  type: types.ADD_NOTICEBOARD_ERROR,
  payload: error,
});

// Thunk action for API call
export const AddNoticeBoardInitiate = (formData, callback) => {
  return function (dispatch) {
    dispatch(createNoticeBoardStart(formData));
    console.log("Form data before sending:", formData);
    addNoticeBoardApi(formData)
      .then((res) => {
        dispatch(createNoticeBoardSuccess(res));
        if (res.status === 200) {
          callback(true);
          console.log("Notice board added successfully", res);
        }
      })
      .catch((error) => {
        dispatch(createNoticeBoardError(error.message));
      });
  };
};

export default {
  AddNoticeBoardInitiate,
};
