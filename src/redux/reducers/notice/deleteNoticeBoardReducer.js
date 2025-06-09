import * as types from "../../actions/actionTypes";

const initialState = {
  noticedetails: {
    notices: [],
    loading: false,
    error: null,
  },
};

const DeleteNoticeboardReducer = (state = initialState.noticedetails, action) => {
  switch (action.type) {
    case types.DELETE_NOTICEBOARD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_NOTICEBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        // Remove the deleted notice from the list
        notices: state.notices.filter(notice => notice._id !== action.payload._id),
      };
    case types.DELETE_NOTICEBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteNoticeboardReducer;
