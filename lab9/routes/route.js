const express = require('express');
const router = express.Router();
const path = require('path');

const md5 = require('blueimp-md5');
const { default: axios } = require('axios');
const publickey = 'a929b3cec4ce202cbd929a563541589a';
const privatekey = 'a0643c86dcceb3551471c50f1cfd2220b46a4e14';



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

router.get('/', async (req, res) => {
    try{
        res.sendFile(path.resolve('static/search.html'));
    } catch(e){
        console.log(e);
        return;
    }

    
});

router.post('/search', async(req, res) => {
    try{
        if (!/\S/.test(req.body.searchTerm)) throw "Search term must be non-empty."
    } catch(e) {
        res.status(400).render("error/genericError", {title: "Error 400", errorMessage: e.toString()});
        return;
    }

    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?nameStartsWith=' + req.body.searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    try{
        let data = await axios.get(url);
        let dataList = data["data"]["data"]["results"];
        if(dataList.length > 20){
            dataList = dataList.slice(0, 20);
        }
        if(dataList.length === 0){
            throw "no results found"
        }

        res.render("characterPages/unordered", {title: "Characters Found", term: req.body.searchTerm, list: dataList});
    } catch(e){
        res.render("error/notFound", {title: "No Characters Found", searchTerm: req.body.searchTerm});
    }
});

router.get('/characters/:id', async(req, res) => {
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
    const url = baseUrl + req.params.id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    try{
        let data = await axios.get(url);
        let dataList = data["data"]["data"]["results"][0];
        let desc = dataList["description"];
        if(dataList["description"] == ''){
            desc = "N/A";
        }

        res.render("characterPages/individual", {title: dataList["name"], path: dataList["thumbnail"]["path"] + "/portrait_xlarge." + dataList["thumbnail"]["extension"], desc: desc, comics: dataList["comics"]["items"]});
    } catch(e){
        console.log(e);
        res.status(404).render("error/genericError", {title: "Error 404", errorMessage: "No character found with id: " + req.params.id})
    }
});
module.exports = router;