import * as types from "../../actionTypes";
import {
  getAllTeachersTimetableApi,
  addTeachersTimetableApi,
  updateTeachersTimetableApi,
  deleteTeachersTimetableApi,
} from "../../../apis/staff/teachingstaff/teachersTimetableApi";

// GET ALL
export const GetAllTeachersTimetableInitiate = () => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ALL_TEACHERS_TIMETABLE_START });
    try {
      const res = await getAllTeachersTimetableApi();
      dispatch({ type: types.GET_ALL_TEACHERS_TIMETABLE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: types.GET_ALL_TEACHERS_TIMETABLE_ERROR, payload: error });
    }
  };
};

// ADD
export const AddTeachersTimetableInitiate = (payload) => {
  return async (dispatch) => {
    dispatch({ type: types.ADD_TEACHERS_TIMETABLE_START });
    try {
      const res = await addTeachersTimetableApi(payload);
      dispatch({ type: types.ADD_TEACHERS_TIMETABLE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: types.ADD_TEACHERS_TIMETABLE_ERROR, payload: error });
    }
  };
};

// UPDATE
export const UpdateTeachersTimetableInitiate = (payload) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_TEACHERS_TIMETABLE_START });
    try {
      const res = await updateTeachersTimetableApi(payload);
      dispatch({ type: types.UPDATE_TEACHERS_TIMETABLE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: types.UPDATE_TEACHERS_TIMETABLE_ERROR, payload: error });
    }
  };
};

// DELETE
export const DeleteTeachersTimetableInitiate = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_TEACHERS_TIMETABLE_START });
    try {
      const res = await deleteTeachersTimetableApi(id);
      dispatch({ type: types.DELETE_TEACHERS_TIMETABLE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: types.DELETE_TEACHERS_TIMETABLE_ERROR, payload: error });
    }
  };
};