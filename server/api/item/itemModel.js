var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var ItemSchema = new Schema( {
  name: {
    type    : String,
    required: true
  },

  description: {
    type: String
  },

  location: {
    type: Schema.Types.ObjectId,
    required: true,
    ref : 'location'
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref : 'user'
  },

  categories: [{
    type: Schema.Types.ObjectId,
    ref : 'category'
  }],

  quantity: {
    type   : Number,
    default: 0
  },

  price: {
    type: Number
  }
} );

ItemSchema.index( { name: 1, location: 1 }, { unique: true } );

module.exports = mongoose.model( 'item', ItemSchema );
