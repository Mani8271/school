import * as types from "../../actions/actionTypes";

const initialState = {
  blogDetails: {
    blogs: [],
    loading: false,
    error: null,
  },
};

const DeleteBlogReducer = (state = initialState.blogDetails, action) => {
  switch (action.type) {
    case types.DELETE_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        // Remove the deleted blog from the list
        blogs: state.blogs.filter(blog => blog._id !== action.payload),
      };
    case types.DELETE_BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteBlogReducer;
