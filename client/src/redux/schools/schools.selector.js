import { createSelector } from "reselect";

const selectSchool = state => state.schools;

export const selectSchools = createSelector(
  [selectSchool],
  school => school.schools
);
