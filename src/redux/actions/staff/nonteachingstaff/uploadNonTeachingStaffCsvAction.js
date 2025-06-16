import * as types from "../../actionTypes";
import { uploadNonTeachingStaffCsvApi } from "../../../apis/staff/nonteachingsatff/uploadNonTeachingStaffCsvApi";

// Action Creators
export const uploadNonTeachingStaffCsvStart = () => ({
  type: types.UPLOAD_NONTEACHING_STAFF_REQUEST,
});

export const uploadNonTeachingStaffCsvSuccess = (res) => ({
  type: types.UPLOAD_NONTEACHING_STAFF_SUCCESS,
  payload: res,
});

export const uploadNonTeachingStaffCsvFailure = (error) => ({
  type: types.UPLOAD_NONTEACHING_STAFF_FAILURE,
  payload: error,
});

// Thunk
export const UploadNonTeachingStaffCsvInitiate = (formData, callback) => {
  return function (dispatch) {
    dispatch(uploadNonTeachingStaffCsvStart());

    uploadNonTeachingStaffCsvApi(formData)
      .then((res) => {
        dispatch(uploadNonTeachingStaffCsvSuccess(res));
        if (res.status === 200 || res.status === "success") {
          callback(true); // success
        }
      })
      .catch((error) => {
        dispatch(uploadNonTeachingStaffCsvFailure(error?.message || "Upload failed"));
        callback(false); // failure
      });
  };
};

export default {
  UploadNonTeachingStaffCsvInitiate,
};
