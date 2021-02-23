const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);

app.listen(3000, () => {
    console.log('Well the server is listening');
});