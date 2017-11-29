/*jshint esversion: 6 */
var Constructor = function() {
    this.id = [];
};

Constructor.prototype.initialize = function(n) {
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
};

Constructor.prototype.isconnected = function(a, b) {
    return this.id[a] === this.id[b];
};

Constructor.prototype.union = function(a, b) {
    let vala = this.id[a];
    let valb = this.id[b];
    for (let i = 0; i < this.id.length; i += 1) {
        if (this.id[i] === vala) {
            this.id[i] = valb;
        }
    }
}

module.exports = Constructor;



/*
var quickfind = Object.create(Object.prototype, {
    id: [],
    initialize: function(n) {
        try {
            if (!Number.isInteger(n)) {
                throw new Error("Not a number");
            }
        } catch (error) {
            console.error("Log: ", error.message);
        }
        for (let i = 0; i < n; i += 1) {
            id.push(i);
        }
    },
    isconnected: function(a, b) {
        let array = this.id;
        return array[a] === array[b];
    }
});

console.log(quickfind);

module.exports = quickfind;
*/