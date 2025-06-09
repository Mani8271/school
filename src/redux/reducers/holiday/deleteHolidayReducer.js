import * as types from "../../actions/actionTypes";

const initialState = {
  holidays: [],
  loading: false,
  error: null,
};

const DeleteHolidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_HOLIDAY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_HOLIDAY_SUCCESS:
      return {
        ...state,
        loading: false,
        holidays: state.holidays.filter(holiday => holiday._id !== action.payload),
      };
    case types.DELETE_HOLIDAY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteHolidayReducer;
