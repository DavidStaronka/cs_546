const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

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
        if(req.session.error != undefined){
            res.render("forms/form", {title: "Login", action:"/login", redirect: "/signup", in_out: "Need to register? Click here to sign-up", error: req.session.error});
            req.session.error = undefined;
        } else {
            res.render("forms/form", {title: "Login", action:"/login", redirect: "/signup", in_out: "Need to register? Click here to sign-up"});
        }
        return;
    } catch(e){
        console.log(e);
        return;
    }
});

router.post('/login', async(req, res) => {
    try{
        type_checker(req.body.username, "string", "Username must be at least 4 characters long and contain only alphanumeric characters.");
        if(/.*[^A-Za-z0-9].*/.test(req.body.username) || req.body.username.length < 4) throw "Username must be at least 4 characters long and contain only alphanumeric characters."
        type_checker(req.body.password, "string", "Password must be at least 6 characters long and not contain any spaces.")
        if(/.*\s.*/.test(req.body.password) || req.body.password < 6) throw "Password must be at least 6 characters long and not contain any spaces."
    } catch(e) {
        req.session.error = e.toString();
        return res.status(400).redirect('/');
        
    }

    try{
        const response = await users.checkUser(req.body.username, req.body.password);
        //console.log(response);
        if(response == undefined){
            req.session.error = "Internal Server Error"
            res.status(500).redirect('/');
        }
        if(response.authenticated){
            //console.log("User inserted");
            req.session.user = {username: req.body.username, password: req.body.password};
            return res.redirect('/private');
        }
    } catch(e){
        //console.log(e);
        req.session.error = e.toString();
        return res.status(400).redirect('/');
        
    }
});

router.get('/signup', async (req, res) => {
    try{
        if(req.session.error != undefined){
            res.render("forms/form", {title: "Signup", action:"/signup", redirect: "/", in_out: "Already have an account? Click here to log-in", error: req.session.error});
            req.session.error = undefined;
        } else {
            res.render("forms/form", {title: "Signup", action:"/signup", redirect: "/", in_out: "Already have an account? Click here to log-in"});
        }
        return;
    } catch(e){
        //console.log(e);
        return;
    }
    
});

router.post('/signup', async(req, res) => {
    try{
        type_checker(req.body.username, "string", "Username must be at least 4 characters long and contain only alphanumeric characters.");
        if(/.*[^A-Za-z0-9].*/.test(req.body.username) || req.body.username.length < 4) throw "Username must be at least 4 characters long and contain only alphanumeric characters."
        type_checker(req.body.password, "string", "Password must be at least 6 characters long and not contain any spaces.")
        if(/.*\s.*/.test(req.body.password) || req.body.password.length < 6) throw "Password must be at least 6 characters long and not contain any spaces."
    } catch(e) {
        req.session.error = e.toString();
        return res.status(400).redirect('/signup');
        
    }

    try{
        const response = await users.createUser(req.body.username, req.body.password);
        //console.log(response);
        if(response == undefined){
            req.session.error = "Internal Server Error";
            return res.status(500).redirect('/signup');
        }
        if(response.userInserted){
            return res.redirect('/');
        }
    } catch(e){
        req.session.error = e.toString();
        return res.status(400).redirect('/signup');
        
    }
});

router.get('/private', async(req, res) => {
    // //console.log(req.session.user);
    return res.render("pages/private", {title: "Private Page", user: req.session.user.username});
    
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    return res.render("pages/logout", {title: "Logout"});
    
});

module.exports = router;