import * as types from "../../../actions/actionTypes";

const initialState = {
  uploadstatus: {
    data: null,
    loading: false,
    error: null,
  },
};

const UploadNonTeachingStaffCsvReducer = (
  state = initialState.uploadstatus,
  action
) => {
  switch (action.type) {
    case types.UPLOAD_NONTEACHING_STAFF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPLOAD_NONTEACHING_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case types.UPLOAD_NONTEACHING_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UploadNonTeachingStaffCsvReducer;
