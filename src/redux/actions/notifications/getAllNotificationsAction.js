
import * as types from "../actionTypes";
import { getAllNotificationsApi } from "../../apis/notifications/getAllNotificationsApi";

// Action Creators
export const getAllNotificationsStart = () => ({
  type: types.GET_ALL_NOTIFICATIONS_START,
});

export const getAllNotificationsSuccess = (res) => ({
  type: types.GET_ALL_NOTIFICATIONS_SUCCESS,
  payload: res,
});

export const getAllNotificationsError = (error) => ({
  type: types.GET_ALL_NOTIFICATIONS_ERROR,
  payload: error,
});

// Thunk Action Creator
export const GetAllNotificationsInitiate = () => {
  return function (dispatch) {
    dispatch(getAllNotificationsStart());

    getAllNotificationsApi()
      .then((res) => {
        dispatch(getAllNotificationsSuccess(res.data));
        if (res.status === 200) {
          console.log("I am response in get all notifications initiate", res);
        }
      })
      .catch((error) => {
        dispatch(getAllNotificationsError(error.message));
      });
  };
};

export default {
  GetAllNotificationsInitiate,
};