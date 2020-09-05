/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//My API Key at OpenWeatherMap API 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=3170aa1e72eb4846226b95c50ec47f74'; //My personal API Key

//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click',showInfo);

function showInfo(){ //callback function
    const newZip = document.getElementById('zip').value; //gets user's zip code value
    const feelings = document.getElementById('feelings').value; //gets user's feeling value
getWeatherData(baseURL,newZip,apiKey)
  //Add data
  .then(function(data) {
       console.log(data);
       postData('/add',{date:d, temp:data.main.temp, content:feelings})
       updatingUI();

  })
    
}

/* function to GET Web API Data */
const getWeatherData = async(baseURL,zip,key) => {
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json(); //waiting until the website responds
        return data;
    }catch(error){
        console.log("error",error); //handling the error
    }
};

/* code we could use to make a POST request to our route */
const postData = async (url='', data={})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', //accessing the POST route we setup in server.js
        credentials: 'same-origin',
        headers: {
            //handling our data with JSON
            'Content-Type': 'application/json',
        },
       // converting data object into a string         
        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error",error); //handling the error
    }
}

/* To show data on browser */
const updatingUI = async () => {
    const request = await fetch('/all'); //wait until API responds
    try{ /* once API responds , try to show the info. to UI */
        const allData = await request.json(); //Transform into JSON

        //Showing the data to user interface
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} in Kelvins`;
        document.getElementById('content').innerHTML = `I feel: ${allData.content}`;


    }catch(error){
        /* if there's an ERROR in the TRY block, then catch it and process it */
        console.log("error",error);
    }
}