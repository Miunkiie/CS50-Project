const mongoose = require('mongoose')

// Setup the connection to our database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo Connect: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB