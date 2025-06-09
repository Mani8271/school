import {
  GET_ALL_BLOG_START,
  GET_ALL_BLOG_SUCCESS,
  GET_ALL_BLOG_ERROR,
} from "../../actions/actionTypes";

const initialState = {
  blogs: [],         // Array to store blog data
  loading: false,    // State to track loading
  error: null,       // State to track errors
};

const GetAllBlogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,   // Clear previous error
      };
    case GET_ALL_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload.data,  // Store fetched blogs
      };
    case GET_ALL_BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Store error message
      };
    default:
      return state;
  }
};

export default GetAllBlogsReducer;
