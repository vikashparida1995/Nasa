const express = require('express');
const launchesRouter = express.Router();    

const launchesControllers = require('./launches.controllers');


launchesRouter.get('/launches',launchesControllers.httpGetAllLaunches );

launchesRouter.post('/launches',launchesControllers.httpAddNewLaunch);

launchesRouter.delete('/launches/:id',launchesControllers.httpAbortLaunch)

module.exports = launchesRouter;