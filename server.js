var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
appRoutes = require('./app/routes');
appRoutes(router, {});

// Prefixed with /api
app.use('/api', router);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('listen to ' + port);
});