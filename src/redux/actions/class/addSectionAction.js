import * as types from "../actionTypes";
import { addSectionApi } from "../../apis/class/addSectionApi"; // Update path if needed

// Action Creators
export const createSectionStart = (formData) => ({
  type: types.ADD_SECTION_START,
  payload: formData,
});

export const createSectionSuccess = (res) => ({
  type: types.ADD_SECTION_SUCCESS,
  payload: res,
});

export const createSectionError = (error) => ({
  type: types.ADD_SECTION_ERROR,
  payload: error,
});

// Thunk Action to initiate section addition
export const AddSectionInitiate = (formData) => {
  return function (dispatch) {
    dispatch(createSectionStart(formData));

    addSectionApi(formData)
      .then((res) => {
        dispatch(createSectionSuccess(res));
        if (res.status === 200) {
          console.log("Section added successfully:", res);
        }
      })
      .catch((error) => {
        dispatch(createSectionError(error.message));
      });
  };
};

export default {
  AddSectionInitiate,
};
