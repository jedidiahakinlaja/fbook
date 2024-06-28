const User = require('../Models/userModel');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
exports.postRegister = (req, res) => {
    const { firstname, lastname, username, email,  password, dob, image } = req.body;
    bcrypt.hash(password,10)
      .then(hash=>{
        const userObj = new User ({
            firstname,
            lastname,
            username,
            email,
            dob,
           password:hash,
           image
        });
 
        userObj.save()
        .then(response => {
            res.status(200).json({
                message: "User Details Saved Successfully",
                signup: response
            }) 
        })
        .catch( err => {
            res.status(500).json({ error: err })
        })
    
    })
   
    
}



exports.postlogin = (req, res) => {
    const { username, password } = req.body;
    let userFound;
    User.findOne({
        username
    })
    .then(user => {
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }
        userFound= user
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message:"Password is incorrect"
            })
        }
        const token = jwt.sign({username:userFound.username,userId:userFound._id},"secret_string",{expiresIn:"1h"})
        return res.status(200).json({
            token:token,
            username:username,
            userId:userFound._id
        })
    })
    .catch( err => {
        res.status(401).json({ 
            message:'Error with authenication',
            error:err
         })
    })
}

exports.getUsers= async (req, res, next) => {
   await User.find()
    .then((data) => {
        res.json(data);
    })
    .catch(() => {
        console.log('Error fetching entries')
    })
}

exports.getUserByUsername =async (req, res) => {

    const { usernameId } = req.params;
    
   await User.find({username:usernameId }, {})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getUserByEmail = async (req, res) => {

    const { emailId } = req.params;
    
   await User.find({email:emailId }, {})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getUserById = async (req, res) => {

    const { id } = req.params;
    
    await User.findById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.putImageByUsername= (req,res)=>{

    const { usernameId } = req.params;

        User.findOneAndUpdate({username:usernameId }, {})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

        
}


exports.putImageById = (req, res) => {


    const { id } = req.params;
  
    
     User.updateOne({_id:id},{ $set:{

        image:'http://localhost:5500/img/'+ req.file.filename
       }
    })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
