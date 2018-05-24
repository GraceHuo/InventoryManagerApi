var app     = require( './server' );
var request = require( 'supertest' );
var expect  = require( 'chai' ).expect;

describe( '[ITEMS]', function() {

  it( 'should get all items', function( done ) {
    request( app )
      .get( '/items' )
      .set( 'Accept', 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, resp ) {
        expect( resp.body ).to.be.an( 'array' );
        done();
      } )
  } );

  it( 'should create a item', function( done ) {
    var item = {
      name: 'itemName'
    };
    request( app )
      .post( '/items' )
      .send( item )
      .set( 'Accept', 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 201 )
      .end( function( err, resp ) {
        expect( resp.body ).to.be.an( 'object' );
        expect( resp.body.name ).to.eql( 'itemName' );
        done();
      } )
  } );

  it( 'should delete a item', function( done ) {
    var item = {
      name: 'itemName'
    };
    request( app )
      .post( '/items' )
      .send( item )
      .set( 'Accept', 'application/json' )
      .end( function( err, resp ) {
        var item = resp.body;
        request(app)
          .delete('/items/' + item.id)
          .end(function(err, resp){
            expect( resp.body ).to.be.an( 'object' );
            expect( resp.body ).to.eql( item );
            done();
          });
      } )
  } );

  it( 'should delete a item', function( done ) {
    var item = {
      name: 'itemName'
    };
    request( app )
      .post( '/items' )
      .send( item )
      .set( 'Accept', 'application/json' )
      .end( function( err, resp ) {
        var item = resp.body;
        request(app)
          .put('/items/' + item.id)
          .send({
            name:'newName'
          })
          .end(function(err, resp){
            expect( resp.body ).to.be.an( 'object' );
            expect( resp.body.name ).to.eql( 'newName' );
            done();
          });
      } )
  } );
} );


