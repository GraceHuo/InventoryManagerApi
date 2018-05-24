var Location = require('./locationModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Location.findById(id)
    .then(function(location) {
      if (!location) {
        next(new Error('No location with that id'));
      }
      else {
        req.location = location;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Location.find({})
    .then(function(categories){
      res.json(categories);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var location = req.location;
  res.json(location);
};

exports.put = function(req, res, next) {
  var location = req.location;

  var update = req.body;

  _.merge(location, update);

  location.save(function(err, saved) {
    if (err) {
      next(err);
    }
    else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newlocation = req.body;

  Location.create(newlocation)
    .then(function(location) {
      res.json(location);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.location.remove(function(err, removed) {
    if (err) {
      next(err);
    }
    else {
      res.json(removed);
    }
  });
};
