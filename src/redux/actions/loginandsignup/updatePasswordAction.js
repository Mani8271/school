import * as types from "../actionTypes";
import { updatePasswordApi } from "../../apis/loginandsignup/updatePasswordApi";

// Action Creators
export const updatePasswordStart = () => ({
  type: types.UPDATE_PASSWORD_START,
});

export const updatePasswordSuccess = (res) => ({
  type: types.UPDATE_PASSWORD_SUCCESS,
  payload: res,
});

export const updatePasswordError = (error) => ({
  type: types.UPDATE_PASSWORD_ERROR,
  payload: error,
});

// Thunk Action
export const updatePasswordInitiate = (formData,  callback) => {
  return function (dispatch) {
    dispatch(updatePasswordStart());

    updatePasswordApi(formData)
      .then((res) => {
        dispatch(updatePasswordSuccess(res));
        if (res.status === 200) {
             callback(true)
        //   navigate("/settings"); // Redirect after password update
        }
      })
      .catch((error) => {
        dispatch(updatePasswordError(error.message));
      });
  };
};

export default {
  updatePasswordInitiate,
};
