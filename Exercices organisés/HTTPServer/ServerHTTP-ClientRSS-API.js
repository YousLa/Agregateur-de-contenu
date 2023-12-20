let https = require('https');
let http = require('http');
let parseString = require('xml2js').parseString;

let dataToDisplay = new Object();
dataToDisplay.feedGeekWire = new Object();
dataToDisplay.feedGeekWire.item = [];
dataToDisplay.apiWeather = new Object();
dataToDisplay.apiWeather.temperatures = [];

updateRSSGeekWire();
updateWeather();
let server = http.createServer(newClientCallback);
server.listen(8080);

function newClientCallback (request, response) { 
    console.log('New Client Connection'); 
    response.end('<html><body><h1>' + dataToDisplay.feedGeekWire.item[0].title + '</h1></body><html>');
   } 

function updateRSSGeekWire() {
    // Envoyer une requête de type GET à l'adresse :
    // https://www.geekwire.com/feed/
    // Pour obtenir une réponse XML
    let request = {
        "host": "www.geekwire.com",
        "port": 443,
        "path": "/feed/"
        };
    https.get(request, receiveResponseCallback);
    setTimeout(updateRSSGeekWire, 10000);
    
    function receiveResponseCallback(response) { 
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; }); 
        response.on('end', function() { 
            parseString(rawData, function (err, result) {
                for(let i=0; i<result.rss.channel[0].item.length ; i++){  // itérer les items
                    let item = {
                        "title": result.rss.channel[0].item[i].title[0],
                        "link" : result.rss.channel[0].item[i].link[0],
                        "pubDate": result.rss.channel[0].item[i].pubDate[0]
                    }
                    dataToDisplay.feedGeekWire.item.push(item);
                    }
                });
            });
        }
}

function updateWeather(){
    // Envoyer une requête de type GET à l'adresse :
    // https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m
    // Pour obtenir une réponse JSON
    let request = {
        "host": "api.open-meteo.com",
        "port": 443,
        "path": "/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m" 
        };
    
    https.get(request, receiveResponseCallback);
    setTimeout(updateWeather, 5000);
    
    function receiveResponseCallback(response) { 
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; }); 
        response.on('end', function() { 
            // console.log(rawData); 
            let weather = JSON.parse(rawData);
            dataToDisplay.apiWeather.temperatures = weather.hourly.temperature_2m;
            });
        }
}
