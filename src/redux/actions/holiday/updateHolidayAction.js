import * as types from "../actionTypes";
import { updateHolidayApi } from "../../apis/holiday/updateHolidayApi";

// Action Creators
export const updateHolidayStart = () => ({
  type: types.UPDATE_HOLIDAY_START,
});

export const updateHolidaySuccess = (updatedHoliday) => ({
  type: types.UPDATE_HOLIDAY_SUCCESS,
  payload: updatedHoliday,
});

export const updateHolidayError = (error) => ({
  type: types.UPDATE_HOLIDAY_ERROR,
  payload: error,
});

// Thunk
export const updateHolidayInitiate = (holidayData) => {
  return function (dispatch) {
    dispatch(updateHolidayStart());
    updateHolidayApi(holidayData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateHolidaySuccess(res.data.holiday));
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.errors?.[0] || error.message;
        dispatch(updateHolidayError(errorMsg));
      });
  };
};
