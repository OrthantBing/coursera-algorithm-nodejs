/* jshint esversion: 6 */
var assert = require('assert');
var expect = require('expect.js');

var Percolation = require('../quiz.js');

describe('Quiz functionality : sequential openening left', function() {
    var obj = new Percolation(4);
    it('test initialize', function(done) {
        assert.equal(obj.gridsize, 4);
        assert.equal(obj.slots.length, 18);
        assert.equal(obj.percolation.id.length, 18);
        assert.equal(obj.percolation.sz.length, 18);
        assert.equal(obj.percolation.find(4), 4);
        assert.equal(obj.percolation.connected(3, 4), false);
        done();
    });

    it('Testing open module - case: open (1,1)', function() {
        obj.open(1, 1);
        assert.equal(obj.isopen(1, 1), true);
        assert.equal(obj.isfull(1, 1), false);
        assert.equal(obj.percolation.connected(1, 0), true);
        assert.equal(obj.percolation.connected(1, 2), false);
    });

    it('Testing open module - case: open (2,1)', function() {
        obj.open(2, 1);
        assert.equal(obj.isopen(2, 1), true);
        assert.equal(obj.isfull(2, 1), false);
        assert.equal(obj.percolation.connected(0, 5), true);
        assert.equal(obj.percolation.connected(5, 6), false);
    });

    it('Testing open module - case: open (3,1)', function() {
        obj.open(3, 1);
        assert.equal(obj.isopen(3, 1), true);
        assert.equal(obj.isfull(3, 1), false);
        assert.equal(obj.percolation.connected(0, 9), true);
        assert.equal(obj.percolation.connected(9, 1), true);
        assert.equal(obj.percolates(), false);
    });

    it('Testing open module - case: open (4,1)', function() {
        obj.open(4, 1);
        assert.equal(obj.isopen(4, 1), true);
        assert.equal(obj.percolation.connected(13, 1), true);
        assert.equal(obj.percolation.connected(17, 0), true);
        assert.equal(obj.percolates(), true);
    });
});

describe('Quiz functionality: sequential opening right', function() {
    var obj = new Percolation(4);
    it('Testing open module - case: open (1,4)', function() {
        obj.open(1, 4);
        assert.equal(obj.isopen(1, 4), true);
        assert.equal(obj.isfull(1, 4), false);
        assert.equal(obj.percolation.connected(0, 4), true);
    });
    it('Testing open module - case: open (2,4)', function() {
        obj.open(2, 4);
        assert.equal(obj.isopen(2, 4), true);
        assert.equal(obj.percolation.connected(0, 8), true);
        assert.equal(obj.percolates(), false);
    });

    it('Testing open module - case: open (3,4)', function() {
        obj.open(3, 4);
        assert.equal(obj.isopen(3, 4), true);
        assert.equal(obj.percolation.connected(0, 12), true);
        assert.equal(obj.percolates(), false);
    });
    it('Testing open module - case: open (4,4)', function() {
        obj.open(4, 4);
        assert.equal(obj.isopen(4, 4), true);
        assert.equal(obj.percolation.connected(8, 12), true);
        assert.equal(obj.percolates(), true);
    });
});

describe('Quiz functionality: random openings', function() {
    var obj = new Percolation(4);
    it('Testing left right openings - case: open (2,2)', function() {
        obj.open(2, 2);
        assert.equal(obj.isopen(2, 2), true);
        assert.equal(obj.percolation.connected(0, 6), false);
    });
    it('Testing left right openings - case: open (2,3)', function() {
        obj.open(2, 3);
        assert.equal(obj.isopen(2, 3), true);
        assert.equal(obj.percolation.connected(6, 7), true);
    });
    it('Testing left right openings - case: open (2,4)', function() {
        obj.open(2, 4);
        assert.equal(obj.isopen(2, 4), true);
        assert.equal(obj.percolation.connected(6, 8), true);
    });
    it('Testing percolation', function() {
        obj.open(3, 4);
        assert.equal(obj.percolates(), false);
        obj.open(3, 3);
        assert.equal(obj.percolates(), false);
        obj.open(4, 3);
        assert.equal(obj.percolates(), false);
        obj.open(1, 2);
        assert.equal(obj.percolates(), true);
    });
});

describe('Testing errors', function() {
    var obj = new Percolation(4);
    context('when testing out of bound coordinates', function() {
        it('Should throw an error', function() {
            expect(obj.open(10, 20).to.throw('The slot doesnt exist'));
        });
    });

});