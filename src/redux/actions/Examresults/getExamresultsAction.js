import { getAllexamresultsApi } from "../../apis/examresults/getAllexamresultsApi";
import * as types from "../actionTypes";

// Action Creators
export const getAllExamresultsStart = () => ({
  type: types.GET_ALL_EXAM_RESULTS_DATA_START,
});

export const getAllExamresultsSuccess = (res) => ({
  type: types.GET_ALL_EXAM_RESULTS_DATA_SUCCESS,
  payload: res,
});

export const getAllExamresultsError = (error) => ({
  type: types.GET_ALL_EXAM_RESULTS_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllExamresultsInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllExamresultsStart());
    getAllexamresultsApi()
      .then((res) => {
        dispatch(getAllExamresultsSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllExamresultsError(error.message));
      });
  };
};
export default {
  getAllExamresultsInitiate,
};
