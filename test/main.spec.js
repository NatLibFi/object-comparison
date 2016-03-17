/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Check if two Javascript objects are equal enough 
 *
 * Copyright (c) 2015-2016 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of object-comparison 
 *
 * object-comparison is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 **/

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['chai', '../lib/main'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('chai'), require('../lib/main'));
  }

}(this, factory));

function factory(chai, objectCompare)
{

  'use strict';
  
  var expect = chai.expect;

  describe('main', function() {

    it('Should return false because objects and arrays cannot be equal', function() {
      expect(objectCompare({}, [])).to.equal(false);
    });

    it('Should return false because objects and strings cannot be equal', function() {
      expect(objectCompare({}, '')).to.equal(false);
    });

    it('Should return false because arrays and numbers cannot be equal', function() {
      expect(objectCompare([], 0)).to.equal(false);
    });

    it('Should return true because the strings are stricly equal', function() {
      expect(objectCompare('test', 'test')).to.equal(true);
    });

    it('Should return true because the numbers are stricly equal', function() {
      expect(objectCompare(123, 123)).to.equal(true);
    });

    it('Should return false because the values are are not stricly equal', function() {
      expect(objectCompare(123, '123')).to.equal(false);
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
      )).to.equal(true);
    });

    it('Should return true because the arrays are equal', function() {
      expect(objectCompare([1,2,3],[1,2,3])).to.equal(true);
    });

    it('Should return false because the arrays have equal values but in different indices', function() {
      expect(objectCompare([1,2,3],[1,3,2])).to.equal(false);
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
      )).to.equal(true);
    });

    it('Should return true because the arrays are equal with their elements being not in order and order-option is false', function() {
      expect(objectCompare(
        [1,2,3],
        [1,3,2],
        {order: false}
      )).to.equal(true);
    });

    it('Should return true because the values are loosely equal and strict-option is false', function() {
      expect(objectCompare(
        123,
        '123',
        {strict: false}
      )).to.equal(true);
    });

    it('Should return true because string values are compared case-insensitively', function() {
      expect(objectCompare(
        'foo',
        'FOO',
        {caseSensitive: false}
      )).to.equal(true);
    });

  });

}
