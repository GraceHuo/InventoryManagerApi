var categoryRouter = require('express').Router();
var _          = require( 'lodash' );

var categories = [
  {
    "id"         : "0",
    "name"       : "c1",
    "description": "d1"
  },
  {
    "id"         : "1",
    "name"       : "c2",
    "description": "d2"
  }];

var id = 1;

categoryRouter.param( 'id', function( req, res, next, id ) {
  var category  = _.find( categories, { id: id } );
  var index = _.findIndex( categories, { id: id } );
  if ( category ) {
    req.category  = category;
    req.index = index;
    next();
  }
  else {
    res.status( 404 ).send( {} );
  }
} );

categoryRouter.get( '/', function( req, res ) {
  res.json( categories );
} );

categoryRouter.get( '/:id', function( req, res ) {
  res.json( req.category || {} );
} );

var updateId = function( req, res, next ) {
  id++;
  req.body.id = id + '';
  next();
};

categoryRouter.post( '/', updateId, function( req, res ) {
  var category = req.body;
  categories.push( category );
  res.status( 201 ).send( category );
} );

categoryRouter.put( '/:id', updateId, function( req, res ) {
  var update = req.body;
  // cannot update the id
  if ( update.id ) {
    delete update.id;
  }
  var updatedcategory = _.assign( categories[req.index], update );
  res.json( updatedcategory );
} );

categoryRouter.delete( '/:id', function( req, res ) {
  var deletedcategory = categories[req.index];
  categories.splice( req.index, 1 );
  res.json( deletedcategory );
} );

module.exports = categoryRouter;