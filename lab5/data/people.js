const axios = require('axios');

async function getPeople(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
        return data; // this will be the array of people object
    } catch(e){
        throw e;
    }
}

function type_checker(item, type, errString){
    if(item == undefined || typeof(item) != type || item.length == 0) throw errString;
    if(type == "string"){
        //got this if statement from stack overflow here: https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
        if (!/\S/.test(item)) throw errString;
    }
}

async function getPersonById(id){
    type_checker(id, "string", "Argument must be a nonempty string");

    try{
        const people = await getPeople();
        let retObj = {};
        people.forEach(obj => {
            if(obj["id"] == id) retObj = obj;
        });
        if(Object.entries(retObj).length == 0){
            throw "Error: person not found";
        }
        return retObj;
    } catch(e){
        throw e;
    }
}

module.exports = {
    getPeople,
    getPersonById
};