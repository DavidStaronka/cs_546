const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

function type_checker(item, type, errString, objType){
    if(item == undefined || typeof(item) != type || item.length == 0) throw errString;
    if(type == "string"){
        //got this if statement from stack overflow here: https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
        if (!/\S/.test(item)) throw errString;
    }
    if(objType == "array"){
        if(!Array.isArray(item) || item.length == 0) throw errString;
    }
}

async function get(id){
    type_checker(id, "string", "id must be a non-empty string");

    let objId = ObjectId(id);
    const restCollection = await restaurants();
    const restaurant = await restCollection.findOne({ _id: objId });
    if (restaurant === null) throw 'No restaurant with the given id';

    // console.log(restaurant);

    let retRest = {
        _id: restaurant["_id"].toString(),
        name: restaurant["name"],
        location: restaurant["location"],
        phoneNumber: restaurant["phoneNumber"],
        website: restaurant["website"],
        priceRange: restaurant["priceRange"],
        cuisines: restaurant["cuisines"],
        overallRating: restaurant["overallRating"],
        serviceOptions: restaurant["serviceOptions"],
        reviews: restaurant["reviews"]
    };

    // console.log(restaurant["id"].toString())

    return retRest;
}

async function getAll(){
    const restCollection = await restaurants();
    // if (restCollection == null);
    const restList = await restCollection.find({}).toArray();

    let retList = [];
    // modified for the API schema to be only name and id
    for(rest of restList){
        let temp = {
            _id: rest["_id"].toString(),
            name: rest["name"]
            // location: rest["location"],
            // phoneNumber: rest["phoneNumber"],
            // website: rest["website"],
            // priceRange: rest["priceRange"],
            // cuisines: rest["cuisines"],
            // overallRating: rest["overallRating"],
            // serviceOptions: rest["serviceOptions"],
            // reviews: rest["reviews"]
        }
        retList.push(temp);
    }

    return retList;
}

async function create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions){
    type_checker(name, "string", "Name must be a non-empty string.");
    type_checker(location, "string", "location must be a non-empty string.");
    type_checker(phoneNumber, "string", "phoneNumber must be a non-empty string.");
    type_checker(website, "string", "website must be a non-empty string.");
    type_checker(priceRange, "string", "priceRange must be a non-empty string.");
    type_checker(cuisines, "object", "cuisines must be a non-empty array.", "array");
    for(cuisine of cuisines){
        type_checker(cuisine, "string", "cuisines must contain non-empty strings.");
    }
    type_checker(serviceOptions, "object", "serviceOptions must be an object.");
    type_checker(serviceOptions.dineIn, "boolean", "serviceOptions.dineIn must be a boolean.");
    type_checker(serviceOptions.takeOut, "boolean", "serviceOptions.takeOut must be a boolean.");
    type_checker(serviceOptions.delivery, "boolean", "serviceOptions.delivery must be a boolean.");

    if(!/http:\/\/www\.......*\.com/.test(website)) throw "website must be of the format http://www.{5 or more characters}.com"
    if(!/\d{3}-\d{3}-\d{4}/.test(phoneNumber)) throw "phone number must be of the format xxx-xxx-xxxx"
    if(!/\$*/.test(priceRange) || /\$\$\$\$\$\$*/.test(priceRange)) throw "price range must be a string of 1 to 4 $'s"

    const restCollection = await restaurants();
    let newRest = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: []
    };

    const insertInfo = await restCollection.insertOne(newRest);
    if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';

    const newId = insertInfo.insertedId;

    let new_id = newId.toString();
    const rest = await get(new_id);
    return rest;
}

async function remove(id){
    type_checker(id, "string", "id must be a non-empty string");

    let objId = ObjectId(id);
    const restCollection = await restaurants();
    const restaurant = await restCollection.findOne({ _id: objId });
    if (restaurant === null) throw 'No restaurant with that id';

    const deletionInfo = await restCollection.deleteOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete restaurant with id of ${id}`;
    }

    return `${restaurant["name"]} has been successfully deleted!`;
}

async function update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions){
    type_checker(name, "string", "Name must be a non-empty string.");
    type_checker(location, "string", "location must be a non-empty string.");
    type_checker(phoneNumber, "string", "phoneNumber must be a non-empty string.");
    type_checker(website, "string", "website must be a non-empty string.");
    type_checker(priceRange, "string", "priceRange must be a non-empty string.");
    type_checker(cuisines, "object", "cuisines must be a non-empty array.", "array");
    for(cuisine of cuisines){
        type_checker(cuisine, "string", "cuisines must contain non-empty strings.");
    }
    type_checker(serviceOptions, "object", "serviceOptions must be an object.");
    type_checker(serviceOptions.dineIn, "boolean", "serviceOptions.dineIn must be a boolean.");
    type_checker(serviceOptions.takeOut, "boolean", "serviceOptions.takeOut must be a boolean.");
    type_checker(serviceOptions.delivery, "boolean", "serviceOptions.delivery must be a boolean.");

    if(!/http:\/\/www\.......*\.com/.test(website)) throw "website must be of the format http://www.{5 or more characters}.com";
    if(!/\d\d\d-\d\d\d-\d\d\d\d/.test(phoneNumber)) throw "phone number must be of the format xxx-xxx-xxxx";
    if(!/\$*/.test(priceRange) || /\$\$\$\$\$\$*/.test(priceRange)) throw "price range must be a string of 1 to 4 $'s";

    const rest = await get(id);
    let newRest = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: rest["overallRating"],
        serviceOptions: serviceOptions,
        reviews: rest["reviews"]
    };
    const objId = ObjectId(id);

    const restCollection = await restaurants();
    const updatedInfo = await restCollection.updateOne(
        { _id: objId },
        { $set: newRest }
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update restaurant successfully.';
    }
  
    return await this.get(id);
}

module.exports = {
    get,
    getAll,
    create,
    remove,
    update
};