import * as types from "../../actionTypes";
import { getNonTeachingMonthlyAttendanceApi } from "../../../apis/staff/nonteachingsatff/ntMonthlyAttendenceApi";

// Action Creators
export const getNTMonthlyAttendanceStart = () => ({
  type: types.GET_NON_TEACHING_MONTHLY_ATTENDANCE_START,
});

export const getNTMonthlyAttendanceSuccess = (res) => ({
  type: types.GET_NON_TEACHING_MONTHLY_ATTENDANCE_SUCCESS,
  payload: res,
});

export const getNTMonthlyAttendanceError = (error) => ({
  type: types.GET_NON_TEACHING_MONTHLY_ATTENDANCE_ERROR,
  payload: error,
});

// Thunk
export const getNTMonthlyAttendanceInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch(getNTMonthlyAttendanceStart());

    getNonTeachingMonthlyAttendanceApi(payload)
      .then((res) => {
        dispatch(getNTMonthlyAttendanceSuccess(res.data));
        if (res.status === 200 || res.status === "success") {
          callback(true); // Notify component of success
        }
      })
      .catch((error) => {
        dispatch(getNTMonthlyAttendanceError(error?.message || "Failed to fetch monthly attendance"));
        callback(false); // Notify component of failure
      });
  };
};

export default {
  getNTMonthlyAttendanceInitiate,
};
