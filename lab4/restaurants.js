const mongoCollections = require('./config/mongoCollections');
const restaurants = mongoCollections.restaurants;

function type_checker(item, type, errString, objType){
    if(item == undefined || typeof(item) != type || item.length == 0) throw errString;
    if(type == "string"){
        //got this if statement from stack overflow here: https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
        if (!/\S/.test(item)) throw errString;
    }
    if(objType == "array"){
        if(!Array.isArray(item) || !item.length == 0) throw errString;
    }
}

async function create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions){
    type_checker(name, "string", "Name must be a non-empty string.");
    type_checker(location, "string", "location must be a non-empty string.");
    type_checker(phoneNumber, "string", "phoneNumber must be a non-empty string.");
    type_checker(website, "string", "website must be a non-empty string.");
    type_checker(priceRange, "string", "priceRange must be a non-empty string.");
    type_checker(cuisines, "object", "cuisines must be a non-empty array.", "array");
    for(cuisine of cuisines){
        type_checker(cuisine, "string", "cuisines must contain non-empty strings.");
    }
    type_checker(overallRating, "number", "overallRating must be a number from 0 to 5.");
    if(overallRating < 0 || overallRating > 5) throw "overallRating must be a number from 0 to 5."
    type_checker(serviceOptions, "object", "serviceOptions must be an object.");
    type_checker(serviceOptions.dineIn, "boolean", "serviceOptions.dineIn must be a boolean.");
    type_checker(serviceOptions.takeOut, "boolean", "serviceOptions.takeOut must be a boolean.");
    type_checker(serviceOptions.delivery, "boolean", "serviceOptions.delivery must be a boolean.");

    const restCollection = await restaurants();
    let newRest = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: overallRating,
        serviceOptions: serviceOptions
    };

    const insertInfo = await restCollection.insertOne(newRest);
    if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';

    const newId = insertInfo.insertedId;

    const rest = await this.get(newId);
    return rest;
}