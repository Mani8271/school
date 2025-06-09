import * as types from "../actionTypes";
import { deleteHolidayApi } from "../../apis/holiday/deleteHolidayApi";

// Action Creators
export const deleteHolidayStart = () => ({
  type: types.DELETE_HOLIDAY_START,
});

export const deleteHolidaySuccess = (holidayId) => ({
  type: types.DELETE_HOLIDAY_SUCCESS,
  payload: holidayId,
});

export const deleteHolidayError = (error) => ({
  type: types.DELETE_HOLIDAY_ERROR,
  payload: error,
});

// Thunk Action
export const deleteHolidayInitiate = (holidayId) => {
  return function (dispatch) {
    dispatch(deleteHolidayStart());
    deleteHolidayApi(holidayId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteHolidaySuccess(holidayId));
        } else {
          dispatch(deleteHolidayError("Failed to delete holiday"));
        }
      })
      .catch((error) => {
        dispatch(deleteHolidayError(error.message));
      });
  };
};

export default {
  deleteHolidayInitiate,
};
