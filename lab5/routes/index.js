const peopleRoutes = require('./people');
const stocksRoutes = require('./stocks');

const constructorMethod = (app) => {
  app.use('/people', peopleRoutes);
  app.use('/stocks', stocksRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;