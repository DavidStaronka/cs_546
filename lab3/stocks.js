const axios = require('axios');
const people = require('./people.js');

async function getStocks(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
        return data; // this will be the array of people object
    } catch(e){
        throw e;
    }
}

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

async function listShareholders(){
    try{
        const stocks = await getStocks();
        let retArr = [];
        // Dictionary for memoization. still not fast, but much faster
        let dict = {};
        for(const stock of stocks){
            let tempObj = {};
            tempObj['id'] = stock['id'];
            tempObj['stock_name'] = stock['stock_name'];
            tempObj['shareholders'] = [];
            for(const holder of stock['shareholders']){
                let person = {};
                if(!dict[holder['userId']]){
                    // Note to self, do not await in a forEach loop
                    person = await people.getPersonById(holder['userId']);
                    dict[holder['userId']] = person;
                } else {
                    person = dict[holder['userId']]
                }
                let temp2 = {};
                temp2['first_name'] = person['first_name'];
                temp2['last_name'] = person['last_name'];
                temp2['number_of_shares'] = holder['number_of_shares'];
                tempObj['shareholders'].push(temp2);
            }
            retArr.push(tempObj);
        }
        return retArr;
    } catch(e){
        throw e;
    }
}

async function topShareholder(stockName){
    type_checker(stockName, "string", "Argument must be a non-empty string");

    try{
        const stocks = await getStocks();
        let retName = "";
        let retStock = 0;
        let found = false;

        for(const stock of stocks){
            if(stockName == stock["stock_name"]){
                found = true;
                for(const holder of stock['shareholders']){
                    if(holder['number_of_shares'] > retStock){
                        person = await people.getPersonById(holder['userId']);

                        retStock = holder['number_of_shares'];
                        retName = `${person['first_name']} ${person['last_name']}`
                    }
                }
            }
        }
        if(!found){
            throw "Stock not found with the given name"
        }
        if(retStock == 0){
            return `${stockName} currently has no shareholders.`
        }
        return `With ${retStock} shares in ${stockName}, ${retName} is the top shareholder.`;
    } catch(e){
        throw e;
    }
}

async function getPersonByName(firstName, lastName){
    try{
        const people = await getPeople();
        let retObj = {};
        people.forEach(obj => {
            if(obj["first_name"] == firstName && obj["last_name"] == lastName) retObj = obj;
        });
        if(Object.entries(retObj).length == 0){
            throw "Error: person not found";
        }
        return retObj;
    } catch(e){
        throw e;
    }
}

async function listStocks(firstName, lastName){
    type_checker(firstName, "string", "First argument must be a nonempty string");
    type_checker(lastName, "string", "Second argument must be a nonempty string");

    try{
        const holderFromId = await getPersonByName(firstName, lastName);
        const stocks = await getStocks();
        let retArr = [];

        for(const stock of stocks){
            for(const holder of stock['shareholders']){
                if(holder['userId'] == holderFromId['id']){
                    let tempObj = {stock_name: stock['stock_name'], number_of_shares: holder['number_of_shares']};
                    retArr.push(tempObj);
                }
            }
        }
        if(retArr.length == 0){
            throw "Given person does not own stock"
        }
        return retArr;
    } catch(e){
        throw e;
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
            throw "Error: person not found";
        }
        return retObj;
    } catch(e){
        throw e;
    }
}

module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
};