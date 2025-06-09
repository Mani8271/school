import * as types from "../../actions/actionTypes";

const initialState = {
  sectiondetails: {
    sections: [],
    loading: false,
    error: null,
  },
};

const DeleteSectionReducer = (state = initialState.sectiondetails, action) => {
  switch (action.type) {
    case types.DELETE_SECTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        // Remove the deleted section from the list
        sections: state.sections.filter(section => section._id !== action.payload._id),
      };
    case types.DELETE_SECTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteSectionReducer;
