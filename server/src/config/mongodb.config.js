import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Programs} from '../models/programs.model';
import Schools from '../models/schools.model';
const fs = require('fs');
const path = require('path');

dotenv.config();

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0
};

// mongodb environment variables
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const dbConnectionURL = {
     'LOCAL_DB_URL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
     'REMOTE_DB_URL': process.env.MONGODB_URI  //atlas url
};
mongoose.connect(dbConnectionURL.LOCAL_DB_URL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
let program_data = fs.readFileSync(path.resolve('data', "programs.json"))
let programs = JSON.parse(program_data)
Programs.find({}, function (err, result) {
  let jsonData = result
  for (let i = 0; i < jsonData.length; i++) {
    let program = jsonData[i]
    Programs.findByIdAndDelete(program._id, function(err, res) {
      //console.log(res);
    })
  }
})
let new_programs = []
for (let key in programs) {
  let newProgram = {
    program_id: key,
    description: programs[key]
  };
  new_programs.push(newProgram);
}
db.once('open', () => {
     Programs.insertMany(new_programs);
})

let school_data = fs.readFileSync(path.resolve('data', "ma_schools.json"));
let schools = JSON.parse(school_data);
Schools.find({}, function (err, result) {
  let jsonData = result
  for (let i = 0; i < jsonData.length; i++) {
    let school = jsonData[i]
    Schools.findByIdAndDelete(school._id, function(err, res) {
      //console.log(res);
    })
  }
})

let new_schools = []
for (let i = 0; i < schools.length; i++) {
  let school = schools[i]
  let newSchool = {
    institution: school["INSTNM"],
    state: school["STABBR"],
    city: school["CITY"],
    zip: school["ZIP"],
    longitude: school["LONGITUDE"] != "NULL" ? +(school["LONGITUDE"]) : null,
    latitude: school["LATITUDE"] != "NULL" ? +(school["LATITUDE"]) : null,
    locale: school["LOCALE"] != "NULL" ? parseInt(school["LOCALE"]): null,
    highest_degree: school["HIGHDEG"] != "NULL" ? parseInt(school["HIGHDEG"]): null,
    adm_rate: school["ADM_RATE"] != "NULL" ? +(school["ADM_RATE"]): null,
    sat_avg: school["SAT_AVG"] != "NULL" ? +(school["SAT_AVG"]): null,
    ccsizset: school["CCSIZSET"] != "NULL" ? parseInt(school["CCSIZSET"]): null,
    inst_url: school["INSTURL"],
    programs: school["PROGRAMS"],
  }
  new_schools.push(newSchool);
}


db.once('open', () => {
     // we're connected !
     Schools.insertMany(new_schools);
     console.log('Mongodb Connection Successful');
});

export default db;