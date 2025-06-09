import * as types from "../../actions/actionTypes";

const initialState = {
  sectiondetails: {
    sections: [],       // Array to store all sections
    loading: false,     // Loading state
    error: null,        // Error state
  },
};

const GetAllSectionsReducer = (state = initialState.sectiondetails, action) => {
  switch (action.type) {
    case types.GET_ALLSECTION_START:
      return {
        ...state,
        loading: true,
        error: null, // Reset error when fetching starts
      };
    case types.GET_ALLSECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        sections: action.payload, // Store fetched sections
      };
    case types.GET_ALLSECTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload, // Store error message
      };
    default:
      return state;
  }
};

export default GetAllSectionsReducer;
