function average(arrays){
    let errString = "Argument must be a non-empty array of non-empty number arrays";
    if(arrays == undefined || !Array.isArray(arrays) || arrays.length == 0) throw errString;

    arrays.forEach(function (arr){
        if(arr == undefined || !Array.isArray(arr) || arr.length == 0) throw errString;
        arr.forEach(function(elem){if(typeof(elem) != "number") throw errString});
    });

    let numElements = 0;
    let sum = 0;
    
    arrays.forEach(function(arr){
        arr.forEach(elem => sum += elem);
        numElements += arr.length; 
    });

    return Math.round(sum / numElements);
}

function num_array_checker(arr, errString){
    if(arr == undefined || !Array.isArray(arr) || arr.length == 0) throw errString;
    arr.forEach(function(elem){if(typeof(elem) != "number") throw errString});
}

function modeSquared(array){
    num_array_checker(array, "Argument must be a non-empty array of numbers");
    let freq = {};
    let modes = [];
    let maxFreq = 0;
    let retval = 0;

    array.forEach(function(elem){
        if(freq[elem]){
            freq[elem] += 1;
        } else{
            freq[elem] = 1;
        }
        if(freq[elem] > maxFreq){
            maxFreq++;
        }
    });
    Object.keys(freq).forEach(function(key){
        if(freq[key] == maxFreq){
            modes.push(key);
        }
    });
 
    modes.forEach(function(num){retval += Math.pow(parseInt(num), 2)});
    return retval;
}

function medianElement(array){
    num_array_checker(array, "Argument must be a non-empty array of numbers");
    let arrCopy = [...array];
    arrCopy.sort();
    let median = 0;
    let indexVal = 0;
    if(arrCopy.length % 2 == 0){
        median = (arrCopy[(arrCopy.length-2)/2] + arrCopy[(arrCopy.length)/2]) / 2;
        indexVal = arrCopy[(arrCopy.length)/2];
    } else {
        indexVal = (arrCopy[(arrCopy.length-1)/2])
        median = indexVal;
    }
    
    let index = array.findIndex((elem) => elem == indexVal);
    let retval = {};
    retval[median] = index;
    return retval;
}

function array_checker_2(arr, errString){
    if(arr == undefined || !Array.isArray(arr) || arr.length == 0) throw errString;
    arr.forEach(function(elem){if(typeof(elem) != "number" && typeof(elem) != "string" || elem.length > 1) throw errString});
}

function isUpper(str) {
    return str === str.toUpperCase();
 }

//positive if x>y
//negative if x<y
function compare(x, y){
    //different types
    if(typeof(x) == "string" && typeof(y) != "string"){
        return -1;
    }
    if(typeof(x) != "string" && typeof(y) == "string"){
        return 1;
    }

    //x and y are strings
    if(typeof(x) == "string"){
        if(isUpper(x) && !isUpper(y)){
            return 1;
        }
        if(isUpper(x)){
            if(x<y){
                return -1;
            }
            return 1;
        }
        if(isUpper(y)){
            return -1;
        }
        if(x<y){
            return -1;
        }
        return 1;
    }

    //x and y are numbers
    if(x<y){
        return -1;
    }
    return 1;
}

function merge(arrayOne, arrayTwo){
    array_checker_2(arrayOne, "Argument must be a non-empty array of numbers and/or single characters");
    array_checker_2(arrayTwo, "Argument must be a non-empty array of numbers and/or single characters");

    arrayOne.sort(compare);
    arrayTwo.sort(compare);

    let merArr = [];
    let i=0;
    let j=0;

    // I did refresh my memory of mergesort by looking at Geeks4Geeks code, so this is likely very similar to that
    while (i < arrayOne.length && j < arrayTwo.length) {
        if (compare(arrayOne[i], arrayTwo[j]) < 1) {
            merArr.push(arrayOne[i]);
            i++;
        }
        else {
            merArr.push(arrayTwo[j]);
            j++;
        }
    }
   
    while (i < arrayOne.length) {
        merArr.push(arrayOne[i]);
        i++;
    }

    while (j < arrayTwo.length) {
        merArr.push(arrayTwo[j]);
        j++;
    }

    return merArr;
}

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
};