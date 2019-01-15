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

    shipLeftForPlace() {
      let count = 0;
      for (let ship of Object.values(this.ships)) {
        count += ship.leftForPlace;
      }
      return count;
    }

    reset(){
      for (let ship of Object.values(this.ships)) {
        ship.leftForPlace = ship.total;
      }
    }
    
  }