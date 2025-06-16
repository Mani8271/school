import * as types from "../../../actions/actionTypes";

const initialState = {
  staffAttendanceList: [],
  loading: false,
  error: null,
};

const staffDailyAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET ALL Attendance
    case types.GET_ALL_STAFF_ATTENDANCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_STAFF_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        staffAttendanceList: action.payload,
      };
    case types.GET_ALL_STAFF_ATTENDANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ADD Attendance
    case types.ADD_STAFF_ATTENDANCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_STAFF_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        staffAttendanceList: [...state.staffAttendanceList, action.payload],
      };
    case types.ADD_STAFF_ATTENDANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE Attendance
    case types.UPDATE_STAFF_ATTENDANCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_STAFF_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        staffAttendanceList: state.staffAttendanceList.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case types.UPDATE_STAFF_ATTENDANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE Attendance
    case types.DELETE_STAFF_ATTENDANCE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_STAFF_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        staffAttendanceList: state.staffAttendanceList.filter(
          (item) => item._id !== action.payload
        ),
      };
    case types.DELETE_STAFF_ATTENDANCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default staffDailyAttendanceReducer;
