const restaurants = require("./data/restaurants");

async function main(){
    let papa = 0;
    try{
        papa = await restaurants.create("Papa's Food Restaurantaria", "2 Street St.", "999-999-9999", "http://www.papafood.com", "$", ["food1", "food2"], 5, {dineIn: true, takeOut: true, delivery: true});
    } catch(e){
        console.log(e);
    }
    // 2
    console.log(papa);
}

main();