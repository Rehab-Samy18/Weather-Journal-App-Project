// Setup empty JS object to act as endpoint for all routes
projectData = {}; 

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

/* Setting our variable named server, and passing the listen method with two arguments port and a callback function.
The callback function will run when we run server.js on the terminal 
to let us know that the server is running and on which port by logging messages to the console.
*/
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})


//We need data from server so we'll initialize all route 
//   Get function //
app.get('/all',sendData);

function sendData(req,res){
    res.send(projectData);
}

// Post function //
/* it means that the app will send data to server */
app.post('/add',addData);

function addData(req,res){  //callback function
    let dataa = req.body;
    console.log(dataa); //show data coming from app 
    projectData["date"] = dataa.date;
    projectData["temp"] = dataa.temp;
    projectData["content"] = dataa.content;
    res.send(projectData);

}