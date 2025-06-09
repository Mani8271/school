import * as types from "../../actions/actionTypes";

const initialState = {
  noticeboardData: {
    noticeboards: [],  // Array to store noticeboard items
    loading: false,    // State to track loading
    error: null,       // State to track errors
  },
};

const GetAllNoticeboardReducer = (state = initialState.noticeboardData, action) => {
  switch (action.type) {
    case types.GET_NOTICEBOARD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_NOTICEBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        noticeboards: action.payload,
      };
    case types.GET_NOTICEBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default GetAllNoticeboardReducer;
