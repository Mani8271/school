import * as types from "../actionTypes";
import { uploadStudentsCsvApi } from "../../apis/students/uploadstudentcsvApi";

// Action Creators
export const uploadstudentsCsvStart = () => ({
  type: types.UPLOAD_STUDENTS_REQUEST,
});

export const uploadstudentsCsvSuccess = (res) => ({
  type: types.UPLOAD_STUDENTS_SUCCESS,
  payload: res,
});

export const uploadstudentsCsvFailure = (error) => ({
  type: types.UPLOAD_STUDENTS_FAILURE,
  payload: error,
});

// Thunk
export const UploadstudentsCsvInitiate = (formData, callback) => {
  return function (dispatch) {
    dispatch(uploadstudentsCsvStart());

    uploadStudentsCsvApi(formData)
      .then((res) => {
        dispatch(uploadstudentsCsvSuccess(res));
        if (res.status === 200 || res.status === "success") {
          callback(true); // Notify component of success
        }
      })
      .catch((error) => {
        dispatch(uploadstudentsCsvFailure(error?.message || "Upload failed"));
        callback(false); // Optional: notify component of failure
      });
  };
};

export default {
  UploadstudentsCsvInitiate,
};