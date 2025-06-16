import * as types from "../../actions/actionTypes";
const initialState = {
  deleteexamresultsdetails: {
    deletedexamresults: [],
    loading: false,
  },
};
const DeleteExamresultsReducer = (
  state = initialState.deleteexamresultsdetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_EXAM_RESULTS_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_EXAM_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_EXAM_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeleteExamresultsReducer;   