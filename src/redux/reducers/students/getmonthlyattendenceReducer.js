import * as types from "../../actions/actionTypes";

const initialState = {
  monthlyAttendance: {
    data: [],
    loading: false,
    error: null,
  },
};

const StudentMonthlyAttendanceReducer = (
  state = initialState.monthlyAttendance,
  action
) => {
  switch (action.type) {
    case types.GET_STUDENT_MONTHLY_ATTENDANCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_STUDENT_MONTHLY_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        
      };

    case types.GET_STUDENT_MONTHLY_ATTENDANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default StudentMonthlyAttendanceReducer;