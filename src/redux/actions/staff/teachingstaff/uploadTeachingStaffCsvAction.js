import * as types from "../../actionTypes";
import { uploadTeachingStaffCsvApi } from "../../../apis/staff/teachingstaff/uploadTeachingStaffCsvApi";

// Action Creators
export const uploadTeachingStaffCsvStart = () => ({
  type: types.UPLOAD_TEACHING_STAFF_REQUEST,
});

export const uploadTeachingStaffCsvSuccess = (res) => ({
  type: types.UPLOAD_TEACHING_STAFF_SUCCESS,
  payload: res,
});

export const uploadTeachingStaffCsvFailure = (error) => ({
  type: types.UPLOAD_TEACHING_STAFF_FAILURE,
  payload: error,
});

// Thunk
export const UploadTeachingStaffCsvInitiate = (formData, callback) => {
  return function (dispatch) {
    dispatch(uploadTeachingStaffCsvStart());

    uploadTeachingStaffCsvApi(formData)
      .then((res) => {
        dispatch(uploadTeachingStaffCsvSuccess(res));
        if (res.status === 200 || res.status === "success") {
          callback(true); // Notify component of success
        }
      })
      .catch((error) => {
        dispatch(uploadTeachingStaffCsvFailure(error?.message || "Upload failed"));
        callback(false); // Optional: notify component of failure
      });
  };
};

export default {
  UploadTeachingStaffCsvInitiate,
};
