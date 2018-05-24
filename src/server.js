var express    = require( 'express' );
var bodyParser = require( 'body-parser' );
var _          = require( 'lodash' );
var itemRouter = require('./item.routes');
var categoryRouter = require('./category.routes');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use( express.static( 'client' ) );
app.use( bodyParser.urlencoded( {
  extended: true
} ) );
app.use( bodyParser.json() );
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);

// error handler
app.use( function( err, req, res, next ) {
  if ( err ) {
    console.log( 'err', err );
    res.status( 500 ).send( err );
  }
} );

// var port = 3000;
// app.listen( port, function() {
//   console.log( 'Listening on: ', port );
// } );
module.exports = app;
