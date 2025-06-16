import * as types from "../../../actions/actionTypes";

const initialState = {
  leaveRequestsList: [],
  loading: false,
  error: null,
};

const staffLeaveRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET ALL Leave Requests
    case types.GET_ALL_LEAVE_REQUESTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_LEAVE_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveRequestsList: action.payload,
      };
    case types.GET_ALL_LEAVE_REQUESTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ADD Leave Request
    case types.ADD_LEAVE_REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_LEAVE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveRequestsList: [...state.leaveRequestsList, action.payload],
      };
    case types.ADD_LEAVE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE Leave Request
    case types.UPDATE_LEAVE_REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_LEAVE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveRequestsList: state.leaveRequestsList.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case types.UPDATE_LEAVE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE Leave Request
    case types.DELETE_LEAVE_REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_LEAVE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveRequestsList: state.leaveRequestsList.filter(
          (item) => item._id !== action.payload
        ),
      };
    case types.DELETE_LEAVE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default staffLeaveRequestsReducer;
