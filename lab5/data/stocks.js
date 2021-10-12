const axios = require('axios');

async function getStocks(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
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

async function getStockById(id){
    type_checker(id, "string", "Argument must be a nonempty string");

    try{
        const stocks = await getStocks();
        let retObj = {};
        stocks.forEach(obj => {
            if(obj["id"] == id) retObj = obj;
        });
        if(Object.entries(retObj).length == 0){
            throw "Error: stock not found";
        }
        return retObj;
    } catch(e){
        throw e;
    }
}

module.exports = {
    getStocks,
    getStockById
};