// Calculer le nombre de jours qui séparent deux dates

let date1 = new Date(2022, 4, 5, 12, 0, 0, 0);
let date2 = new Date(2023, 4, 5, 12, 0, 0, 0);

console.log('Entre le ' + date1 + ' et le ' + date2 + ' il y a ' + (date2 - date1) + ' milli-secondes, soit ' + (date2 - date1) / (24 * 60 * 60 * 1000) + ' jours.');