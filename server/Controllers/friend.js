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