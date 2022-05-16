const mongoose = require('mongoose');

const uriSchema = mongoose.Schema({

      shortCode: {
        type: String,
        unique: true,
     },
      url: {
        type: String,
     },
      startDate: {
        type: Date.UTC,
        unique: true,
     },
      lastSeenDate: {
        type: Date.UTC,
        unique: true,
     },
     redirectCount: {
        type: Number,
     }
    })

module.exports = mongoose.model('Uri', uriSchema)