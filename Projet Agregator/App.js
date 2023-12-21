let https = require('https');
let http = require('http');
let parseString = require('xml2js').parseString;

// Simple serveur Web avec Express 
// ^ On fait appel à un module Express avec la fonction require
const express = require('express');

// ^ Ici on crée une instance d'Express appelée app. Elle sera utilisée pour configurer et exécuter votre application
const app = express();

// ^ On lui dit d'utiliser pour la racine de mon site, le dossier htdoc
app.use('/', express.static(__dirname + '/htdocs'));

// ^ Met en place le moteur de rendu en ejs 
app.set('view engine', 'ejs');

// ^ Cette partie configure le serveur pour écouter les connexions sur le port 8080. Lorsque le serveur démarre, il affiche le message "Listeing ..." dans l'output'
app.listen(8080, function () {
    console.log('Listening on port 8080');
});

// ^ Quand notre application reçoit une requête de type get sur la route (/)
app.get('/', function (request, response) {
    // Fusion du ejs avec mes data
    response.render('index.ejs', dataToDisplay);
});

// Création d'un objet dataToDsiplay qui contient toutes les données qui seront fusionnée avec le template
let dataToDisplay = new Object();
dataToDisplay.feedGeekWire = new Object();
dataToDisplay.feedGeekWire.item = [];
dataToDisplay.apiWeather = new Object();
dataToDisplay.apiWeather.temperatures = [];
dataToDisplay.prof = { nom: "Rudi" };
dataToDisplay.jeuxVideo = new Object();
dataToDisplay.jeuxVideo.news = [];


// * JeuxVidéo.com
// Afficher Les News PC
// item => category = News Jeu

// Envoyer une requête de type GET à l'adresse :
// https://www.jeuxvideo.com/rss/rss-switch.xml
// Pour obtenir une réponse XML


let request = {
    "host": "www.jeuxvideo.com",
    "port": 443,
    "path": "/rss/rss-switch.xml"
};

https.get(request, receiveResponseCallback);

// console.log("requête envoyée");

function receiveResponseCallback(response) {
    // console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; });
    response.on('end', function () {
        // console.log(rawData);

        parseString(rawData, function (err, result) {
            let date = new Date(result.rss.channel[0].item[0].pubDate);

            // Extraction du jour, du mois et de l'année
            let jour = date.getDate();
            let mois = date.getMonth() + 1; // Les mois commencent à 0, donc on ajoute 1
            let annee = date.getFullYear() % 100; // On prend les deux derniers chiffres de l'année

            // Formatage avec ajout de zéros pour assurer deux chiffres pour le jour et le mois
            let jourFormat = (jour < 10) ? `0${jour}` : jour;
            let moisFormat = (mois < 10) ? `0${mois}` : mois;

            // Affichage de la date au format DD-MM-YY
            let dateFormatee = `${jourFormat}/${moisFormat}/${annee}`;
            console.log(dateFormatee);

            let item = {
                "title": result.rss.channel[0].item[0].title[0],
                "image": result.rss.channel[0].item[0].enclosure[0].$.url,
                "link": result.rss.channel[0].item[0].link,
                "description": result.rss.channel[0].item[0].description,
                // TODO Format date
                "date": dateFormatee,
                "createur": result.rss.channel[0].item[0]['dc:creator'][0]
            }

            dataToDisplay.jeuxVideo.news.push(item);
            console.log(dataToDisplay.jeuxVideo.news);
        });
    });
}

// * RSS

updateRSSGeekWire();
updateWeather();

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
        response.on('end', function () {
            parseString(rawData, function (err, result) {
                for (let i = 0; i < result.rss.channel[0].item.length; i++) {  // itérer les items
                    let item = {
                        "title": result.rss.channel[0].item[i].title[0],
                        "link": result.rss.channel[0].item[i].link[0],
                        "pubDate": result.rss.channel[0].item[i].pubDate[0]
                    }
                    dataToDisplay.feedGeekWire.item.push(item);
                }
            });
        });
    }
}

function updateWeather() {
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
        response.on('end', function () {
            // console.log(rawData); 
            let weather = JSON.parse(rawData);
            dataToDisplay.apiWeather.temperatures = weather.hourly.temperature_2m;
        });
    }
}

console.log(dataToDisplay);