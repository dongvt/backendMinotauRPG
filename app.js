//Express and native librares
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//Import libraries
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Routes and controllers
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

//Constant variables
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_LOCAL;
const PORT = process.env.PORT || 3000;

const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const app = express();



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use(authRoutes);
app.use(gameRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URL,mongooseOptions)
    .then(result => {
        app.listen(PORT,() =>{
            console.log('Listening on port: ' + PORT)
        });
    })
    .catch(err => console.log(err));

//The MongoDB Warning (Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency) is a mongoose error, not syntax error:
//https://developer.mongodb.com/community/forums/t/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-circular-dependency/15411