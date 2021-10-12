const people = require("./people.js");
const stocks = require("./stocks.js")

async function main(){
    try{
        const persondata = await people.getPersonById('7989fa5e-8f3f-458d-ad58-23c8d9ef5a10');
        console.log ("Success: getPersonById");
    }catch(e){
        console.log (e);
    }

    try{
        const street = await people.sameStreet("Sutherland", "Point");
        console.log("Success: sameStreet");
    }catch(e){
        console.log (e);
    }

    try{
        const ssn = await people.manipulateSsn();
        console.log("Success: manipulateSsn");
    }catch(e){
        console.log (e);
    }

    try{
        const birthday = await people.sameBirthday(09, 25);
        console.log("Success: sameBirthday");
    }catch(e){
        console.log (e);
    }

    try{
        console.log("this one takes a minute")
        const shareholders = await stocks.listShareholders();
        console.log("Success: listShareholders");
    }catch(e){
        console.log (e);
    }

    try{
        const topS = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log("Success: topShareholder");
    }catch(e){
        console.log (e);
    }

    try{
        const stuff = await stocks.listStocks("Grenville", "Pawelke");
        console.log("Success: listStocks");
    }catch(e){
        console.log (e);
    }

    try{
        const stock = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log("Success: getStockById");
    }catch(e){
        console.log (e);
    }
}

//call main
main();