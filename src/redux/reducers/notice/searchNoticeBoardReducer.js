import * as types from "../../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],  
  error: null,
};

const searchNoticeboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_NOTICEBOARD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.SEARCH_NOTICEBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.SEARCH_NOTICEBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};

export default searchNoticeboardReducer;
