// server.js
import bodyParser from 'body-parser';
import express from 'express';
import router from '././routes';
import programsRouter from '././routes/programs.routes';
import schoolsRouter from '././routes/schools.routes';
import './config/mongodb.config';

const app = express();
const PORT = 8080;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api/programs', programsRouter);
app.use('/api/schools', schoolsRouter)

app.get('/', function(req, res){
  res.send('Hello ! from the Server ');
});

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});

export default app;
