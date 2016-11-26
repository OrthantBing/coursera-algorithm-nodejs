/* jshint esversion: 6 */
var Constructor = function(value) {
    this.id = [];
    this.sz = [];
    this.initialize(value);
};

Constructor.prototype = function() {

    // This is one of the ways we can mimic private functions in javascript.
    var root = function(array, value) {
        while (array[value] != value) {
            value = array[value];
        }
        return value;
    };

    return {
        initialize: function(n) {
            try {
                if (!Number.isInteger(n)) {
                    throw new Error("Error: The value is not an integer");
                }
            } catch (err) {
                console.error(err);
            }
            for (let i = 0; i < n; i += 1) {
                this.id[i] = i;
                this.sz[i] = 1;
            }
        },

        find: function(value) {
            while (this.id[value] !== value) {
                value = this.id[value];
            }
            return value;
        },

        connected: function(a, b) {
            return root(this.id, a) === root(this.id, b);
        },

        union: function(a, b) {
            let i = root(this.id, a);
            let j = root(this.id, b);
            if (i === j) return;
            if (this.sz[i] < this.sz[j]) {
                this.id[i] = j;
                this.sz[j] += this.sz[i];
            } else {
                this.id[j] = i;
                this.sz[i] += this.sz[j];
            }
        }

    };
}();

module.exports = Constructor;