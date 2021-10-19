const restRoutes = require('./restaurants');
const reviewsRoutes = require('./reviews');

module.exports = {
    restaurants: restRoutes,
    reviews: reviewsRoutes
};