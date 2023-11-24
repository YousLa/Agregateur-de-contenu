// Réaliser un programme qui affiche la date et l'heure dans la console dans un format : "Nous somme le dd/mm/aaaa et il est hh:mm"

let date = new Date();

console.log("Nous sommes le " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " et il est " + date.getHours() + ":" + date.getMinutes());