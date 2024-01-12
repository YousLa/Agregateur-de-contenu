const MongoClient = require('mongodb').MongoClient;
// Classe MongoClient va nous permettre d'établir la connexion, envoyer des requêtes, etc.

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);
async function connectDB() {
    try {
        await mongoClient.connect();
        const moviesDatabase = mongoClient.db("movies");
        const imdbCollection = moviesDatabase.collection("imdb");
        // const movieItem = await imdbCollection.findOne();
        const movieCursor = await imdbCollection.find();
        // console.log(movieCursor);
        for await (movie of movieCursor) {
            console.log(movie);
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}

connectDB();

