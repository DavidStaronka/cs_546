const restRoutes = require('./restaurants');
const reviewsRoutes = require('./reviews');

const constructorMethod = (app) => {
  app.use('/restaurants', restRoutes);
  app.use('/reviews', reviewsRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;