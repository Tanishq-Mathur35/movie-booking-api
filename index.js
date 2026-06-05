const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const MovieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');
const showRoutes = require('./routes/show.routes');
const paymentRoutes = require('./routes/payment.routes');

env.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('debug', true);

MovieRoutes(app);      // Invoking movie routes
theatreRoutes(app);    // Invoking theatre routes
authRoutes(app);       // Invoking auth routes
userRoutes(app);       // Invoking user routes
bookingRoutes(app);    // Invoking booking routes
showRoutes(app);       // Invoking show routes
paymentRoutes(app);    // Invoking payment routes

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(process.env.PORT, async () => {
    console.log(`🚀 Server started on Port ${process.env.PORT} !!`);

    try {
        if (process.env.NODE_ENV == 'production') {
            await mongoose.connect(process.env.PROD_DB_URL);
        } else {
            await mongoose.connect(process.env.DB_URL);
        }

        console.log('✅ Successfully connected to MongoDB');
    } catch (err) {
        console.log('❌ Not able to connect MongoDB', err);
    }
});
