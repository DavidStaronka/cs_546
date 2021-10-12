const restaurants = require("./data/restaurants");

async function main(){
    let papa;
    let mama;
    let kiddo;
    let allRest;
    // 1
    try{
        papa = await restaurants.create("Papa's Food Restaurantaria", "2 Street St.", "999-999-9999", "http://www.papafood.com", "$", ["food1", "food2"], 5, {dineIn: true, takeOut: true, delivery: true});
    } catch(e){
        console.log(e);
    }
    // 2
    console.log(papa);

    // 3
    try{
        mama = await restaurants.create("Mama's No Food Restaurantaria", "3 Place Pl.", "888-888-8888", "http://www.mamanofood.com", "$$$$", ["not food1", "not food2"], 0, {dineIn: false, takeOut: false, delivery: false});
    } catch(e){
        console.log(e);
    }
    // console.log(mama);

    // 4
    try{
        allRest = await restaurants.getAll();
    } catch(e){
        console.log(e);
    }
    console.log(allRest);

    // 5
    try{
        kiddo = await restaurants.create("Kiddo's arguably Food Restaurantaria", "4 Drive Dr.", "777-777-7777", "http://www.kiddokindafood.com", "$$", ["maybe food1", "maybe food2"], 3, {dineIn: true, takeOut: false, delivery: true});
    } catch(e){
        console.log(e);
    }
    // 6
    console.log(kiddo);

    // 7
    try{
        papa = await restaurants.rename(papa["_id"].toString(), "http://www.papadefinitelyfood.com")
    } catch(e){
        console.log(e);
    }
    // 8
    console.log(papa);

    // 9
    try{
        await restaurants.remove(mama["_id"].toString());
    } catch(e){
        console.log(e);
    }

    // 10
    try{
        allRest = await restaurants.getAll();
    } catch(e){
        console.log(e);
    }
    console.log(allRest);

    // 11
    try{
        await restaurants.create("bad", "parameters");
    } catch(e){
        console.log("errors thrown for creating a restaurant with bad input parameters");
    }

    // 12
    try{
        await restaurants.remove("number");
    } catch(e){
        console.log("errors thrown for removing a restaurant that does not exist");
    }

    // 13
    try{
        await restaurants.rename("number");
    } catch(e){
        console.log("errors thrown for renaming a restaurant that does not exist");
    }

    // 14
    try{
        await restaurants.rename("200", "webname.name");
    } catch(e){
        console.log("errors thrown for renaming a restaurant passing in invalid data");
    }

    // 15
    try{
        await restaurants.getId("1234567899999999999999");
    } catch(e){
        console.log("errors thrown for getting a restaurant by ID that does not exist");
    }
}

main();