import * as types from "../../actions/actionTypes";

const initialState = {
  blogdetails: {
    blogs: [],
    loading: false,
    error: null,
  },
};

const AddBlogReducer = (state = initialState.blogdetails, action) => {
  switch (action.type) {
    case types.ADD_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        // Optionally add the blog to the state
        // blogs: [...state.blogs, action.payload],
      };
    case types.ADD_BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AddBlogReducer;
