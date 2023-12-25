import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath}from "url";
import axios from "axios";

import {dirname} from "path";
const __dirname=dirname(fileURLToPath(import.meta.url));
//const yourBearerToken = "61763f8a-f0b7-418c-849d-8e5c4166de6f";
//you can create your token from seceret API
const port=7000;
let cityname='';
const app=express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req, res) => {
  
  try {    
    cityname='Delhi';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&appid=16d041a3141b62254556926dd2cb8812&units=metric&q=${cityname}&units=metric`);
  res.render(__dirname+"/dynamic/wheather.ejs",{city:cityname,output:JSON.stringify(response.data.weather[0].main),humidity:JSON.stringify(response.data.main.humidity),temp:JSON.stringify(response.data.main.temp),wind:JSON.stringify(response.data.wind.speed)});
    
    console.log(response.data.weather[0].main);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname+"/dynamic/wheather.ejs",{
      error: error.message,
    });
  }
});

app.post("/submit", async (req, res) => {
  
  try {    
cityname=req.body.input;

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&appid=16d041a3141b62254556926dd2cb8812&units=metric&q=${cityname}`);
  res.render(__dirname+"/dynamic/wheather.ejs",{city:cityname,output:JSON.stringify(response.data.weather[0].main),humidity:JSON.stringify(response.data.main.humidity),temp:JSON.stringify(response.data.main.temp),wind:JSON.stringify(response.data.wind.speed)});
    
    console.log(response.data.weather[0].main);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname+"/dynamic/wheather.ejs",{
      error: error.message,
    });
  }
});

app.listen(port,()=>{
    console.log("serving on port = "+port);
    console.log("kyu ni chlra bhyii");
});