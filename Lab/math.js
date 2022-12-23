// const add = (x, y) => x + y;
// const PI = 3.14159;
// const square = x => x * x;

// module.exports.add = add;
// module.exports.PI = PI;
// module.exports.square = square;
// instead of exporting one by one, we can export all of them as an object:
// const math = {
//     add: add,
//     PI: PI,
//     square: square
// }
// module.exports = math;

// instead of the method used above, we can also directly export as modules:
// but should no longer use exports as a variable name otherwise all of exports will stop working.
module.exports.add = (x, y) => x + y; // instead we can use the shorter version: exports.add = (x, y) => x + y;
module.exports.PI = 3.14159; // exports.PI = 3.14159;
module.exports.square = x => x * x; // exports.square = x => x * x;