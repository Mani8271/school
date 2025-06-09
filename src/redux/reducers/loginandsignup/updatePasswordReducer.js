import * as types from "../../actions/actionTypes";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const updatePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_PASSWORD_START:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case types.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updatePasswordReducer;
