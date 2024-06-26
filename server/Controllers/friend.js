const Friend = require('../Models/friendModel');

exports.friendRegister =async (req, res) => {

        const { senderId, receiverId, stat } = req.body;

        const friendObj = new Friend ({
            senderId, 
            receiverId,
            stat
        });

       await friendObj.save()
        .then(response => {
            res.status(200).json({
                message: "Friend Request Saved Successfully",
                friendrequest: response
            }) 
        })
        .catch( err => {
            res.status(500).json({ error: err })
        })

}


exports.getFriends= async (req, res) => {
    await Friend.find()
     .then((data) => {
         res.json({data});
     })
     .catch(() => {
         console.log('Error fetching entries')
     })
 }


 exports.getBySenderId = (req, res) => {


    const { senderId } = req.params;
    const updatedMovies = req.body
    
    Friend.find({senderId:senderId},{})
        .then(response => {
            res.status(200).json({
                message: "Request Successfully Acccepted",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

 exports.putBySenderId = (req, res) => {


    const { senderId } = req.params;
    // const sendres = req.body
    
    Friend.updateOne({senderId:senderId},{ $set:
        {
            stat: req.body.stat
         }
    })
        .then(response => {
            res.status(200).json({
                message: "Request Successfully Acccepted",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
