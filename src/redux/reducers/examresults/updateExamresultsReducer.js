import * as types from "../../actions/actionTypes";
const initialState = {
  updatedexamresultsdetails: {
    updatedexamresults: [],
    loading: false,
  },
};
const UpdateexamresultsReducer = (
  state = initialState.updatedexamresultsdetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_EXAM_RESULTS_START:
      // console.log('respin reducer', state);
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_EXAM_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_EXAM_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdateexamresultsReducer;