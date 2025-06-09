import * as types from "../../actions/actionTypes";

const initialState = {
  holidays: [], // or `data: []` depending on your shape
  loading: false,
  error: null,
};

const updateHolidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_HOLIDAY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_HOLIDAY_SUCCESS:
      return {
        ...state,
        loading: false,
        holidays: state.holidays.map((holiday) =>
          holiday._id === action.payload._id ? action.payload : holiday
        ),
      };
    case types.UPDATE_HOLIDAY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateHolidayReducer;
