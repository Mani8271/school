import * as types from "../../../actions/actionTypes";

const initialState = {
  timetableList: [],
  loading: false,
  error: null,
};

const teachersTimetableReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET ALL Timetable
    case types.GET_ALL_TEACHERS_TIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList:action.payload ,
      };
    case types.GET_ALL_TEACHERS_TIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ADD Timetable
    case types.ADD_TEACHERS_TIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: [...state.timetableList, action.payload],
      };
    case types.ADD_TEACHERS_TIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE Timetable
    case types.UPDATE_TEACHERS_TIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: state.timetableList.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case types.UPDATE_TEACHERS_TIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE Timetable
    case types.DELETE_TEACHERS_TIMETABLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_TEACHERS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: state.timetableList.filter(
          (item) => item._id !== action.payload
        ),
      };
    case types.DELETE_TEACHERS_TIMETABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teachersTimetableReducer;
