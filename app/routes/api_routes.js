var Ocean = require('../models/Ocean');
var Ship = require('../models/Ship');
var Fleet = require('../models/Fleet');
module.exports = function(app, db) {

    var battleship  = new Ship("battleship", 4, 1);
    var cruisers    = new Ship("cruisers", 3, 2);
    var destroyers  = new Ship("destroyers", 2, 3);
    var submarines  = new Ship("submarines", 1, 4);
    var fleet = new Fleet(battleship, cruisers, destroyers, submarines);
    var ocean = new Ocean("pacific");

    app.get('/', (req, res) => {
      res.json({ message: "debug", ocean: ocean.viewOcean(), left_ship: fleet.leftShip(), fleet: fleet });
    });

    app.get('/reset', (req, res) => {
      ocean = new Ocean("pacific");
      fleet.reset();
      res.json({ message: "Reset successfuled", ocean: ocean.viewOcean(), left_ship: fleet.leftShip(), fleet: fleet });
    });

    app.post('/ship', (req, res) => {
      var ship_type = req.body.ship_type;
      var ship = fleet.ships[ship_type];
      var msg = ocean.ship(req.body.row, req.body.column, req.body.direction, ship);
      if(msg.startsWith("placed")){
        msg = msg + " " + ship.type;
        res.json({ message: msg, ocean: ocean.viewOcean(), left_ship: fleet.leftShip(), fleet: fleet });
      }
      else{
        res.statusMessage = msg;
        res.status(400).end();
      }
    });

    app.post('/attack', (req, res) => {
      res.json({ message: 'api/ship', req: req.body.msg });
    });

  };