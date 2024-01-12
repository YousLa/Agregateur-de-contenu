const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);
async function connectDB() {
    try {
        await mongoClient.connect();
        const leagueOfLegendsDatabase = mongoClient.db("leagueoflegends");
        const championsCollection = leagueOfLegendsDatabase.collection("champions");
        // const championsItem = await championsCollection.findOne();
        const championsCursor = await championsCollection.find();
        console.log(championsCursor);
        for await (champions of championsCursor) {
            console.log(champions);
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