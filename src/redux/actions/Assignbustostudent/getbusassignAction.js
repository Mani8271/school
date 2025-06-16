import { getAllbusassignApi } from "../../apis/assignbustostudent/getAllbusassignApi";
import * as types from "../actionTypes";

// Action Creators
export const getAllBusassignStart = () => ({
  type: types.GET_ALL_BUS_ASSIGN_DATA_START,
});

export const getAllBusassignSuccess = (res) => ({
  type: types.GET_ALL_BUS_ASSIGN_DATA_SUCCESS,
  payload: res,
});

export const getAllBusassignError = (error) => ({
  type: types.GET_ALL_BUS_ASSIGN_DATA_ERROR,
  payload: error,
});

// Thunk Action to fetch all classes
// let isClassesFetched = false;

export const getAllBusassignInitiate = () => {
  return function (dispatch) {
    // if (isClassesFetched) return;
    // isClassesFetched = true;
    dispatch(getAllBusassignStart());
    getAllbusassignApi()
      .then((res) => {
        dispatch(getAllBusassignSuccess(res));
        if (res.status === 200) {
          console.log("i am response in get all classes initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllBusassignError(error.message));
      });
  };
};
export default {
  getAllBusassignInitiate,
};
