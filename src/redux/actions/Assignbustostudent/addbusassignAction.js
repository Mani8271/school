import { addBusassignApi } from "../../apis/assignbustostudent/addBusassignApi";
import * as types from "../actionTypes";

// Action Creators
export const createBusassignStart = (formData) => ({
    type: types.ADD_BUS_ASSIGN_START,
    payload: formData,
});

export const createBusassignSuccess = (res) => ({
    type: types.ADD_BUS_ASSIGN_SUCCESS,
    payload: res,
});

export const createBusassignError = (error) => ({
    type: types.ADD_BUS_ASSIGN_ERROR,
    payload: error,
});

export const AddBusassignInitiate = (formData, callback) => {
    return function (dispatch) {
        dispatch(createBusassignStart(formData));
        addBusassignApi(formData)
            .then((res) => {
                dispatch(createBusassignSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(createBusassignError(error.message));
            });
    };
};
export default {
    AddBusassignInitiate,
};
