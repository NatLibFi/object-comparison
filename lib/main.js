/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Check if two Javascript objects are equal enough 
 *
 * Copyright (c) 2015 University Of Helsinki (The National Library Of Finland)
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 **/

/* istanbul ignore next */
(function (root, factory) {
    
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['es6-polyfills/lib/object'], factory);
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('es6-polyfills/lib/object'));
    } else {
        root.objectCompare = factory(root.Object);
    }

}(this, factory));

function factory(Object)
{

    'use strict';
    
    var default_options = {
	strict: true,
	order: true,
	caseSensitive: true
    };
    
    /**
     * @param {object} obj1
     * @param {object} obj2
     * @param {object} [options]
     * @param {boolean} [options.strict] If true, all values must have strict equality
     * @param {boolean} [options.order] If true, all array elements must be in the same order
     * @param {boolean} [options.caseSensitive] If false, strings are compared case-insensitively 
     * @return boolean
     */   
    function compare(obj1, obj2, options)
    {

	options = options === undefined || typeof options !== 'object' || Array.isArray(options)
	    ? default_options
	    : Object.assign(JSON.parse(JSON.stringify(default_options)), options); 
	
	if (typeof obj1 !== typeof obj2) {
	    if (!options.strict
		&& (typeof obj1 === 'number' || typeof obj1 === 'string')
		&& (typeof obj2 === 'number' || typeof obj2 === 'string')) {
		return obj1 == obj2;
	    } else {
		return false;
	    }
	} else {
	    switch (typeof obj1) {
	    case 'object':
		if (Array.isArray(obj1) || Array.isArray(obj2)) {
		    if (Array.isArray(obj1) && Array.isArray(obj2)) {
			if (obj1.length !== obj2.length) {
			    return false;
			} else if (options.order) {
			    return obj1.every(function(element, index) {
				return compare(element, obj2[index], options);
			    });
			} else {
			    return obj1.every(function(element) {
				return obj2.some(function(element2) {
				    return compare(element, element2, options);
				});
			    });
			}
		    } else {
			return false;
		    }
		} else {
		    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			return false;
		    } else {
			return Object.keys(obj1).every(function(key) {
			    return key in obj2 && compare(obj1[key], obj2[key], options);
			});
		    }
		}
		break;
	    case 'string':
		return options.caseSensitive ? obj1 === obj2 : obj1.toLocaleLowerCase() === obj2.toLocaleLowerCase();
	    default:
		return obj1 === obj2;
	    }
	}
    }

    return compare;

}