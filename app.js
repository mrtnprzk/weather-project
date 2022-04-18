//express
const express = require('express');
const app = express();
const port = 3000;

//https
const https = require('https');

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( {extended:true} ));


//routes
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')
});

app.post('/', (req, res) => {
    
    const query = req.body.cityName; //input in index.html
    const apiKey = "56622abb0167db7906a1e62d188f618c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}`;
    https.get(url, (response) =>{
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            // res.write is way how ot write more
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`)
            res.write(`<p>The weather is currently ${desc}.</p>`)
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">`)
            res.send() // res.send MUST be only once!
            
        })
    })
})

    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});