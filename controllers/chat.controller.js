var muser = require('../models/user.model');
var mchat = require('../models/chat.model');
var mmessage = require('../models/message.model');
var mongoose = require('mongoose')
module.exports.getAll = async function(req, res) {
    var data = await muser.findOne({username:req.cookies.username},"chat member").populate({
        path: 'chat',
        // select: 'chat',
        populate: [{ 
            path: 'message',
            populate:{
                path: "sender",
                select: 'username'
            },
            options:{ sort:{date : -1}}
            // select: ''
            // populate: {path: 'sender'},
            // populate: {path: 'viewer'},
            // populate: {path: 'react'}
        },
        { 
            path: 'member',
            
            // path: 'message',
            select: 'username'
        }],
        options:{ sort:{date : -1}}
      });
    res.status(200).json(data);
};
module.exports.getOne = async function(req, res) {
    console.log(req.params.id)
    if (!req.params.id) {
        res.status(201).json('khong co params')
    }
    else{
        var oneUser = await mchat.findById(req.params.id, function(err, docs){
            if (err) {
                res.status(400).json(err)
            }
        }).populate({
            path: 'message',
            populate:{
                path: 'sender'
            },
            options:{ sort:{date : -1}}
        })
        res.status(200).json(oneUser)

    }
};
module.exports.put = async function(req, res) {
    var flag = false;
    if (req.body.newUsername != null) {
        const r = await muser.replaceOne({_id: req.params.id}, {username: req.body.newUsername});
        res.status(200).json(r);
        flag = true;
    }
    if (req.body.newPassword != null) {
        await muser.replaceOne({_id: req.params.id}, {password: req.body.newPassword});
        res.status(200).json("ngon");
        flag = true;
    }
    if (req.body.newEmail != null) {
        await muser.replaceOne({_id: req.params.id}, {email: req.body.newEmail});
        res.status(200).json("ngon");
        flag = true;
    }
    if (flag) res.status(400).json("None params");
}
module.exports.post = async function(req, res){
    // console.log(req.body)
    if (!req.body.content) {
        res.status(201).send("content miss")
    }
    else{

        const message =await new mmessage({
            _id: new mongoose.Types.ObjectId(),
            sender: req.cookies.userid,
            viewer: req.body.receiver,
            date: Date(),
            content: req.body.content
        })
        const chat = await mchat.findByIdAndUpdate(req.params.id,{
            $push:{
                message: message._id
            },
            $set:{
                date: new Date()
            }
        })
        chat.save();
        message.save();
        res.status(200).send('post method chat')
    }
}
module.exports.postchat = async (req, res)=>{
    console.log('ahdsfja')
    var da = await muser.findOne({username: req.query.receiver})
    var nchat=await new mchat({
        _id: new mongoose.Types.ObjectId(),
        chatname: req.query.receiver,
        member: [ req.cookies.userid, da._id],
        date: Date(),
    }).save()
    await muser.findOneAndUpdate({_id: req.cookies.userid},{
        $push:{
            chat: nchat._id
        }
    })
    await muser.findOneAndUpdate({_id: da._id},{
        $push:{
            chat: nchat._id
        }
    })
    res.status(200)
}

