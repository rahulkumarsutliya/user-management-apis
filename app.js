const express = require('express');
require('dotenv').config();
const connectDb = require('./config/db');
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const subcategoryRoute = require('./routes/subcategoryRoute');
const app = express();


connectDb();
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/profile',profileRoute);
app.use('/api/address',addressRoute);
app.use('/api/category',categoryRoute);
app.use('/api/sub-category',subcategoryRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} successfully `);
});

