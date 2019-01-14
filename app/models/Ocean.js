var _ = require('lodash');

module.exports = 

class Ocean {
    
    constructor(name) {
        this.space_sign = '□';
        this.placed_sign = '■';
        this.hit_sign = 'H';
        this.miss_sign = 'M';
        this.ocean = [
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

        if(ship.left <= 0) return default_error_msg;
        var size = ship.size;
        // Input are "Counting Number" (Start with 1)
        row-=1; column-=1;
        
        // Check row and column is in the ocean and size also.
        if (row < 1 && row > 10 && column < 1 && column > 10) return default_error_msg;
        if(direction == "row" && column + size > 10) return default_error_msg;
        else if(direction == "column" && row + size > 10) return default_error_msg;

        // Create temp board.
        var ocean_temp = JSON.parse(JSON.stringify( this.ocean ));
        for(var i = 0; i < size; i++) {
            // First check is this position is a space.
            if(this.isCloseToOtherOneByOne(row, column)) return default_error_msg;

            // Placing to temp.
            ocean_temp[row][column] = this.placed_sign;
            if(direction == "row"){
                column++;
            }else if(direction == "column"){
                row++;
            }
        }
        // Everything is fine then use temp.
        this.ocean = ocean_temp;
        ship.left--;
        return "placed";
    }

    isCloseToOtherOneByOne(row, column){
        // All around item and itself.
        var allIAroundAndItself = [
            _.get(this.ocean, `[${row}][${column}]`, ''),
            _.get(this.ocean, `[${row}][${column+1}]`, ''),
            _.get(this.ocean, `[${row}][${column-1}]`, ''),
            _.get(this.ocean, `[${row+1}][${column}]`, ''),
            _.get(this.ocean, `[${row-1}][${column}]`, ''),
            _.get(this.ocean, `[${row+1}][${column+1}]`, ''),
            _.get(this.ocean, `[${row-1}][${column-1}]`, ''),
            _.get(this.ocean, `[${row+1}][${column-1}]`, ''),
            _.get(this.ocean, `[${row-1}][${column+1}]`, ''),
        ];
        return allIAroundAndItself.includes(this.placed_sign);
    }

    viewOcean(board = this.ocean){
        var result = [];
        for(var i = 0; i < board.length; i++) {
            result[i] = board[i].join(' ');
        }
        return result;
    }

}