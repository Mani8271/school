import * as types from "../../actions/actionTypes";
const initialState = {
  deletebusassigndetails: {
    deletedbusasign: [],
    loading: false,
  },
};
const DeleteBusassignReducer = (
  state = initialState.deletebusassigndetails,
  action
) => {
  switch (action.type) {
    case types.DELETE_BUS_ASSIGN_START:
 
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_BUS_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_BUS_ASSIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default DeleteBusassignReducer;   