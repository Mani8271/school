import * as types from "../../actions/actionTypes"; // Adjust path if needed

const initialState = {
  notifications: [], // Array to store notifications
  loading: false,    // Track loading state
  error: null,       // Store any error
};

const GetAllNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_NOTIFICATIONS_START:
      return {
        ...state,
        loading: true,
        error: null, // Reset error on start
      };
    case types.GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload, // Save fetched notifications
      };
    case types.GET_ALL_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set error message
      };
    default:
      return state;
  }
};

export default GetAllNotificationsReducer;