import * as types from "../../actions/actionTypes";

const initialState = {
  noticeboard: {
    loading: false,
    error: null,
  },
};

const AddNoticeboardReducer = (state = initialState.noticeboard, action) => {
  switch (action.type) {
    case types.ADD_NOTICEBOARD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.ADD_NOTICEBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case types.ADD_NOTICEBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AddNoticeboardReducer;
