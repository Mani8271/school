import * as types from "../../actionTypes";
import {
  getAllStaffAttendanceApi,
  addStaffAttendanceApi,
  updateStaffAttendanceApi,
  deleteStaffAttendanceApi,
} from "../../../apis/staff/teachingstaff/staffDailyAttendenceApi"; // adjust the path as needed

// GET ALL Attendance Records
export const GetAllStaffAttendanceInitiate = () => {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_STAFF_ATTENDANCE_START });
    getAllStaffAttendanceApi()
      .then((res) => {
        dispatch({ type: types.GET_ALL_STAFF_ATTENDANCE_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_STAFF_ATTENDANCE_ERROR, payload: error.message });
      });
  };
};

// ADD Attendance Record
export const AddStaffAttendanceInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch({ type: types.ADD_STAFF_ATTENDANCE_START });
    addStaffAttendanceApi(payload)
      .then((res) => {
        dispatch({ type: types.ADD_STAFF_ATTENDANCE_SUCCESS, payload });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        dispatch({ type: types.ADD_STAFF_ATTENDANCE_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};

// UPDATE Attendance Record
export const UpdateStaffAttendanceInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch({ type: types.UPDATE_STAFF_ATTENDANCE_START });
    updateStaffAttendanceApi(payload)
      .then((res) => {
        dispatch({ type: types.UPDATE_STAFF_ATTENDANCE_SUCCESS, payload: res });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_STAFF_ATTENDANCE_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};

// DELETE Attendance Record
export const DeleteStaffAttendanceInitiate = (id, callback) => {
  return function (dispatch) {
    dispatch({ type: types.DELETE_STAFF_ATTENDANCE_START });
    deleteStaffAttendanceApi(id)
      .then((res) => {
        dispatch({ type: types.DELETE_STAFF_ATTENDANCE_SUCCESS, payload: id });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        dispatch({ type: types.DELETE_STAFF_ATTENDANCE_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};
