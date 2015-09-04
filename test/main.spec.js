(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['expect.js', '../lib/main'], function(expect, objectCompare) {
	describe('lib', function() {

	    it('Should return false because objects and arrays cannot be equal', function() {
		expect(objectCompare({}, [])).to.not.be.ok();
	    });

	    it('Should return false because objects and strings cannot be equal', function() {
		expect(objectCompare({}, '')).to.not.be.ok();
	    });

	    it('Should return false because arrays and numbers cannot be equal', function() {
		expect(objectCompare([], 0)).to.not.be.ok();
	    });

	    it('Should return true because the strings are stricly equal', function() {
		expect(objectCompare('test', 'test')).to.be.ok();
	    });

	    it('Should return true because the numbers are stricly equal', function() {
		expect(objectCompare(123, 123)).to.be.ok();
	    });

	    it('Should return false because the values are are not stricly equal', function() {
		expect(objectCompare(123, '123')).to.not.be.ok();
	    });

	    it('Should return true because the objects are equal', function() {
		expect(objectCompare(
		    {
			a: 0,
			b: 1,
			c: {
			    "test": "abc"
			}
		    },
		    {
			a: 0,
			b: 1,
			c: {
			    "test": "abc"
			}
		    }
		)).to.be.ok();
	    });

	    it('Should return true because the arrays are equal', function() {
		expect(objectCompare([1,2,3],[1,2,3])).to.be.ok();
	    });

	    it('Should return false because the arrays have equal values but in different indices', function() {
		expect(objectCompare([1,2,3],[1,3,2])).to.not.be.ok();
	    });

	    it('Should return true because the objects are equal with their properties having loose equality and strict-option is false', function() {
		expect(objectCompare(
		    {
			a: "0",
			b: 1,
			c: {
			    "test": "abc"
			}
		    },
		    {
			a: 0,
			b: "1",
			c: {
			    "test": "abc"
			}
		    },
		    {
			strict: false
		    }
		)).to.be.ok();
	    });

	    it('Should return true because the arrays are equal with their elements being not in order and order-option is false', function() {
		expect(objectCompare(
		    [1,2,3],
		    [1,3,2],
		    {order: false}
		)).to.be.ok();
	    });

	    it('Should return true because the values are loosely equal and strict-option is false', function() {
		expect(objectCompare(
		    123,
		    '123',
		    {strict: false}
		)).to.be.ok();
	    });

	});
    });

})();