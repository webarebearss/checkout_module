const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

let port = 3000;

app.listen(port, function() {
  console.log(`listening on post ${port}`);
});