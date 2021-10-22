const express = require('express');
const router = express.Router();
const data = require('../data');
const reviews = data.reviews;


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

router.get('/:restaurantId', async (req, res) => {
    try {
        const reviewList = await reviews.getAll(req.params.restaurantId);
        res.status(200).send(reviewList);
        return;
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.toString() });
        return;
    }
});

router.post('/:restaurantId', async(req, res) => {
    try{
        type_checker(req.params.restaurantId, "string", "restaurantId must be a non-empty string");
        type_checker(req.body.title, "string", "title must be a non-empty string");
        type_checker(req.body.reviewer, "string", "reviewer must be a non-empty string");
        type_checker(req.body.rating, "number", "rating must be a number from 1 to 5");
        type_checker(req.body.dateOfReview, "string", "dateOfReview must be a non-empty string");
        type_checker(req.body.review, "string", "review must be a non-empty string");

        if(req.body.rating < 1 || req.body.rating > 5) throw "rating must be a number from 1 to 5";
        if(!/\d{2}\/\d{2}\/\d{4}/.test(req.body.dateOfReview)) throw "dateOfReview must be of the format MM/DD/YYYY";

        //Current date code slightly modified from here: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        
        if(req.body.dateOfReview != today) throw "dateOfReview must be the current date";
    } catch(e) {
        res.status(400).json({message: e.toString()})
        return;
    }

    try{
        const restaurant = await reviews.create(req.params.restaurantId, req.body.title, req.body.reviewer, req.body.rating, req.body.dateOfReview, req.body.review);
        res.json(restaurant);
        return;
    } catch(e){
        res.status(400).json({message: e.toString()})
        return;
    }
});

router.get('/review/:reviewId', async(req, res) => {
    try{
        const review = await reviews.get(req.params.reviewId)
        res.json(review);
        return;
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.toString() });
        return;
    }
});

router.delete('/:reviewId', async(req, res) => {
    try{
        await reviews.remove(req.params.reviewId);
        res.json({reviewId: req.params.reviewId, deleted: true});
    } catch(e){
        res.status(404).json({message: e.toString()});
    }
});

module.exports = router;