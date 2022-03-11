import { ProgramActionTypes } from "./programs.types";

const INITIAL_STATE = {
  programs: [],
  errorMessage: undefined,
};


const programsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ProgramActionTypes.FETCH_PROGRAM_DATA:
            return {
                ...state,
                programs: action.payload,
            };
        case ProgramActionTypes.FETCH_PROGRAM_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
  };
  
  export default programsReducer;