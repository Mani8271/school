import * as types from "../../actions/actionTypes";
const initialState = {
  examresultsdetails: {
    examresultss: [],
    loading: false,
  },
};
const AddExamresultsReducer = (
  state = initialState.examresultsdetails,
  action
) => {
  switch (action.type) {
    case types.ADD_EXAM_RESULTS_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,

      };
    case types.ADD_EXAM_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_EXAM_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddExamresultsReducer;