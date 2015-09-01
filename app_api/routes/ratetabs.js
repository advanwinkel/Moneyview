var ctrl = require('../controllers/ratetabs');

module.exports = function(app){
  // locations
  app.get('/api/ratetabs', ctrl.ratetabsListByCategory);
};