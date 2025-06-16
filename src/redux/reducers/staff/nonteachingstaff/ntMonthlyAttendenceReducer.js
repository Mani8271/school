import * as types from "../../../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const NonTeachingMonthlyAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NON_TEACHING_MONTHLY_ATTENDANCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_NON_TEACHING_MONTHLY_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case types.GET_NON_TEACHING_MONTHLY_ATTENDANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default NonTeachingMonthlyAttendanceReducer;