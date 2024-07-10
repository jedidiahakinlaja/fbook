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
   },
   receiver_firstname:{
      type:String
   }, 
   receievr_lastname:{
      type:String
   }, 
   receiver_image:{
      type:String
   },
   img:{
      type:mongoose.Schema.Types.ObjectId, ref:'userDetails'
   }

});

module.exports = mongoose.model('friend', friendSchema);