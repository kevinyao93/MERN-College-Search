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
        type: SchemaTypes.Decimal128
    },
    latitude: {
        type: SchemaTypes.Decimal128
    },
    locale: {
        type: Number
    },
    highest_degree: {
        type: Number
    },
    adm_rate: {
        type: SchemaTypes.Decimal128
    },
    sat_avg: {
        type: SchemaTypes.Decimal128
    },
    ccsizset: {
        type: Number
    },
    inst_url: {
        type: String
    },
    programs: {
        type: [{type: ProgramsSchema, ref: "Programs"}]
    }
});

const Schools = mongoose.model("Schools", schoolsSchema);
export default Schools;
