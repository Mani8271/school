import * as types from "../../actionTypes";
import {
  getAllLeaveRequestsApi,
  addLeaveRequestApi,
  updateLeaveRequestApi,
  deleteLeaveRequestApi,
} from "../../../apis/staff/teachingstaff/staffLeaveRequestsApi"; // adjust path as needed

// GET ALL Leave Requests
export const GetAllLeaveRequestsInitiate = () => {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_LEAVE_REQUESTS_START });
    getAllLeaveRequestsApi()
      .then((res) => {
        console.log("GET ALL Leave Requests Response:", res);
        dispatch({ type: types.GET_ALL_LEAVE_REQUESTS_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.error("GET ALL Leave Requests Error:", error);
        dispatch({
          type: types.GET_ALL_LEAVE_REQUESTS_ERROR,
          payload: error.message,
        });
      });
  };
};

// ADD Leave Request
export const AddLeaveRequestInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch({ type: types.ADD_LEAVE_REQUEST_START });
    addLeaveRequestApi(payload)
      .then((res) => {
        console.log("ADD Leave Request Response:", res);
        dispatch({ type: types.ADD_LEAVE_REQUEST_SUCCESS, payload: payload });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        console.error("ADD Leave Request Error:", error);
        dispatch({
          type: types.ADD_LEAVE_REQUEST_ERROR,
          payload: error.message,
        });
        if (typeof callback === "function") callback(false);
      });
  };
};

// UPDATE Leave Request
// UPDATE Leave Request
// UPDATE Leave Request
export const UpdateLeaveRequestInitiate = (payload, callback) => {
  return function (dispatch) {
    dispatch({ type: types.UPDATE_LEAVE_REQUEST_START, payload });
    updateLeaveRequestApi(payload)
      .then((res) => {
        dispatch({ type: types.UPDATE_LEAVE_REQUEST_SUCCESS, payload: res.leaves }); // 👈 fixed
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_LEAVE_REQUEST_ERROR, payload: error.message });
        if (typeof callback === "function") callback(false);
      });
  };
};



// DELETE Leave Request
export const DeleteLeaveRequestInitiate = (id, callback) => {
  return function (dispatch) {
    dispatch({ type: types.DELETE_LEAVE_REQUEST_START });
    deleteLeaveRequestApi(id)
      .then((res) => {
        console.log("DELETE Leave Request Response:", res);
        dispatch({ type: types.DELETE_LEAVE_REQUEST_SUCCESS, payload: id });
        if (typeof callback === "function") callback(true);
      })
      .catch((error) => {
        console.error("DELETE Leave Request Error:", error);
        dispatch({
          type: types.DELETE_LEAVE_REQUEST_ERROR,
          payload: error.message,
        });
        if (typeof callback === "function") callback(false);
      });
  };
};
