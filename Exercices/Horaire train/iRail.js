// Envoyer une requête de type GET à l'adresse : 
// http://api.irail.be/liveboard/?id=BE.NMBS.008812005&lang=fr&format=json
// Pour obtenir une réponse JSON

let http = require('http');
// Port HTTP 80, HTTPS 443

// On crée une variable de type objet qui va contenir 3 propriétés : host, port, path
let request = {
    // 1. Le nom de domaine
    "host": "api.irail.be",
    // 2. Le port du protocole
    "port": 80,
    // 3. Le chemin vers la ressource
    "path": "/liveboard/?id=BE.NMBS.008812005&lang=fr&format=json"
};

// A partir de l'objet https envoyer la requête vers le server qui est défini dans l'objet request
// get => est une requête HTTP pour obtenir quelque chose 
http.get(request, receiveResponseCallback);
// Ici on utilise la fonction receiveResponseCallback car NodeJS fonctionne de manière asynchrone (la requête est lancée et il fait autre chose jusqu'au moment ou il à reçu une réponse), donc on lui demande d'appeller la fonction de "callback" au moment ou il reçoit la réponse

// On reçoit un objet response
function receiveResponseCallback(response) {
    // Et on lui demande d'afficher le status code de la réponse à la requête
    console.log('Got response:' + response.statusCode);

    // On initialise la variable en string vide car on va concatèner les chunk
    let rawData = "";

    // .on => Méthode qui permet de gèrer l'évènement data/end. Donc quand il recevra quelque chose il lancera la fonction

    // Fonction fleché
    // On concatène dans rawData les chunk de données que l'on va recevoir
    response.on('data', (chunk) => { rawData += chunk; });

    // Fonction anonyme
    response.on('end', function (chunk) {
        // On affiche les données que l'on à reçu
        // console.log(rawData);

        // On crée un objet Javascript parser à partir de la variable rawData qui contient une chaîne de caractère structuré en JSON
        // La méthode .parse va analyser et vérifier si c'est bien du JSON bien formatté et convertir la chaîne de caractère en objet JavaScript (clés - valeurs)
        let SNCB = JSON.parse(rawData);

        // On affiche l'objet JSON

        // Exercice : récupèrer tous les départs :
        // ^ Heures
        // * departures => departure [] => time
        // ^ Destination
        // * departures => departure [] => station
        // ^ Retard
        // * departures => departure [] => delay


        for (let i = 0; i < SNCB.departures.departure.length; i++) {

            let time = new Date(parseInt(SNCB.departures.departure[i].time) * 1000);

            console.log("Heure de départ : " + time.getHours() + ":" + ('0' + time.getMinutes()).slice(-2) + " || Station : " + SNCB.departures.departure[i].station + " || Retard " + SNCB.departures.departure[i].delay + " || Annulé " + SNCB.departures.departure[i].canceled);

        }

        // console.log("Heure de départ : " + SNCB.departures.departure[0].time + " Station : " + SNCB.departures.departure[0].station + " Retard " + SNCB.departures.departure[0].delay);
        console.log("");
        // console.log(SNCB);
    });
};

// rawData => On reçoie une chaîne de caractère structurée en JSON

