const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: { 
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user'
      },
  imagePath: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
   }

});

module.exports = mongoose.model('post', postSchema);