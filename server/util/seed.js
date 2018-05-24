var User = require('../api/user/userModel');
var Category = require('../api/category/categoryModel');
var Location = require('../api/location/locationModel');
var Item = require('../api/item/itemModel');

var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
  {username: 'demo', password: 'demo'},
  {username: 'test', password: 'test'}
];

var categories = [
  {name: 'toys'},
  {name: 'tools'},
  {name: 'clothes'}
];

var locations = [
  {name: 'closet1', description: "closet in the master room"},
  {name: 'closet2', description: "closet in the second floor"},
  {name: 'closet3', description: "closet in the kitchen"}
];

var items = [
  {name: 'knife', description: 'knife description', quantity: 5, price: 100},
  {name: 'lego', description: 'lego description', quantity: 3, price: 20},
  {name: 'toy car', description: 'toy car description', quantity: 7, price: 120}
];

var createThing = function(model, thing) {
  return new Promise(function(resolve, reject) {
    new model(thing).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User, Category, Location, Item]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
};

var createUsers = function(data) {
  logger.log('... creating users');
  var promises = users.map(function(user) {
    return createThing(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

var createCategories = function(data) {
  logger.log('... creating categories');
  var promises = categories.map(function(category) {
    return createThing(Category, category);
  });

  return Promise.all(promises)
    .then(function(categories) {
      return _.merge({categories: categories}, data || {});
    });
};

var createLocations = function(data) {
  logger.log('... creating locations');
  var promises = locations.map(function(location) {
    return createThing(Location, location);
  });

  return Promise.all(promises)
    .then(function(locations) {
      return _.merge({locations: locations}, data || {});
    });
};

var createItems = function(data) {
  logger.log('... creating items');

  var newItems = items.map(function(item, i) {
    item.owner = data.users[i % data.users.length]._id;
    item.location = data.locations[i % data.locations.length]._id;
    item.categories = [data.categories[i % data.categories.length]._id];
    return createThing(Item, item);
  });

  return Promise.all(newItems)
    .then(function(items) {
      return _.merge({items: items}, data || {});
    })
    .then(function() {
      return 'Seeded DB with Users, Categories, Locations and Items!';
    });
};

cleanDB()
  .then(createUsers)
  .then(createLocations)
  .then(createCategories)
  .then(createItems)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
