function object_checker(obj, errString){
    if(obj == undefined || typeof(obj) != "object" || Object.entries(obj).length == 0) throw errString;
    Object.values(obj).forEach(function(elem){if(typeof(elem) != "number") throw errString});
}

function array_checker(arr, errString){
    if(arr == undefined || !Array.isArray(arr) || arr.length == 0) throw errString;
    arr.forEach(function(elem){if(typeof(elem) != "object") throw errString});
}

function computeObjects(objects, func){
    array_checker(objects, "The first argument must be a non-empty array of non-empty objects. Every key of those objects must be a number.");
    objects.forEach(function(obj) {object_checker(obj, "The first argument must be a non-empty array of non-empty objects. Every key of those objects must be a number.")});
    if(typeof(func) != "function") throw "The second argument must be a function";

    let retObj = {};

    objects.forEach(function(obj){
        let keys = Object.keys(obj);
        keys.forEach(function(key){
            if(retObj[key]){
                retObj[key] += func(obj[key]);
            } else{
                retObj[key] = func(obj[key]);
            }
        });
    });

    return retObj;
}

function commonKeys(obj1, obj2){
    if(obj1 == undefined || typeof(obj1) != "object" || obj2 == undefined || typeof(obj2) != "object") throw "Both arguments must be objects";

    let retObj = {};
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    keys1.forEach(function(key){
        if(keys2.includes(key)){
            if(obj1[key] == obj2[key]){
                retObj[key] = obj1[key];
            }
            if(typeof(obj1[key]) == "object" && typeof(obj2[key] == "object")){
                let temp = commonKeys(obj1[key], obj2[key]);
                if(temp != {}) 
                    retObj[key] = temp;
            }
        }
    });

    return retObj;
}

function flipObject(object){
    if(object == undefined || typeof(object) != "object" || Object.entries(object).length == 0) throw "Argument must be a non-empty object of key-value pairs";

    let retObj = {};
    Object.keys(object).forEach(function(key){
        if(typeof(object[key]) == "object"){
            retObj[key] = flipObject(object[key]);
        } else {
            retObj[object[key]] = key;
        }
    });

    return retObj;
}

module.exports = {
    computeObjects,
    commonKeys,
    flipObject
};