import * as types from "../../actions/actionTypes";

const initialState = {
  holidays: [],
  loading: false,
  error: null,
};

const GetAllHolidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_HOLIDAY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_HOLIDAY_SUCCESS:
      return {
        ...state,
        loading: false,
        holidays: action.payload,
      };
    case types.GET_HOLIDAY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default GetAllHolidayReducer;
