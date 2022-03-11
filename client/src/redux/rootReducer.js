// redux/rootReducer.js
import {combineReducers} from 'redux';

import programsReducer from './programs/programs.reducer';
import schoolsReducer from './schools/schools.reducer';

const rootReducer = combineReducers({
    programs: programsReducer,
    schools: schoolsReducer,
})

export default rootReducer