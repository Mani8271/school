import { updateExamresultsApi } from "../../apis/examresults/updateExamresultsApi";
import * as types from "../actionTypes";

// Action Creators
export const updateExamresultsStart = (formData) => ({
    type: types.UPDATE_EXAM_RESULTS_START,
    payload: formData,
});

export const updateExamresultsSuccess = (res) => ({
    type: types.UPDATE_EXAM_RESULTS_SUCCESS,
    payload: res,
});

export const updateExamresultsError = (error) => ({
    type: types.UPDATE_EXAM_RESULTS_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateExamresultsInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(updateExamresultsStart(formData));
        updateExamresultsApi(formData)
            .then((res) => {
                dispatch(updateExamresultsSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateExamresultsError(error.message));
            });
    };
};
export default {
    UpdateExamresultsInitiate,
};
