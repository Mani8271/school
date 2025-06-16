import { addExamresultsApi } from "../../apis/examresults/addExamresultsApi";
import * as types from "../actionTypes";

// Action Creators
export const createExamresultsStart = (formData) => ({
    type: types.ADD_EXAM_RESULTS_START,
    payload: formData,
});

export const createExamresultsSuccess = (res) => ({
    type: types.ADD_EXAM_RESULTS_SUCCESS,
    payload: res,
});

export const createExamresultsError = (error) => ({
    type: types.ADD_EXAM_RESULTS_ERROR,
    payload: error,
});

export const AddExamresultsInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createExamresultsStart(formData));
        addExamresultsApi(formData)
            .then((res) => {
                dispatch(createExamresultsSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createExamresultsError(error.message));
            });
    };
};
export default {
    AddExamresultsInitiate,
};
