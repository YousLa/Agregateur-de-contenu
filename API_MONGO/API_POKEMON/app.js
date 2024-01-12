const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);
async function connectDB() {
    try {
        await mongoClient.connect();
        const pokemonDatabase = mongoClient.db("pokemon");
        const pokemonCollection = pokemonDatabase.collection("pokemon");
        // const pokemonItem = await pokemonCollection.findOne();
        const pokemonCursor = await pokemonCollection.findOne();
        // console.log(pokemonCursor);
        for await (pokemon of pokemonCursor) {
            console.log(pokemon);
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