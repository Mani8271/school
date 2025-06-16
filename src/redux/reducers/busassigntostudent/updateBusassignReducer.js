import * as types from "../../actions/actionTypes";
const initialState = {
  updatedbusassigndetails: {
    updatedbusassign: [],
    loading: false,
  },
};
const UpdatebusassignReducer = (
  state = initialState.updatedbusassigndetails,
  action
) => {
  switch (action.type) {
    case types.UPDATE_BUS_ASSIGN_START:
     
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_BUS_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_BUS_ASSIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UpdatebusassignReducer;