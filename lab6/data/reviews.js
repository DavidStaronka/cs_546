const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');
const uuid = require('uuid');
const { builtinModules } = require('module');

function type_checker(item, type, errString, objType){
    if(item == undefined || typeof(item) != type || item.length == 0) throw errString;
    if(type == "string"){
        if (!/\S/.test(item)) throw errString;
    }
    if(objType == "array"){
        if(!Array.isArray(item) || item.length == 0) throw errString;
    }
}

async function create(restaurantId, title, reviewer, rating, dateOfReview, review){
    type_checker(restaurantId, "string", "restaurantId must be a non-empty string");
    type_checker(title, "string", "title must be a non-empty string");
    type_checker(reviewer, "string", "reviewer must be a non-empty string");
    type_checker(rating, "number", "rating must be a number from 1 to 5");
    type_checker(dateOfReview, "string", "dateOfReview must be a non-empty string");
    type_checker(review, "string", "review must be a non-empty string");

    if(rating < 1 || rating > 5) throw "rating must be a number from 1 to 5";
    if(!/\d{2}\/\d{2}\/\d{4}/.test(dateOfReview)) throw "dateOfReview must be of the format MM/DD/YYYY";

    //Current date code slightly modified from here: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    //May be a problem, come here first for error checking
    if(dateOfReview != today) throw "dateOfReview must be the current date";

    const objId = ObjectId(restaurantId);
    const restCollection = await restaurants();
    const restaurant = await restCollection.findOne({ _id: objId });
    if (restaurant === null) throw 'No restaurant with the given restaurantId';

    let newOverall = (restaurant["overallRating"] * restaurant["reviews"].length + rating) / (restaurant["reviews"].length + 1);

    let newReview = {
        _id: uuid.v4(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review
    };

    await restCollection.updateOne({_id: restaurantId}, {$addToSet: {reviews: newReview}});
    return await restCollection
        .updateOne({_id: restaurantId}, {$set: {overallRating: newOverall}})
        .then(function () {
            return get(id);
        });

}

async function getAll(restaurantId){
    type_checker(restaurantId, "string", "restaurantId must be a non-empty string");

    const objId = ObjectId(restaurantId);
    const restCollection = await restaurants();
    const restaurant = await restCollection.findOne({ _id: objId });
    if (restaurant === null) throw 'No restaurant with the given restaurantId';

    retRest = {
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
    return retRest;
}

async function get(reviewId){
    type_checker(reviewId, "string", "reviewId must be a non-empty string");

    const restCollection = await restaurants();
    for(rest of restCollection){
        const review = await rest.review.findOne({ _id: reviewId });
        if (restaurant === null) continue;
        let retRev = {
            _id: review["_id"].toString(),
            title: review["title"],
            reviewer: review["reviewer"],
            rating: review["rating"],
            dateOfReview: review["dateOfReview"],
            review: review["review"]
        }
        return retRev;
    }
    throw "No review found with the given id."
}

async function remove(reviewId){
    type_checker(reviewId, "string", "reviewId must be a non-empty string");

    const restCollection = await restaurants();
    for(rest of restCollection){
        let updatedInfo = await restCollection.updateOne({$id: rest["_id"]}, { $pull: { reviews: { _id: reviewId } }});
        if (updatedInfo.modifiedCount === 0) continue;
    }
    throw "No review found with the given id."
}

module.exports = {
    get,
    getAll,
    create,
    remove
};