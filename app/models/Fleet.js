module.exports = 

class Fleet {

    constructor(battleship, cruisers, destroyers, submarines) {
      // A set of ship
      this.ships = {
        battleship: battleship,
        cruisers: cruisers,
        destroyers: destroyers,
        submarines: submarines,
      }
    }

    leftShip() {
      let count = 0;
      for (let ship of Object.values(this.ships)) {
        count += ship.left;
      }
      return count;
    }

    reset(){
      for (let ship of Object.values(this.ships)) {
        ship.left = ship.total;
      }
    }
    
  }