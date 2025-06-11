import * as types from "../actionTypes";
import { updateSectionApi } from "../../apis/class/updateSectionApi";

// Action Creators
export const updateSectionStart = () => ({
  type: types.UPDATE_SECTION_START,
});

export const updateSectionSuccess = (updatedSection) => ({
  type: types.UPDATE_SECTION_SUCCESS,
  payload: updatedSection,
});

export const updateSectionError = (error) => ({
  type: types.UPDATE_SECTION_ERROR,
  payload: error,
});

// Thunk Action to update a section
export const UpdateSectionInitiate = (section_id,sectionData,callback) => {
  return function (dispatch) {
    dispatch(updateSectionStart());
    updateSectionApi(section_id,sectionData)
      .then((res) => {
        if (res.status === 200) {
          callback(true);
          dispatch(updateSectionSuccess(res.data.Section));
        }
      })
      .catch((error) => {
        dispatch(updateSectionError(error.response?.data?.errors?.[0] || error.message));
      });
  };
};

export default {
  UpdateSectionInitiate,
};
