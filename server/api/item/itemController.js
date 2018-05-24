var Item = require('./itemModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Item.findById(id)
    .populate('location owner categories username')
    .exec()
    .then(function(item) {
      if (!item) {
        next(new Error('No item with that id'));
      }
      else {
        req.item = item;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Item.find({})
    .populate('location owner categories')
    .exec()
    .then(function(items){
      res.json(items);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var item = req.item;
  res.json(item);
};

exports.put = function(req, res, next) {
  var item = req.item;

  var update = req.body;

  _.merge(item, update);

  item.save(function(err, saved) {
    if (err) {
      next(err);
    }
    else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newitem = req.body;
  newitem.author = req.user._id;

  Item.create(newitem)
    .then(function(item) {
      res.json(item);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.item.remove(function(err, removed) {
    if (err) {
      next(err);
    }
    else {
      res.json(removed);
    }
  });
};
