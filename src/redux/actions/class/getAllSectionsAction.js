import * as types from "../actionTypes";
import { getAllSectionsApi } from "../../apis/class/getAllSectionsApi";

// Action Creators
export const getAllSectionsStart = () => ({
  type: types.GET_ALLSECTION_START,
});

export const getAllSectionsSuccess = (res) => ({
  type: types.GET_ALLSECTION_SUCCESS,
  payload: res,
});

export const getAllSectionsError = (error) => ({
  type: types.GET_ALLSECTION_ERROR,
  payload: error,
});

// Thunk Action to fetch all sections
let isSectionsFetched = false;

export const GetAllSectionsInitiate = () => {
  return function (dispatch) {
    if (isSectionsFetched) return;
    isSectionsFetched = true;
    dispatch(getAllSectionsStart());
    getAllSectionsApi()
      .then((res) => {
        dispatch(getAllSectionsSuccess(res));
        if (res.status === 200) {
          console.log("Response in GetAllSectionsInitiate:", res);
        }
      })
      .catch((error) => {
        dispatch(getAllSectionsError(error.message));
      });
  };
};

export default {
  GetAllSectionsInitiate,
};
