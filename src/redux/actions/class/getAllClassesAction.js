import * as types from "../actionTypes";
import { getAllClassesApi } from "../../apis/class/getAllClassesApi";

// Action Creators
export const getAllClassesStart = () => ({
  type: types.GET_ALLCLASSES_START,
});

export const getAllClassesSuccess = (res) => ({
  type: types.GET_ALLCLASSES_SUCCESS,
  payload: res,
});

export const getAllClassesError = (error) => ({
  type: types.GET_ALLCLASSES_ERROR,
  payload: error,
});



export const GetAllClassesInitiate = () => {
  return function (dispatch) {

    dispatch(getAllClassesStart());
    getAllClassesApi()
      .then((res) => {
        dispatch(getAllClassesSuccess(res.data));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllClassesError(error.message));
      });
  };
};

export default {
  GetAllClassesInitiate,
};
