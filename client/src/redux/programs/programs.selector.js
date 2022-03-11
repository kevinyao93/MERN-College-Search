import { createSelector } from "reselect";

const selectProgram = state => state.programs;

export const selectPrograms = createSelector(
  [selectProgram],
  program => program.programs
);
