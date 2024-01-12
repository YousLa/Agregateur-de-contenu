let dateHeureMaintenant = new Date();
let month = dateHeureMaintenant.getMonth()+1;
let date = ('0' + dateHeureMaintenant.getDate()).slice(-2);
let monthString = ('0' + month).slice(-2);
let hour = ('0' + dateHeureMaintenant.getHours()).slice(-2);
let minute = ('0' + dateHeureMaintenant.getMinutes()).slice(-2);
console.log(`Nous sommes le ${date}/${monthString}/${dateHeureMaintenant.getFullYear()} et il est ${hour}:${minute}`)