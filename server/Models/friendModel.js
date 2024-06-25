const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
  senderId: { 
          type: String,
          required: true
      },
  receiverId: { 
          type: String,
          required: true
   },
   stat:{
        type: String,
   }

});

module.exports = mongoose.model('friend', friendSchema);