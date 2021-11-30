const mongoCollections = require('../config/mongoCollections');
const bcrypt = require("bcrypt");
const salt = 10;
const users = mongoCollections.users;
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

async function createUser(username, password){
    type_checker(username, "string", "Username must be at least 4 characters long and contain only alphanumeric characters.");
    if(/.*[^A-Za-z0-9].*/.test(username) || username.length < 4) throw "Username must be at least 4 characters long and contain only alphanumeric characters."
    type_checker(password, "string", "Password must be at least 6 characters long and not contain any spaces.")
    if(/.*\s.*/.test(password) || password.length < 6) throw "Password must be at least 6 characters long and not contain any spaces."

    const userCollection = await users();
    const hash = await bcrypt.hash(password, salt);
    let user = await userCollection.findOne({username: username}, {"collation" : {"locale" : "en_US", "strength": 2 }});

    //console.log(user);
    if(user != null){
        throw "Username already exists";
    }

    let newUser = {
        username: username,
        password: hash
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';
    return {userInserted: true};
}

async function checkUser(username, password){
    type_checker(username, "string", "Username must be at least 4 characters long and contain only alphanumeric characters.");
    if(/.*[^A-Za-z0-9].*/.test(username) || username.length < 4) throw "Username must be at least 4 characters long and contain only alphanumeric characters."
    type_checker(password, "string", "Password must be at least 6 characters long and not contain any spaces.")
    if(/.*\s.*/.test(password) || password.length < 6) throw "Password must be at least 6 characters long and not contain any spaces."

    const userCollection = await users();
    let user = await userCollection.findOne({username: username}, {"collation" : {"locale" : "en_US", "strength": 2 }});

    console.log(user);

    if(user == null){
        throw "Either the username or password is invalid";
    }

    if(await bcrypt.compare(password, user['password'])){
        return {authenticated: true};
    }
    throw "Either the username or password is invalid";
}

module.exports = {
    createUser,
    checkUser
};