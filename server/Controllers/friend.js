const Friend = require('../Models/friendModel');

exports.friendRegister = async (req, res) => {

                const { senderId, receiverId, stat, img,  receiver_firstname, receievr_lastname, receiver_image } = req.body;
            const friendObj =  Friend ({
                senderId, 
                receiverId,
                stat,
                img,
                receiver_firstname, 
                receievr_lastname, 
                receiver_image
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



exports.newFriend =async (req, res) => {

    const   { senderId, receiverId, stat, img, receiver_firstname, receievr_lastname, receiver_image } = req.body;

    const friendObj = new Friend ({
        senderId, 
        receiverId,
        stat,
        img,
        receiver_firstname, 
        receievr_lastname, 
        receiver_image
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
    .select()
    .populate('img','image firstname lastname stat, imagePost')
    .exec()
     .then((data) => {
         res.json(data);
     })
     .catch(() => {
         console.log('Error fetching entries')
     })
 }


 exports.getBySenderId = (req, res) => {


    const { senderId } = req.params;
    
    Friend.find({senderId:senderId},{})
    .populate('img','image firstname lastname imagePost')
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

 exports.putByReceiverId = (req, res) => {


    const { receiverId } = req.params;
     const stat = req.body
    
    Friend.updateOne({receiverId:receiverId},{ $set:
        {
            stat: req.body.stat
         }
    })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.putById = (req, res) => {


    const { id } = req.params;
    const { senderId, receiverId, stat, img } = req.body
    Friend.updateOne({_id:id},{
         $set:
        {
            stat
         }
    })
        .then(response => {
            res.status(200).json(response)
            console.log("impactedcl");
        })
        .catch(err => {
            console.log('not impacted');
            res.status(500).json({ error: err });
        })
}

exports.getByReceiverId = (req, res) => {


    const { receiverId } = req.params;
    
    Friend.find({receiverId:receiverId},{})
        .populate('img','image firstname lastname')
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
