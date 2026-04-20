const express = require("express")
const bodyParser = require("body-parser")
const env = require("dotenv")
const mongoose = require("mongoose")


env.config()

const app = express()

app.get("/home", (req, res) => {
    console.log("Hitting /home endpoint")
    res.json({
        msg: "Fetched home",
        success: true
    })
})


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
