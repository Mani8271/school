import * as types from "../../../actions/actionTypes";

const initialState = {
  timetableList: [],
  loading: false,
  error: null,
  success: false,
};

const teachersTimetableReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TEACHERS_TIMETABLE_START:
    case types.ADD_TEACHERS_TIMETABLE_START:
    case types.UPDATE_TEACHERS_TIMETABLE_START:
    case types.DELETE_TEACHERS_TIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case types.GET_ALL_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: action.payload,
        success: true,
      };

    case types.ADD_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: [...state.timetableList, action.payload],
        success: true,
      };

    case types.UPDATE_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: state.timetableList.map((item) =>
          item._id === action.payload.timetable._id ? action.payload.timetable : item
        ),
        success: true,
      };

    case types.DELETE_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: state.timetableList.filter((item) => item._id !== action.payload),
        success: true,
      };

    case types.GET_ALL_TEACHERS_TIMETABLE_ERROR:
    case types.ADD_TEACHERS_TIMETABLE_ERROR:
    case types.UPDATE_TEACHERS_TIMETABLE_ERROR:
    case types.DELETE_TEACHERS_TIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default teachersTimetableReducer;