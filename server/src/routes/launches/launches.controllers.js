const e = require('express');
const {getAllLaunches,addNewLaunch,existslaunchWithId,abortLaunchById} = require('./../../models/launches.models');



function httpGetAllLaunches(req, res){
   
       return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req, res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) return res.status(400).json({ error: 'Invalid launch date'}); 

    let response =  addNewLaunch(launch);
    response.ok = true
    return res.status(201).json(response);
}

function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);   


   if(! existslaunchWithId(launchId)) return res.status(404).json({error: 'Launch not found'});


   const  aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);

}


module.exports = {
    httpGetAllLaunches ,
    httpAddNewLaunch  ,
    httpAbortLaunch
}