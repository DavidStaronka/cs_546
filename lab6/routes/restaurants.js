const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurants = data.restaurants;


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

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await restaurants.get(req.params.id);
        res.json(restaurant);
        return;
    } catch (e) {
        res.status(404).json({ message: e.toString() });
        return;
    }
});
  
router.get('/', async (req, res) => {
    try {
        const restList = await restaurants.getAll();
        res.json(restList);
        return;
    } catch (e) {
        res.status(500).send();
        return;
    }
});

router.post('/', async(req, res) => {
    try{
        type_checker(req.body.name, "string", "Name must be a non-empty string.");
        type_checker(req.body.location, "string", "location must be a non-empty string.");
        type_checker(req.body.phoneNumber, "string", "phoneNumber must be a non-empty string.");
        type_checker(req.body.website, "string", "website must be a non-empty string.");
        type_checker(req.body.priceRange, "string", "priceRange must be a non-empty string.");
        type_checker(req.body.cuisines, "object", "cuisines must be a non-empty array.", "array");
        for(cuisine of req.body.cuisines){
            type_checker(cuisine, "string", "cuisines must contain non-empty strings.");
        }
        type_checker(req.body.serviceOptions, "object", "serviceOptions must be an object.");
        type_checker(req.body.serviceOptions.dineIn, "boolean", "serviceOptions.dineIn must be a boolean.");
        type_checker(req.body.serviceOptions.takeOut, "boolean", "serviceOptions.takeOut must be a boolean.");
        type_checker(req.body.serviceOptions.delivery, "boolean", "serviceOptions.delivery must be a boolean.");

        if(!/http:\/\/www\.......*\.com/.test(req.body.website)) throw "website must be of the format http://www.{5 or more characters}.com";
        if(!/\d{3}-\d{3}-\d{4}/.test(req.body.phoneNumber)) throw "phone number must be of the format xxx-xxx-xxxx";
        if(!/\$*/.test(req.body.priceRange) || /\$\$\$\$\$\$*/.test(req.body.priceRange)) throw "price range must be a string of 1 to 4 $'s";
    } catch(e) {
        console.log(e);
        console.log(req.body);
        res.status(400).json({message: e.toString()})
        return;
    }

    try{
        const restaurant = await restaurants.create(req.body.name, req.body.location, req.body.phoneNumber, req.body.website, req.body.priceRange, req.body.cuisines, req.body.serviceOptions);
        res.json(restaurant);
        return;
    } catch(e){
        res.status(404).json({message: e.toString()})
        return;
    }
});

router.put('/:id', async(req, res) => {
    try{
        type_checker(req.body.name, "string", "Name must be a non-empty string.");
        type_checker(req.body.location, "string", "location must be a non-empty string.");
        type_checker(req.body.phoneNumber, "string", "phoneNumber must be a non-empty string.");
        type_checker(req.body.website, "string", "website must be a non-empty string.");
        type_checker(req.body.priceRange, "string", "priceRange must be a non-empty string.");
        type_checker(req.body.cuisines, "object", "cuisines must be a non-empty array.", "array");
        for(cuisine of req.body.cuisines){
            type_checker(cuisine, "string", "cuisines must contain non-empty strings.");
        }
        type_checker(req.body.serviceOptions, "object", "serviceOptions must be an object.");
        type_checker(req.body.serviceOptions.dineIn, "boolean", "serviceOptions.dineIn must be a boolean.");
        type_checker(req.body.serviceOptions.takeOut, "boolean", "serviceOptions.takeOut must be a boolean.");
        type_checker(req.body.serviceOptions.delivery, "boolean", "serviceOptions.delivery must be a boolean.");

        if(!/http:\/\/www\.......*\.com/.test(req.body.website)) throw "website must be of the format http://www.{5 or more characters}.com";
        if(!/\d{3}-\d{3}-\d{4}/.test(req.body.phoneNumber)) throw "phone number must be of the format xxx-xxx-xxxx";
        if(!/\$*/.test(req.body.priceRange) || /\$\$\$\$\$\$*/.test(req.body.priceRange)) throw "price range must be a string of 1 to 4 $'s";
    } catch(e) {
        res.status(400).json({message: e.toString()})
        return;
    }

    try{
        const restaurant = await restaurants.update(req.params.id, req.body.name, req.body.location, req.body.phoneNumber, req.body.website, req.body.priceRange, req.body.cuisines, req.body.serviceOptions)
        res.json(restaurant);
        return;
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.toString() });
        return;
    }
});

router.delete('/:id', async(req, res) => {
    try{
        await restaurants.remove(req.params.id);
        res.json({restaurantId: req.params.id, deleted: true});
        return;
    } catch(e){
        res.status(404).json({message: e.toString()});
        return;
    }
});

module.exports = router;