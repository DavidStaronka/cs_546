const routes = require('./route');

const constructorMethod = (app) => {
  app.use('/', routes);
    
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Nope' });
  });
};

module.exports = constructorMethod;