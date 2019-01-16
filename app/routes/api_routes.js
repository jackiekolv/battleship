var Ocean = require('../models/Ocean');
var Ship = require('../models/Ship');
var Fleet = require('../models/Fleet');
var OceanLog     = require('../models/OceanLog');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:Passw0rd@ds123173.mlab.com:23173/jackiekolv');

module.exports = function(app, db) {

  var battleship  = new Ship("battleship", 4, 1);
  var cruisers    = new Ship("cruisers", 3, 2);
  var destroyers  = new Ship("destroyers", 2, 3);
  var submarines  = new Ship("submarines", 1, 4);
  // var battleship  = new Ship("battleship", 4, 0);
  // var cruisers    = new Ship("cruisers", 3, 0);
  // var destroyers  = new Ship("destroyers", 2, 1);
  // var submarines  = new Ship("submarines", 1, 0);
    var fleet = new Fleet(battleship, cruisers, destroyers, submarines);
    var ocean = new Ocean("pacific");


    app.get('/', (req, res) => {
      res.json(
          {
            message: "debug", 
            oceanCombine: ocean.viewOcean(ocean.oceanCombine), 
            shipLeftForPlace: fleet.shipLeftForPlace(), 
            shipCountInOcean: ocean.ship_count,
            fleet: fleet 
          }
        );
    });

    app.get('/reset', (req, res) => {
      ocean = new Ocean("pacific");
      fleet.reset();
      res.json(
        { 
          message: "Reset successfuled", 
          ocean: ocean.viewOcean(), 
          shipLeftForPlace: fleet.shipLeftForPlace(), 
          shipCountInOcean: ocean.ship_count,
          fleet: fleet 
        }
      );
    });

    app.post('/ship', (req, res) => {
      var ship_type = req.body.ship_type.toLowerCase();
      var ship = fleet.ships[ship_type];
      var msg = ocean.ship(req.body.row, req.body.column, req.body.direction, ship);
      if(msg.startsWith("placed")){
        res.json( 
          { 
            message: msg, 
            ocean: ocean.viewOcean(ocean.oceanDefender), 
            shipLeftForPlace: fleet.shipLeftForPlace(), 
            shipCountInOcean: ocean.ship_count,
            fleet: fleet 
          }
        );
      }
      else{
        res.statusMessage = msg;
        res.status(400).end();
      }
      ocean.log();
    });

    app.post('/attack', (req, res) => {
      var row = req.body.row;
      var column = req.body.column;
      var msg = "";
      if(fleet.shipLeftForPlace() > 0){
        msg = "unauthorized, place all ship first.";
      }else{
        msg = ocean.attack(row, column);
      }
      var attack_count, miss_count;
      if(msg == "Game over") {
        attack_count = ocean.attack_count;
        miss_count = ocean.miss_count;
      }
      if(msg == "bad request"){
        res.statusMessage = msg;
        res.status(400).end();
      }else{
        res.json({ 
          message: msg, 
          attack_count: attack_count,
          miss_count: miss_count,
          ocean: ocean.viewOcean(ocean.oceanAttacker)
        });
      }
      ocean.log();
    });

  };