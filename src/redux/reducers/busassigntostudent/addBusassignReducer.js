import * as types from "../../actions/actionTypes";
const initialState = {
  busassigndetails: {
    busassign: [],
    loading: false,
  },
};
const AddBusassignReducer = (
  state = initialState.busassigndetails,
  action
) => {
  switch (action.type) {
    case types.ADD_BUS_ASSIGN_START:
      
      return {
        ...state,
        loading: true,
      };
    case types.ADD_BUS_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_BUS_ASSIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AddBusassignReducer;