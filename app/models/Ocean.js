var _ = require('lodash');

module.exports = 

class Ocean {
    
    constructor(name) {
        this.space_sign = '□';
        this.placed_sign = '■';
        this.hit_sign = 'H';
        this.miss_sign = 'M';
        this.postionIsKeyValueIsShip = new Map();
        this.ship_count = 0;
        this.oceanDefender = [
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□']
        ];
        this.oceanAttacker = [
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□']
        ];
        this.oceanCombine = [
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□'],
            ['□','□','□','□','□','□','□','□','□','□']
        ];
    }

    ship(row, column, direction, ship){
        var default_error_msg = "The ship placement does not allow or illegal.";

        if(ship.leftForPlace <= 0) return default_error_msg;
        var size = ship.size;
        // rowArr and columnArr are use for array (start with 0)
        var rowArr = row-1; 
        var columnArr = column-1;
        
        // Check row and column is in the ocean and size also.
        if (rowArr < 1 && rowArr > 10 && columnArr < 1 && columnArr > 10) return default_error_msg;
        if(direction == "row" && columnArr + size > 10) return default_error_msg;
        else if(direction == "column" && rowArr + size > 10) return default_error_msg;

        // Create temp board.
        var ocean_temp = JSON.parse(JSON.stringify( this.oceanDefender ));
        var position = [];
        var postionIsKeyValueIsShip = new Map();
        for(var i = 0; i < size; i++) {
            // First check is this position is a space.
            if(this.isCloseToOtherOneByOne(rowArr, columnArr)) return default_error_msg;

            // Placing to temp.
            ocean_temp[rowArr][columnArr] = this.placed_sign;
            position.push([row, column]);
            
            postionIsKeyValueIsShip.set( row + " " + column , ship);
            if(direction == "row"){
                columnArr++;
                column++;
            }else if(direction == "column"){
                rowArr++;
                row++;
            }
        }
        // Everything is fine then use temp.
        this.oceanDefender = ocean_temp;
        this.oceanCombine = ocean_temp;
        this.ship_count++;
        ship.leftForPlace--;
        postionIsKeyValueIsShip.forEach((value, key) => this.postionIsKeyValueIsShip.set(`${key}`, `${value.type}`));
        return "placed";
    }

    isCloseToOtherOneByOne(rowArr, columnArr){
        // All around item and itself.
        var allIAroundAndItself = [
            _.get(this.oceanDefender, `[${rowArr}][${columnArr}]`, ''),
            _.get(this.oceanDefender, `[${rowArr}][${columnArr+1}]`, ''),
            _.get(this.oceanDefender, `[${rowArr}][${columnArr-1}]`, ''),
            _.get(this.oceanDefender, `[${rowArr+1}][${columnArr}]`, ''),
            _.get(this.oceanDefender, `[${rowArr-1}][${columnArr}]`, ''),
            _.get(this.oceanDefender, `[${rowArr+1}][${columnArr+1}]`, ''),
            _.get(this.oceanDefender, `[${rowArr-1}][${columnArr-1}]`, ''),
            _.get(this.oceanDefender, `[${rowArr+1}][${columnArr-1}]`, ''),
            _.get(this.oceanDefender, `[${rowArr-1}][${columnArr+1}]`, ''),
        ];
        return allIAroundAndItself.includes(this.placed_sign);
    }

    hitAndNoMorePlacedSignInOceanCombine(rowArr, columnArr){
        
        var itSlef = _.get(this.oceanCombine, `[${rowArr}][${columnArr}]`, '');
        // All around item.
        var allIAround = [
            _.get(this.oceanCombine, `[${rowArr}][${columnArr+1}]`, ''),
            _.get(this.oceanCombine, `[${rowArr}][${columnArr-1}]`, ''),
            _.get(this.oceanCombine, `[${rowArr+1}][${columnArr}]`, ''),
            _.get(this.oceanCombine, `[${rowArr-1}][${columnArr}]`, ''),
            _.get(this.oceanCombine, `[${rowArr+1}][${columnArr+1}]`, ''),
            _.get(this.oceanCombine, `[${rowArr-1}][${columnArr-1}]`, ''),
            _.get(this.oceanCombine, `[${rowArr+1}][${columnArr-1}]`, ''),
            _.get(this.oceanCombine, `[${rowArr-1}][${columnArr+1}]`, ''),
        ];
        return (itSlef == this.hit_sign) && !allIAround.includes(this.placed_sign);
    }

    viewOcean(ocean = this.oceanDefender){
        var result = [[' ', 1,2,3,4,5,6,7,8,9,10]];
        result[0] = result[0].join(' ');
        for(var i = 0; i < ocean.length; i++) {
            result[i+1] = i+1 + ' ' + ocean[i].join(' ');
        }
        return result;
    }

    attack(row, column){
        var msg = "";
        // Input are "Counting Number" (Start with 1)
        var rowArr = row-1; 
        var columnArr = column-1;
        
            
        if(this.ship_count <= 0){
            msg = "Game over";
        }
        else if( [this.placed_sign, this.hit_sign].includes( this.oceanDefender[rowArr][columnArr] )){
            this.oceanAttacker[rowArr][columnArr] = this.hit_sign;
            this.oceanDefender[rowArr][columnArr] = this.hit_sign;
            if(this.placed_sign == this.oceanAttacker[rowArr][columnArr]){
                msg = "Already hit";
            }else{
                msg = "Hit";
                this.ship_count--;
            }
            
            if(this.ship_count <= 0){
                msg = "Game over";
            }
            else if(this.hitAndNoMorePlacedSignInOceanCombine(rowArr, columnArr)){
                var ship_type = this.postionIsKeyValueIsShip.get( row + " " + column );
                msg = "You just sank the " + ship_type;
            }
        }else{
            this.oceanAttacker[rowArr][columnArr] = this.miss_sign;
            this.oceanDefender[rowArr][columnArr] = this.miss_sign;
            msg = "Miss";
        }
        return msg;
    }

}