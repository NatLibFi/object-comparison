# Object comparison [![Build Status](https://travis-ci.org/NatLibFi/record-loader-prototypes.svg)](https://travis-ci.org/NatLibFi/object-comparison) [![Test Coverage](https://codeclimate.com/github/NatLibFi/object-comparison/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/object-comparison/coverage)

A function to check if two Javascript objects are equal enough. Returns a boolean indicating whether the objects are equal or not.

**ONLY SUPPORTS JSON-SERIALIZABLE OBJECTS. IN OTHER WORDS: FUNCTION PROPERTIES CANNOT BE COMPARED**

## Usage

### AMD

```javascript
define(['object-comparison'], function(objectCompare) {
  if (objectCompare(o1, o2)) {
    console.log('equal');
  }
});
```

### Node.js

```javascript
var objectCompare = require('object-comparison');

if (objectCompare(o1, o2)) {
  console.log('equal');
}
```

### Browser globals

```javascript
if (objectCompare(o1, o2)) {
  console.log('equal');
}
```

## Configuration

The functions takes an object as a third argument which can have the following properties:

* **strict** (*boolean*): If true, primitive types are compared with strict equality operator (===) (**Default**: *true*)
* **order** (*boolean*): If true, array elements must be in same order (**Default**: *true*)
* **caseSensitive** (*boolean*): If true, string values (As such, as array values or as object values) are compared case-sensitive. (**Default**: *true*)

## License and copyright

Copyright (c) 2015-2016 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **GNU General Public License Version 3**.
