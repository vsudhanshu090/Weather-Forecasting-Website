const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");

const apiKey = "5e5546a16a52d9b8a3244fcafcf55460";
const unit = "metric";
let city = "Udhampur";
let url = "https://api.openweathermap.org/data/2.5/weather?q=Udhampur&appid=5e5546a16a52d9b8a3244fcafcf55460&units=metric";

let weatherData;
let temp;
let weatherDescription;
let iconUrl;

https.get(url , function(response){

    response.on("data" , function(data){
        weatherData = JSON.parse(data);
        temp = weatherData.main.temp;
        weatherDescription = weatherData.weather[0].description;
        //icon = weatherData.weather[0].icon;
        //consticonUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    })

})


app.get("/" , function(req,res){
    res.render("index", {city: city, temp: temp, weatherDescription: weatherDescription});
})

app.post("/" , function(req,res){
    city = req.body.cityName;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

    https.get(url , function(response){

        response.on("data" , function(data){
            try {
                weatherData = JSON.parse(data);
                temp = weatherData.main.temp;
                weatherDescription = weatherData.weather[0].description;
                //icon = weatherData.weather[0].icon;
                //iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                res.render("index", {city: city, temp: temp, weatherDescription: weatherDescription});

            } catch (error) {
                console.error(error);
                res.render("error", {message: "City not found"});
            }
            
        })

    })

    
})

app.listen(3000 , function(){
    console.log("Server is running on port 3000");
})
