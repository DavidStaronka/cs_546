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

async function sameStreet(streetName, streetSuffix){
    type_checker(streetName, "string", "Argument 1 must be a non-empty string");
    type_checker(streetSuffix, "string", "Argument 2 must be a non-empty string");

    try{
        const people = await getPeople();
        let retArr = [];
        people.forEach(obj => {
            if((obj["address"]["home"]["street_name"].toLowerCase() == streetName.toLowerCase() && obj["address"]["home"]["street_suffix"].toLowerCase() == streetSuffix.toLowerCase()) || (obj["address"]["work"]["street_name"].toLowerCase() == streetName.toLowerCase() && obj["address"]["work"]["street_suffix"].toLowerCase() == streetSuffix.toLowerCase())){ 
                retArr.push(obj);
            }
        });
        if(retArr.length < 2){
            throw "fewer than 2 people found with this as either their home or work address.";
        }
        return retArr;
    } catch(e){
        throw e;
    }
}

async function manipulateSsn(){
    try{
        const people = await getPeople();
        let retVal = 0;
        let highest = 0;
        let highestName = "";
        let lowest = 99999999999;
        let lowestName = "";
        people.forEach(obj => {
            let sortNum = parseInt(obj["ssn"].split('').sort().join('').substring(2));
            retVal += sortNum;
            if(sortNum > highest){
                highest = sortNum;
                highestName = {firstName: obj["first_name"], lastName: obj["last_name"]};
            }
            if(sortNum < lowest){
                lowest = sortNum;
                lowestName = {firstName: obj["first_name"], lastName: obj["last_name"]};
            }
        });
        return {highest: highestName, lowest: lowestName, average: Math.floor(retVal/people.length)};
    } catch(e){
        throw e;
    }
}

function date_checker(month, day){
    try{
        type_checker(month, "number", "");
    } catch(e){
        type_checker(month, "string", "First argument must be a valid month (1 - 12)");
        month = parseInt(month);
    }

    try{
        type_checker(day, "number", "");
    } catch(e){
        type_checker(day, "string", "Second argument must be a valid date within the given month");
        day = parseInt(day);
    }

    if(month > 1 && month < 12){
        if((month == 4 || month == 6 || month == 9 || month == 11)){
            if(day > 0 && day < 31){
                return;
            } else {
                throw "Second argument must be a valid date within the given month";
            }
        } 
        if(month == 2){
            if(day > 0 && day < 28){
                return;
            } else {
                throw "Second argument must be a valid date within the given month";
            }
        }
        if(day > 0 && day < 32){
            return;
        }
        throw "Second argument must be a valid date within the given month";
    }
    throw "First argument must be a valid month (1 - 12)";
}

// 9, 4, 6, 11
async function sameBirthday(month, day){
    date_checker(month, day);

    try{
        const people = await getPeople();
        let retArr = [];
        people.forEach(obj => {
            let curDob = obj["date_of_birth"];
            curMon = curDob.substring(0, 2);
            // console.log(curMon);
            curDay = curDob.substring(3, 5);
            if(curMon == month && curDay == day){
                retArr.push(`${obj["first_name"]} ${obj["last_name"]}`);
            }
        });
        if(retArr.length == 0){
            throw "No one found with the given birthday.";
        }
        return retArr;
    } catch(e){
        throw e;
    }
}

module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
};
