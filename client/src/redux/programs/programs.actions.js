import { ProgramActionTypes } from "./programs.types";
import axios from "axios";

export const fetchProgramSucess = programs => ({
    type: ProgramActionTypes.FETCH_PROGRAM_DATA,
    payload: programs,
});

export const fetchProgramError = error => ({
    type: ProgramActionTypes.FETCH_PROGRAM_ERROR,
    payload: error
  });
  

export const fetchProgramStartAsync = () => {
    return dispatch => {
        axios
        .get("http://localhost:8080/api/programs")
        .then(response => dispatch(fetchProgramSucess(response.data.data)))
        .catch(error => dispatch(fetchProgramError(error)));
    };
};
  