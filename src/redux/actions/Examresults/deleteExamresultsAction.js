import { deleteExamresultsApi } from "../../apis/examresults/deleteExamresultsApi";
import * as types from "../actionTypes";


// Action Creators
export const deleteExamresultsStart = (formData) => ({
    type: types.DELETE_EXAM_RESULTS_START,
    payload: formData,
});

export const deleteExamresultsSuccess = (res) => ({
    type: types.DELETE_EXAM_RESULTS_SUCCESS,
    payload: res,
});

export const deleteExamresultsError = (error) => ({
    type: types.DELETE_EXAM_RESULTS_ERROR,
    payload: error,
});

export const DeleteExamresultsInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteExamresultsStart(formData));
        deleteExamresultsApi(formData)
            .then((res) => {
                dispatch(deleteExamresultsSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteExamresultsError(error.message));
            });
    };
};
export default {
    DeleteExamresultsInitiate,
};
