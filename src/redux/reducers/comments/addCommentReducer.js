import * as types from "../../actions/actionTypes";

const initialState = {
  commentdetails: {
    comments: [],
    loading: false,
    error: null,
  },
};

const AddCommentReducer = (state = initialState.commentdetails, action) => {
  switch (action.type) {
    case types.ADD_COMMENT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        // Optionally add the new comment to the state
        // comments: [...state.comments, action.payload],
      };
    case types.ADD_COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AddCommentReducer;
