const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt1 = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors());

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt1());
app.use(errorHandler);


//Routes
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const authJwt = require('./helpers/jwt');


const api = process.env.API_URL;

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
}).then(() => {
        console.log('Connected to DB');
})
.catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log(api);
    console.log("server is running http://localhost:3000");
})