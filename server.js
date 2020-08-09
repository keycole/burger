const express = require('express');

const PORT = process.env.PORT || 8080;
//var bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
//app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const route = require('./controllers/burgers_controller.js');

app.use(route);

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});