const express = require('express');
const userRoute = require('./routes/user');
const bookRoute = require('./routes/book');
const favRoute = require('./routes/favourite');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

const cors = require('cors');
require('dotenv').config();

const app = express();
const {conn} = require('./connection/connection');

app.use(cors());
app.use(express.json());

conn();
app.use('/api/bookstore',userRoute);
app.use('/api/bookstore',bookRoute);
app.use('/api/bookstore',favRoute);
app.use('/api/bookstore',cartRoute);
app.use('/api/bookstore',orderRoute);


app.listen(process.env.PORT,() => console.log(`server started ${process.env.PORT}`));
