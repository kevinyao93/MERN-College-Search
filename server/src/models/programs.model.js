// Programs.model.js
import mongoose from 'mongoose';
const ProgramsSchema = new mongoose.Schema({
   program_id: {
       type: String,
       required: true
   },
   description: {
       type: String
   },
});

const Programs = mongoose.model("Programs", ProgramsSchema);
export {Programs, ProgramsSchema};
