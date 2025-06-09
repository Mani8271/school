import * as types from "../../actions/actionTypes";

const initialState = {
  noticeboard: {
    notices: [],  // Array of notices
    loading: false,
    error: null,
  },
};

const UpdateNoticeboardReducer = (state = initialState.noticeboard, action) => {
  switch (action.type) {
    case types.UPDATE_NOTICEBOARD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_NOTICEBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        // Update the notice in the array
        notices: state.notices.map((noticeItem) =>
          noticeItem._id === action.payload._id ? action.payload : noticeItem
        ),
      };
    case types.UPDATE_NOTICEBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UpdateNoticeboardReducer;
