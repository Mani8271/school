import * as types from "../../actionTypes";
import {
  getAllTeachersTimetableApi,
  addTeachersTimetableApi,
  updateTeachersTimetableApi,
  deleteTeachersTimetableApi,
} from "../../../apis/staff/teachingstaff/teachersTimetableApi";

// GET ALL Teachers Timetable
export const GetAllTeachersTimetableInitiate = () => {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_TEACHERS_TIMETABLE_START });
    getAllTeachersTimetableApi()
      .then((res) => {
        console.log("GET ALL Response:", res);
        dispatch({ type: types.GET_ALL_TEACHERS_TIMETABLE_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("GET ALL Error:", error);
        dispatch({
          type: types.GET_ALL_TEACHERS_TIMETABLE_ERROR,
          payload: error.message,
        });
      });
  };
};

// ADD Teachers Timetable
export const AddTeachersTimetableInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch({ type: types.ADD_TEACHERS_TIMETABLE_START });
    addTeachersTimetableApi(payload)
      .then((res) => {
        console.log("ADD Response:", res);
        dispatch({ type: types.ADD_TEACHERS_TIMETABLE_SUCCESS, payload: res });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        console.error("ADD Error:", error);
        dispatch({ type: types.ADD_TEACHERS_TIMETABLE_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};

// UPDATE Teachers Timetable
export const UpdateTeachersTimetableInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch({ type: types.UPDATE_TEACHERS_TIMETABLE_START });
    updateTeachersTimetableApi(payload)
      .then((res) => {
        console.log("UPDATE Response:", res);
        dispatch({ type: types.UPDATE_TEACHERS_TIMETABLE_SUCCESS, payload: res });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        console.error("UPDATE Error:", error);
        dispatch({ type: types.UPDATE_TEACHERS_TIMETABLE_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};

// DELETE Teachers Timetable
export const DeleteTeachersTimetableInitiate = (id, callback) => {
  return function (dispatch) {
    dispatch({ type: types.DELETE_TEACHERS_TIMETABLE_START });
    deleteTeachersTimetableApi(id)
      .then((res) => {
        console.log("DELETE Response:", res);
        dispatch({ type: types.DELETE_TEACHERS_TIMETABLE_SUCCESS, payload: id });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        console.error("DELETE Error:", error);
        dispatch({ type: types.DELETE_TEACHERS_TIMETABLE_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};
