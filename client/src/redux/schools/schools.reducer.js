import { SchoolActionTypes } from "./schools.types";

const INITIAL_STATE = {
  schools: [],
  errorMessage: undefined,
};


const schoolsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SchoolActionTypes.FETCH_SCHOOL_DATA:
            return {
                ...state,
                schools: action.payload,
            };
        case SchoolActionTypes.FETCH_SCHOOL_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
  };
  
  export default schoolsReducer;