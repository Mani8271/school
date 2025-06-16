
import * as types from "../../actions/actionTypes";
const initialState = {
  uploadstatus: {
    data: null,
    loading: false,
    error: null,
  },
};

const UploadStudentsCsvReducer = (
  state = initialState.uploadstatus,
  action
) => {
  switch (action.type) {
    case types.UPLOAD_STUDENTS_REQUEST:
      
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPLOAD_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case types.UPLOAD_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UploadStudentsCsvReducer;