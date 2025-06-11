
import * as types from "../actionTypes";
import { deleteSectionApi } from "../../apis/class/deleteSectionApi";

// Action Creators
export const deleteSectionStart = () => ({
  type: types.DELETE_SECTION_START,
});

export const deleteSectionSuccess = (sectionId) => ({
  type: types.DELETE_SECTION_SUCCESS,
  payload: sectionId,
});

export const deleteSectionError = (error) => ({
  type: types.DELETE_SECTION_ERROR,
  payload: error,
});

// Thunk Action to delete a section
export const DeleteSectionInitiate = (sectionId,callback) => {
  return function (dispatch) {
    dispatch(deleteSectionStart());
    deleteSectionApi(sectionId)
      .then((res) => {
        if (res.status === 200) {
          callback(true);
          dispatch(deleteSectionSuccess(sectionId));
        }
      })
      .catch((error) => {
        dispatch(deleteSectionError(error.message));
      });
  };
};

export default {
  DeleteSectionInitiate,
};