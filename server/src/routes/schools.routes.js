import express from 'express';
import Schools from '../models/schools.model';
const schoolsRouter = express.Router();

/* Get all Posts */
schoolsRouter.get('/', (req, res, next) => {
  Schools.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});

/* Add Single Program */
schoolsRouter.post("/", (req, res, next) => {
  let new_school = {
    program_id: req.body.program_id,
    description: req.body.description
  };
   Schools.create(new_school, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "Program created successfully"
      });
  });
});

/* Delete Single Program */
schoolsRouter.delete("/:programs_id", (req, res, next) => {
  Programs.findByIdAndDelete(req.params.id, function(err, result){
    if(err){
      res.status(400).send({
        success: false,
        error: err.message
      });
    }
    res.status(200).send({
      success: true,
      data: result,
      message: "Post deleted successfully"
    });
  });
});

export default schoolsRouter;