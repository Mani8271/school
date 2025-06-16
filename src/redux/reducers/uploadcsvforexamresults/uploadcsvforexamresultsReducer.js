
import * as types from "../../actions/actionTypes";
const initialState = {
  uploadstatus: {
    data: null,
    loading: false,
    error: null,
  },
};

const UploadExamresultsCsvReducer = (
  state = initialState.uploadstatus,
  action
) => {
  switch (action.type) {
    case types.UPLOAD_EXAM_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPLOAD_EXAM_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case types.UPLOAD_EXAM_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UploadExamresultsCsvReducer;