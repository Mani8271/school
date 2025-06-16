import * as types from "../actionTypes";
import { uploadExamresultsCsvApi } from "../../apis/uploadcsvforexamreults/uploadcsvforexamresultsApi";

// Action Creators
export const uploadexamresultsCsvStart = () => ({
  type: types.UPLOAD_EXAM_RESULTS_REQUEST,
});

export const uploadexamresultsCsvSuccess = (res) => ({
  type: types.UPLOAD_EXAM_RESULTS_SUCCESS,
  payload: res,
});

export const uploadexamresultsCsvFailure = (error) => ({
  type: types.UPLOAD_EXAM_RESULTS_FAILURE,
  payload: error,
});

// Thunk
export const UploadexamresultsCsvInitiate = (formData, callback) => {
  return function (dispatch) {
    dispatch(uploadexamresultsCsvStart());

    uploadExamresultsCsvApi(formData)
      .then((res) => {
        dispatch(uploadexamresultsCsvSuccess(res));
        if (res.status === 200 || res.status === "success") {
          callback(true); // Notify component of success
        }
      })
      .catch((error) => {
        dispatch(uploadexamresultsCsvFailure(error?.message || "Upload failed"));
        callback(false); // Optional: notify component of failure
      });
  };
};

export default {
  UploadexamresultsCsvInitiate,
};