const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    try{
        res.sendFile(path.resolve('static/home.html'));
    } catch(e){
        console.log(e);
        return;
    }

    
});
module.exports = router;