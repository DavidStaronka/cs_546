const arrayUtils = require("./arrayUtils")
const stringUtils = require("./stringUtils")
const objUtils = require("./objUtils")
//arrayUtils
// average
try {
    // Should Pass
    const avgOne = arrayUtils.average([[1,3], [2,4,5]]);
    console.log('average passed successfully');
} catch (e) {
    console.error('average failed test case');
}
try {
    // Should Fail
    const avgTwo = arrayUtils.average([[1,3], ["hi",4,5]]); 
    console.error('average did not error');
} catch (e) {
    console.log('average failed successfully');
}

// modeSquared
try {
    // Should Pass
    const modeSqOne = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
    console.log('modeSquared passed successfully');
} catch (e) {
    console.error('modeSquared failed test case');
}
try {
    // Should Fail
    const modeSqTwo = arrayUtils.modeSquared("banana"); 
    console.error('modeSquared did not error');
} catch (e) {
    console.log('modeSquared failed successfully');
}

// medianElement
try {
    // Should Pass
    const medElOne = arrayUtils.medianElement([5, 6, 7]);
    console.log('medianElement passed successfully');
} catch (e) {
    console.error('medianElement failed test case');
}
try {
    // Should Fail
    const medElTwo = arrayUtils.medianElement(5, 6, 7);
    console.error('medianElement did not error');
} catch (e) {
    console.log('medianElement failed successfully');
}

// merge
try {
    // Should Pass
    const mergeOne = arrayUtils.merge([1, 2, 3], [3, 1, 2]);
    console.log('merge passed successfully');
} catch (e) {
    console.error('merge failed test case');
}
try {
    // Should Fail
    const mergeTwo = arrayUtils.merge([], ['ab', 'ts']);
    console.error('merge did not error');
} catch (e) {
    console.log('merge failed successfully');
}

// stringUtils
// sortString
try {
    // Should Pass
    const strSortOne = stringUtils.sortString('123 FOO BAR!');
    console.log('sortString passed successfully');
} catch (e) {
    console.error('sortString failed test case');
}
try {
    // Should Fail
    const strSortTwo = stringUtils.sortString('');
    console.error('sortString did not error');
} catch (e) {
    console.log('sortString failed successfully');
}

// replaceChar
try {
    // Should Pass
    const replCharOne = stringUtils.replaceChar("Daddy", 2);
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}
try {
    // Should Fail
    const replCharTwo = stringUtils.replaceChar("foobar", 0);
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}

// mashUp
try {
    // Should Pass
    const mashUpOne = stringUtils.mashUp("Patrick", "Hill", "$");
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed test case');
}
try {
    // Should Fail
    const mashUpTwo = stringUtils.mashUp("Patrick", "");
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}

// objUtils
// computeObjects
try {
    // Should Pass
    const compObjOne = objUtils.computeObjects([{ x: 2, y: 3}, { a: 70, x: 4, z: 5 }], x => x * 2);
    console.log('computeObjects passed successfully');
} catch (e) {
    console.error('computeObjects failed test case');
}
try {
    // Should Fail
    const compObjTwo = objUtils.computeObjects("Patrick", "");
    console.error('computeObjects did not error');
} catch (e) {
    console.log('computeObjects failed successfully');
}

// commonKeys
try {
    // Should Pass
    const commonKeyOne = objUtils.commonKeys({a: 2, b: {x: 7}}, {a: 3, b: {x: 7, y: 10}});
    console.log('commonKeys passed successfully');
} catch (e) {
    console.error('commonKeys failed test case');
}
try {
    // Should Fail
    const commonKeyTwo = objUtils.commonKeys(5, 55);
    console.error('commonKeys did not error');
} catch (e) {
    console.log('commonKeys failed successfully');
}

// flipObject
try {
    // Should Pass
    const flipObjOne = objUtils.flipObject({ a: 3, b: 7, c: { x: 1 } });
    console.log('flipObject passed successfully');
} catch (e) {
    console.error('flipObject failed test case');
}
try {
    // Should Fail
    const flipObjTwo = objUtils.flipObject([]);
    console.error('flipObject did not error');
} catch (e) {
    console.log('flipObject failed successfully');
}