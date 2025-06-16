import * as types from "../../actions/actionTypes";

const initialState = {
  allbusaasigndata: {
    busassign: [],  // Array to store classes
    loading: false,  // State to track loading
    error: null,  // State to track errors
  },
};

const GetAllBusassignReducer = (state = initialState.allbusaasigndata, action) => {
  switch (action.type) {
    case types.GET_ALL_BUS_ASSIGN_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,  
      };
    case types.GET_ALL_BUS_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        busassigned: action.payload,  // Store fetched classes
      };
    case types.GET_ALL_BUS_ASSIGN_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Store any error message
      };
    default:
      return state;
  }
};

export default GetAllBusassignReducer;
