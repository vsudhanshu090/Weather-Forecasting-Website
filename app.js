// const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/" , function(req,res){
    const city = req.body.cityName;
    const apiKey = "5e5546a16a52d9b8a3244fcafcf55460";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            
            res.write("<h1>CITY : " + city + "</h1>")
            res.write("<p>Current weather description is : " + weatherDescription + "</p>");
            res.write("<h1>Temperature is : " + temp + " degrees celsius.</h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
            
        })
    })

})



app.listen(3000 , function(){
    console.log("Server is running on port 3000");
})