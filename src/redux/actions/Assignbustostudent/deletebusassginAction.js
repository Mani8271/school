import { deleteBusassignApi } from "../../apis/assignbustostudent/deleteBusassignApi";
import * as types from "../actionTypes";


// Action Creators
export const deleteBusassignStart = (formData) => ({
    type: types.DELETE_BUS_ASSIGN_START,
    payload: formData,
});

export const deleteBusassignSuccess = (res) => ({
    type: types.DELETE_BUS_ASSIGN_SUCCESS,
    payload: res,
});

export const deleteBusassignError = (error) => ({
    type: types.DELETE_BUS_ASSIGN_ERROR,
    payload: error,
});

export const DeleteBusassignInitiate = (formData,callback) => {
    return function (dispatch) {
        dispatch(deleteBusassignStart(formData));
        deleteBusassignApi(formData)
            .then((res) => {
                dispatch(deleteBusassignSuccess(res));
                if (res.status === 200) {
                    callback(true)
                    console.log("i am response in add student intiate", res)
                }
            })
            .catch((error) => {
                dispatch(deleteBusassignError(error.message));
            });
    };
};
export default {
    DeleteBusassignInitiate,
};
