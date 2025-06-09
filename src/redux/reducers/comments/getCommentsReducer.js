import {
  GET_COMMENT_START,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR,
} from "../../actions/actionTypes";

const initialState = {
  comments: [],     // Array to store comments
  loading: false,   // State to track loading
  error: null,      // State to track errors
};

const GetAllCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_START:
      return {
        ...state,
        loading: true,
        error: null,   // Clear previous error
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload.data,  // Store fetched comments
      };
    case GET_COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Store error message
      };
    default:
      return state;
  }
};

export default GetAllCommentsReducer;
