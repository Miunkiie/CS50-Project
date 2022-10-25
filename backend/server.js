/* Controller for the App */

// Handles our routing within the app
const express = require('express');
// Allows us to use environment variables within the application
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')

const port = process.env.PORT || 5000;

// Ultility to change the color of the terminal text. Easier to differentiate.
const colors = require('colors');

connectDB();

// Init express
const app = express();

// Allows our app to parse through the request's body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/", require("./routes/productRoutes"))

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`.yellow.bold));