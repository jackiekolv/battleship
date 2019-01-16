// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OceanLog   = new Schema({
    attack_count  : Number,
    miss_count : Number,
    oceanDefender : [[String]],
    oceanAttacker : [[String]],
    oceanCombine : [[String]]
});
module.exports = mongoose.model('OceanLog', OceanLog);