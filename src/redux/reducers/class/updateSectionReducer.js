import * as types from "../../actions/actionTypes";

const initialState = {
  sectionDetails: {
    sections: [],
    loading: false,
    error: null,
  },
};

const EditSectionReducer = (state = initialState.sectionDetails, action) => {
  switch (action.type) {
    case types.UPDATE_SECTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        // Update the section in the array
        sections: state.sections.map((sectionItem) =>
          sectionItem._id === action.payload._id ? action.payload : sectionItem
        ),
      };
    case types.UPDATE_SECTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EditSectionReducer;
