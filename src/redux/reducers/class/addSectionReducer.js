import * as types from "../../actions/actionTypes";

const initialState = {
  sectiondetails: {
    sections: [],
    loading: false,
    error: null,
  },
};

const AddSectionReducer = (state = initialState.sectiondetails, action) => {
  switch (action.type) {
    case types.ADD_SECTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        // Optionally add the new section to the list
        // sections: [...state.sections, action.payload],
      };
    case types.ADD_SECTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AddSectionReducer;
