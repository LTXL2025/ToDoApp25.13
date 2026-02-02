// ---------------------------↓ SETTING UP DEPENDENCIES ↓ -----------------------------------------

const express = require("express"); //enables the use of Express.js
const cors = require("cors"); //Enable Cross Origin Resource Sharing
const mongoose = require("mongoose"); //Enables us to connect and interact with the database
// ---------------------------↓ iNITIAL APP CONFIGURATION ↓ -----------------------------------------
const port = 3000; //Uses port number on device to serve the backend
const app = express(); //using express.js to power our application or server
// ---------------------------↓ MIDDLEWARE SETUP ↓ -----------------------------------------

app.use(express.json()); //uses express in JSON format

const corsOptions = {
    origin: "https://to-do-app25-13-lac.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
};

app.use(cors("*")); //Enables use of CORS - * means every domain is now allowed access this server to send and receive data - not secure

// -----------------------ROUTES ------------------------------------------

const taskRoutes = require("./route/taskRoutes");
app.use("/api/tasks", taskRoutes);

// ---------------------------↓ DATABASE CONNECTION + APP STARTUP ↓ -----------------------------------------
//Immediately Invoked Function Expression (IIFE)

(async()=>{
    try {
        mongoose.set("autoIndex", false);
        const Task = require("./models/task");

        await mongoose.connect("mongodb+srv://loanle001122_db_user:T0XaNVqOX3h3TaDy@to-do-app-2513.9xmtynp.mongodb.net/?appName=to-do-app-2513");
        console.log("Database connected");

        await Task.syncIndexes();
        console.log(`Indexes created!`);

        app.listen(port, () => {
            console.log(`To Do App is live on port ${port}`);
        });
    } catch (err) {
        console.error("Startup Error:", err);
        process.exit(1);
    }
    
})();

