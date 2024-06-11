const Profile = require('../Models/profileModel');

exports.getProfiles =(req, res) => {
  Profile.find()
      .then((data) => {
          res.json(data);
      })
      .catch(() => {
          console.log('Error fetching entries')
      })
  };
  
  exports.postProfile = (req, res) => {
    const { name } = req.body;
    const imagePath = 'http://localhost:5500/images/' + req.file.filename; // Note: set path dynamically
    const {username}= req.body;
    const profile = new Profile({
      name,
      imagePath,
      username
    });
    const createdProfile = profile.save();
    res.status(201).json({
      profile: {
        ...createdProfile._doc,
      },
    });
  };

  exports.getImageByUsername =(req,res)=>{
    const { usernameId } = req.params;
    
    Profile.find({username:usernameId }, {})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
  }