/*jshint esversion: 6 */
var Constructor = function() {
    this.id = [];
};

Constructor.prototype = function() {
    var root = function(array, i) {
        while (array[i] !== i) {
            i = array[i];
        }
        return i;
    };
    return {
        initialize: function(n) {
            try {
                if (!Number.isInteger(n)) {
                    throw new Error("Not a number");
                }
            } catch (error) {
                console.error("Error: ", error.message);
            }
            for (var i = 0; i < n; i += 1) {
                this.id[i] = i;
            }
        },
        connected: function(a, b) {
            if (root(this.id, a) === root(this.id, b)) {
                return true;
            }
            return false;
        },
        union: function(a, b) {
            let i = root(this.id, a);
            let j = root(this.id, b);
            if (i > j) {
                this.id[j] = i;
            } else {
                this.id[i] = j;
            }
        },

        commonroot: function(a, b) {
            let roota = root(this.id, a);
            let rootb = root(this.id, b);
            if (roota === rootb) {
                return roota;
            } else {
                console.log("No common root");
            }
        },
    };
}();

module.exports = new Constructor();