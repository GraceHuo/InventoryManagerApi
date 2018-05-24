var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String
  }
});

module.exports = mongoose.model('location', LocationSchema);
