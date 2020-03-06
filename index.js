const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const router = require('./app/router');

const PORT = process.env.PORT || 3000;

// rend disponibles les données envoyées par l'utilisateur, via req.body
app.use(express.urlencoded({
  extended: true
}));

const magicMw = require('../my_modules/sanitize');
app.use(magicMw);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});