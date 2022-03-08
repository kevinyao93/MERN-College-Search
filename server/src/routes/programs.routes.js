import express from 'express';
import {Programs} from '../models/programs.model';
const programsRouter = express.Router();

/* Get all Posts */
programsRouter.get('/', (req, res, next) => {
  Programs.find({} , function(err, result){
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

export default programsRouter;