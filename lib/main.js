(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['es6-shim-compat/lib/shims/object'], function(Object) {
	
	var default_options = {
	    strict: true,
	    order: true
	};

	/**
	 * @parameter {object} obj1
	 * @parameter {object} obj2
	 * @parameter {object} options Properties: strict (All values must have strict equality), order (Array elements must be in the same order)
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
		}
	    } else {
		switch (typeof obj1)
		{
		case 'object':
		    if (Array.isArray(obj1) || Array.isArray(obj2)) {
			if (Array.isArray(obj1) && Array.isArray(obj2)) {
			    if (obj1.length !== obj2.length) {
				return 0;
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
			    return 0;
			}
		    } else {
			if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			    return 0;
			} else {
			    return Object.keys(obj1).every(function(key) {
				return key in obj2 && compare(obj1[key], obj2[key], options);
			    });
			}
		    }
		    break;
		default:
		    return obj1 === obj2;
		}
	    }
	}
	
	return function(obj1, obj2, options)
	{
	    return compare(obj1, obj2, options);
	};

    });

})();
