/* jshint esversion: 6 */

// Class Percolation
var weightedunionfind = require('./quickunionimprovements');

var Percolation = function(value) {
    this.gridsize = 0;
    this.percolation = null;
    this.slots = [];
    this.initialize(value);
};

Percolation.prototype = function() {
    // Place for private functions.

    /* twoDto1D
     *  - If a 2D array is mapped to 1D array,
     *  and given a 2D point it gives the corresponding
     *  index in a 1D array
     * 
     * Parameters:
     *  - gridsize: The size of 2D array.
     *  - row: x coordinate
     *  - column: y coordinate
     */
    var twoDto1D = function(gridsize, row, column) {
        return gridsize * (row - 1) + column;
    };

    /* checkinput
     *  - Checks if a x,y slot exists in the grid
     * 
     * Parameters:
     *  - gridsize: The size of 2D array.
     *  - row: x coordinate
     *  - column: y coordinate
     */
    var checkinput = function(gridsize, row, column) {
        if (row <= 0 || column <= 0) {
            //console.error('The slot doesnt exist');
            return false;
        } else if (row > gridsize || column > gridsize) {
            //console.error('The slot doesnt exist');
            return false;
        }
        return true;
    };

    return {
        // Place for public functions. 

        /* initialize
         *  - Constructor that initializes the Percolation class.
         * 
         * Parameters:
         *  - gridsize
         */
        initialize: function(gridsize) {
            this.gridsize = gridsize;
            var totalblocks = gridsize * gridsize;

            // we have two extra nodes which are open by default.
            this.percolation = new weightedunionfind(gridsize * gridsize + 2);

            for (let i = 0; i <= gridsize * gridsize + 1; i += 1) {
                if (i === 0 || i === gridsize * gridsize + 1) {
                    this.slots[i] = 1;
                } else {
                    this.slots[i] = 0;
                }
            }
        },

        /* open
         *  - Opens the x,y slot in the grid for percolation.
         * 
         * Parameters:
         *  - row: x - coordinate
         *  - column: y - coordinate
         */
        open: function(row, column) {
            if (!checkinput(this.gridsize, row, column)) {
                return;
            }
            let arrayindex = twoDto1D(this.gridsize, row, column);
            this.slots[arrayindex] = 1;

            /* Here is where you need to write the logic,
             * check left or right or top or bottom exists
             * and call the union of the weightedunionfind
             */
            let top = row - 1 !== 0 ? twoDto1D(this.gridsize, row - 1, column) : 0;
            let bottom = row + 1 <= this.gridsize ? twoDto1D(this.gridsize, row + 1, column) : 0;
            let left = column - 1 !== 0 ? twoDto1D(this.gridsize, row, column - 1) : 0;
            let right = column + 1 <= this.gridsize ? twoDto1D(this.gridsize, row, column + 1) : 0;

            if (top && this.isopen(row - 1, column)) {
                this.percolation.union(top, arrayindex);
            }
            if (bottom && this.isopen(row + 1, column)) {
                this.percolation.union(bottom, arrayindex);
            }
            if (left && this.isopen(row, column - 1)) {
                this.percolation.union(left, arrayindex);
            }
            if (right && this.isopen(row + 1, column)) {
                this.percolation.union(right, arrayindex);
            }

            if (row - 1 === 0) {
                this.percolation.union(arrayindex, 0);
            }
            if (row + 1 === this.gridsize + 1) {
                this.percolation.union(arrayindex, this.slots.length - 1);
            }

        },

        /* isopen
         *  - Checks if the x,y coordniate is open in the grid
         * 
         * Parameters:
         *  - row: x - coordinate
         *  - column: y - coordniate
         */
        isopen: function(row, column) {
            let arrayindex = twoDto1D(this.gridsize, row, column);
            if (this.slots[arrayindex] === 1) {
                return true;
            }
            return false;
        },

        /* isfull
         *  - Checks if the x,y coordinate slot is closed in the grid
         * 
         * Parameters:
         *  - row: x - coordniate
         *  - column: y - coordniate
         */
        isfull: function(row, column) {
            let arrayindex = twoDto1D(this.gridsize, row, column);
            if (this.slots[arrayindex] !== 1) {
                return true;
            }
            return false;
        },

        /* percolates
         *  - Check if there is a path from top to bottom for percolation
         */
        percolates: function() {
            if (this.percolation.connected(0, this.slots.length - 1)) {
                return true;
            }
            return false;
        }

    };
}();

module.exports = Percolation;