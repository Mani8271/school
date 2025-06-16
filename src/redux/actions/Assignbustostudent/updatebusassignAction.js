import { updateBusassignApi } from "../../apis/assignbustostudent/updateBusassignApi";
import * as types from "../actionTypes";

// Action Creators
export const updateBusassignStart = (formData) => ({
    type: types.UPDATE_BUS_ASSIGN_START,
    payload: formData,
});

export const updateBusassignSuccess = (res) => ({
    type: types.UPDATE_BUS_ASSIGN_SUCCESS,
    payload: res,
});

export const updateBusassignError = (error) => ({
    type: types.UPDATE_BUS_ASSIGN_ERROR,
    payload: error,
});

// Thunk Action to initiate registration
export const UpdateBusassignInitiate = (updateformdata, callback) => {
    return function (dispatch) {
        dispatch(updateBusassignStart(updateformdata));
        updateBusassignApi(updateformdata)
            .then((res) => {
                dispatch(updateBusassignSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(updateBusassignError(error.message));
            });
    };
};
export default {
    UpdateBusassignInitiate,
};
