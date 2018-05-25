process.env.NODE_ENV = "testing";

var app     = require( '../server/server' );
var request = require( 'supertest' );
var expect  = require( 'chai' ).expect;
var mongoose = require('mongoose');
var _ = require('lodash');

describe( '[LOCATION]', function() {

  var token = null;

  before(function(done) {
    _.forEach(mongoose.connection.collections, function(collection){
      collection.remove(function() {});
    });
    return done();
  });

  before(function(done) {
    request(app)
      .post('/api/users')
      .send({ username: "test", password: "test" })
      .end(function(err, res) {
        return done();
      });
  });

  before(function(done) {
    request(app)
      .post('/auth/signin')
      .send({ username: "test", password: "test" })
      .end(function(err, res) {
        token = res.body.token;
        return done();
      });
  });

  it( 'should get all locations', function( done ) {
    request( app )
      .get( '/api/locations' )
      .set( 'Accept', 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, resp ) {
        expect( resp.body ).to.be.an( 'array' );
        return done();
      } );
  } );

  it( 'should create a location', function( done ) {
    var location = {
      name: 'locationName'
    };
    request( app )
      .post( '/api/locations' )
      .send( location )
      .set( 'Accept', 'application/json' )
      .set( 'Authorization', 'Bearer ' + token)
      .expect( 'Content-Type', /json/ )
      .expect( 201 )
      .end( function( err, resp ) {
        expect( resp.body ).to.be.an( 'object' );
        expect( resp.body.name ).to.eql( 'locationName' );
        return done();
      } );
  } );

  it( 'should delete a location', function( done ) {
    var location = {
      name: 'deleteName'
    };
    request( app )
      .post( '/api/locations' )
      .send( location )
      .set( 'Accept', 'application/json' )
      .set( 'Authorization', 'Bearer ' + token)
      .end( function( err, resp ) {
        var location = resp.body;
        request(app)
          .delete('/api/locations/' + location._id)
          .set( 'Authorization', 'Bearer ' + token)
          .end(function(err, resp){
            expect( resp.body ).to.be.an( 'object' );
            expect( resp.body ).to.eql( location );
            return done();
          });
      } );
  } );

  it( 'should put a location', function( done ) {
    var location = {
      name: 'oldName'
    };
    request( app )
      .post( '/api/locations' )
      .send( location )
      .set( 'Accept', 'application/json' )
      .set( 'Authorization', 'Bearer ' + token)
      .end( function( err, resp ) {
        var location = resp.body;
        request(app)
          .put('/api/locations/' + location._id)
          .set( 'Authorization', 'Bearer ' + token)
          .send({
            name:'newName'
          })
          .end(function(err, resp){
            expect( resp.body ).to.be.an( 'object' );
            expect( resp.body.name ).to.eql( 'newName' );
            return done();
          });
      } );
  } );
} );


