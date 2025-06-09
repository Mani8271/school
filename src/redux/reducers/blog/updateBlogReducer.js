import * as types from "../../actions/actionTypes";

const initialState = {
  updatedBlogDetails: {
    updatedBlog: [],
    loading: false,
    error: null,
  },
};

const UpdateBlogReducer = (
  state = initialState.updatedBlogDetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedBlog: action.payload,
        error: null,
      };
    case types.UPDATE_BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UpdateBlogReducer;
