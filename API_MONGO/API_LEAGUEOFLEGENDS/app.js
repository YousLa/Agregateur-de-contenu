const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);
async function connectDB() {
    try {
        await mongoClient.connect();
        const leagueOfLegendsDatabase = mongoClient.db("leagueoflegends");
        const championsCollection = leagueOfLegendsDatabase.collection("champions");
        // const championsItem = await championsCollection.findOne();
        // ! Cursor super chiant
        // const championsCursor = await championsCollection.find();
        // console.log(championsCursor);
        // for await (champions of championsCursor) {
        //     console.log(champions);
        // }

        // * Projection
        const options = {
            projection: {
                name: 1,
                type: 1
            }
        }
        // ! On crée un tableau
        const leagueOfLegendsArray = await championsCollection.find({}, options).toArray();
        // console.log(leagueOfLegendsArray);
        for (let i = 0; i < leagueOfLegendsArray.length; i++) {
            console.log(leagueOfLegendsArray[i]);
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