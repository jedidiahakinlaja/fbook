const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({

    senderId:{
        type: String
    },
   
    image:{
        type: String
    },
   postpicId:{
      type:mongoose.Schema.Types.ObjectId, ref:'userDetails'
   },
   friendId:{
     type:mongoose.Schema.Types.ObjectId, ref:'friend'
   }

});

module.exports = mongoose.model('postpics', friendSchema);