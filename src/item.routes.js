var itemRouter = require('express').Router();
var _          = require( 'lodash' );

var items = [
  {
    "id"         : "0",
    "name"       : "Knife",
    "description": "Knife Description",
    "location"   : 1,
    "category"   : 0,
    "quantity"   : 10,
    "price"      : 3
  },
  {
    "id"         : "1",
    "name"       : "Cloth",
    "description": "Cloth Description",
    "location"   : 1,
    "category"   : 0,
    "quantity"   : 4,
    "price"      : 13
  }];

var id = 1;

itemRouter.param( 'id', function( req, res, next, id ) {
  var item  = _.find( items, { id: id } );
  var index = _.findIndex( items, { id: id } );
  if ( item ) {
    req.item  = item;
    req.index = index;
    next();
  }
  else {
    res.status( 404 ).send( {} );
  }
} );

itemRouter.get( '/', function( req, res ) {
  res.json( items );
} );

itemRouter.get( '/:id', function( req, res ) {
  res.json( req.item || {} );
} );

var updateId = function( req, res, next ) {
  id++;
  req.body.id = id + '';
  next();
};

itemRouter.post( '/', updateId, function( req, res ) {
  var item = req.body;
  items.push( item );
  res.status( 201 ).send( item );
} );

itemRouter.put( '/:id', updateId, function( req, res ) {
  var update = req.body;
  // cannot update the id
  if ( update.id ) {
    delete update.id;
  }
  var updatedItem = _.assign( items[req.index], update );
  res.json( updatedItem );
} );

itemRouter.delete( '/:id', function( req, res ) {
  var deletedItem = items[req.index];
  items.splice( req.index, 1 );
  res.json( deletedItem );
} );

module.exports = itemRouter;