// schools.model.js
import mongoose from 'mongoose';
import {ProgramsSchema} from './programs.model';

var SchemaTypes = mongoose.Schema.Types;
const schoolsSchema = new mongoose.Schema({
    institution: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    locale: {
        type: Number
    },
    highest_degree: {
        type: Number
    },
    adm_rate: {
        type: Number
    },
    sat_avg: {
        type: Number
    },
    ccsizset: {
        type: Number
    },
    inst_url: {
        type: String
    },
    programs: {
        type: [{type: String, ref: "Programs"}]
    }
});

const Schools = mongoose.model("Schools", schoolsSchema);
export default Schools;
