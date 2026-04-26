const express = require("express")
const bodyParser = require("body-parser")
const env = require("dotenv")
const mongoose = require("mongoose")

const MovieRoutes = require("./routes/movie.routes")
const TheatreRoutes = require("./routes/theatre.routes")


env.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

MovieRoutes(app)    // Invoking movie routes
TheatreRoutes(app)  /// Invoking theatre routes


app.listen(process.env.PORT, async () => {
    try {
        console.log("🚀 Starting server...")

        const conn = await mongoose.connect(process.env.DB_URL)

        console.log(`✅ MongoDB Connected: ${conn.connection.name}`)
        console.log(`Server running on port ${process.env.PORT}`)
    }
    catch (error) {
        console.error(`❌ DB connection failed: ${error.message}`)
        process.exit(1)
    }
})
