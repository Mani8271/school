import * as types from "../actionTypes";
import { getAllBlogsApi } from "../../apis/blog/getAllBlogsApi"; // <- Adjust this path as needed

// Action Creators
export const getAllBlogStart = () => ({
  type: types.GET_ALL_BLOG_START,
});

export const getAllBlogSuccess = (res) => ({
  type: types.GET_ALL_BLOG_SUCCESS,
  payload: res,
});

export const getAllBlogError = (error) => ({
  type: types.GET_ALL_BLOG_ERROR,
  payload: error,
});

// Thunk Action to fetch all blogs
let isBlogsFetched = false;

export const GetAllBlogInitiate = () => {
  return function (dispatch) {
    if (isBlogsFetched) return;
    isBlogsFetched = true;
    dispatch(getAllBlogStart());
    getAllBlogsApi()
      .then((res) => {
        dispatch(getAllBlogSuccess(res));
        if (res.status === 200) {
          console.log("✅ Blogs fetched successfully", res);
        }
      })
      .catch((error) => {
        dispatch(getAllBlogError(error.message));
      });
  };
};

export default {
  GetAllBlogInitiate,
};
