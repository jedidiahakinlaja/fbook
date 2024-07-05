const PicsPost = require('../Models/picspostModel');

exports.PostPics =async (req, res) => {

        const { senderId,  postpicId, friendId  } = req.body;
        const { image} = 'http://localhost:5500/img/'+ req.file.filename
        const picsPostObj = new PicsPost ({
            senderId,
            image,
            postpicId,
            friendId
        });

       await picsPostObj.save()
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


exports.getPics= async (req, res) => {
    await PicsPost.find()
    .select()
    .populate('postpicId','image firstname lastname stat')
    .populate('friendId','receiverId stat img')
    .exec()
     .then((data) => {
         res.json(data);
     })
     .catch(() => {
         console.log('Error fetching entries')
     })
 }



 exports.getsenderId= (req,res)=>{

    const { senderId } = req.params;

        PicsPost.find({ senderId: senderId }, {})
        .select()
        .populate('postpicId','image firstname lastname, stat')
        .populate('friendId','senderId')
        .exec()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

        
}
