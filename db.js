const mongoose = require('mongoose');
// database connection to MongoDb in asyncronous function, to circumvent problems arising from the asyncrous javascript syntax.
module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // as stated in Mongoose 6.0.12 docs, the above are always used, but still included here for my own understanding
        }
        await mongoose.createConnection(process.env.DB, connectionParams)
        console.log("Connected to database.")
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database.")
    }
}