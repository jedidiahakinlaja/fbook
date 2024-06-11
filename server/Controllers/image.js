const image = require('../Models/imageModel');
const multer = require("multer");

exports.image=(req,res)=>{
    
    const Storage = multer.diskStorage({
        destination:'uploads',
        filename:(req,file,cb)=>{
            cb(null, file.originalname);
        }
    })
    
    const upload= multer({
        storage:Storage
    }).single("testImage");
    
        upload(req, res, (err)=>{
            if(err){
                console.log(err);
            }else{
                const newImage = new image({
                    name:req.body.name,
                    image:{
                        data:req.file.filename,
                        contentType:'image/jpg'
                    }
                })
                newImage.save()
                .then(()=>res.send('succesfully uploaded'))
                .catch((err)=>console.log(err));
            }
        })
    
   

   

}