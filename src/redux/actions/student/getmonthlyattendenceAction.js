import * as types from "../actionTypes";
import { getStudentMonthlyAttendanceApi } from "../../apis/students/getmonthlyattendenceApi";

// Action Creators
export const getStudentAttendanceStart = () => ({
  type: types.GET_STUDENT_MONTHLY_ATTENDANCE_START,
});

export const getStudentAttendanceSuccess = (res) => ({
  type: types.GET_STUDENT_MONTHLY_ATTENDANCE_SUCCESS,
  payload: res,
});

export const getStudentAttendanceError = (error) => ({
  type: types.GET_STUDENT_MONTHLY_ATTENDANCE_ERROR,
  payload: error,
});

// Thunk
export const getStudentAttendanceInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch(getStudentAttendanceStart());

    getStudentMonthlyAttendanceApi(payload)
      .then((res) => {
        dispatch(getStudentAttendanceSuccess(res.data));
        if (res.status === 200 || res.status === "success") {
          callback(true); // Notify component of success
        }
      })
      .catch((error) => {
        dispatch(getStudentAttendanceError(error?.message || "Failed to fetch monthly attendance"));
        callback(false); // Notify component of failure
      });
  };
};

export default {
  getStudentAttendanceInitiate,
};