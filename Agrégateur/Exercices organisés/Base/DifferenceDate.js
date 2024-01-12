let dateNaissance = new Date(1991, 4, 30);
let dateAujourdhui = new Date();
let differenceMSEntreDates = dateAujourdhui - dateNaissance;
let age = Math.floor(differenceMSEntreDates / (1000*60*60*24*365.25));
console.log(age);