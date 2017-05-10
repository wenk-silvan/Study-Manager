//This script was created to initialize a new windows service for this application.
//Run this script with 'node StudyManagerService.js' to run this application as windows service.

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'StudyManager',
  description: 'This application helps to organize studying on different subjects.',
  script: 'index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();