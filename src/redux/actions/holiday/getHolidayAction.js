import * as types from "../actionTypes";
import { getHolidaysApi } from "../../apis/holiday/getHolidayApi";

// Action Creators
export const getHolidayStart = () => ({
  type: types.GET_HOLIDAY_START,
});

export const getHolidaySuccess = (res) => ({
  type: types.GET_HOLIDAY_SUCCESS,
  payload: res,
});

export const getHolidayError = (error) => ({
  type: types.GET_HOLIDAY_ERROR,
  payload: error,
});

// Thunk Action
export const getHolidayInitiate = () => {
  return function (dispatch) {
    dispatch(getHolidayStart());
    getHolidaysApi()
      .then((res) => {
        dispatch(getHolidaySuccess(res));
        if (res.status === 200) {
          console.log("✅ Fetched holiday data", res);
        }
      })
      .catch((error) => {
        dispatch(getHolidayError(error.message));
      });
  };
};

export default {
  getHolidayInitiate,
};
