import { SchoolActionTypes } from "./schools.types";
import axios from "axios";

export const fetchSchoolsSuccess = schools => ({
    type: SchoolActionTypes.FETCH_SCHOOL_DATA,
    payload: schools,
});

export const fetchSchoolsFailure = error => ({
    type: SchoolActionTypes.FETCH_SCHOOL_ERROR,
    payload: error
  });
  

export const fetchSchoolsStartAsync = () => {
    return dispatch => {
        axios
        .get("http://localhost:8080/api/schools")
        .then(response => dispatch(fetchSchoolsSuccess(response.data.data)))
        .catch(error => dispatch(fetchSchoolsFailure(error)));
    };
};
  