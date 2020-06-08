var muser = require('../models/user.model');
var mchat = require('../models/chat.model');
var mmessage = require('../models/message.model');
module.exports.getAll = async function(req, res) {
    var data = await muser.findOne({username:req.cookies.username},"chat member").populate({
        path: 'chat',
        // select: 'chat',
        populate: { 
            path: 'message',
            // select: ''
            // populate: {path: 'sender'},
            // populate: {path: 'viewer'},
            // populate: {path: 'react'}
        },
        // populate: { 
        // 	path: 'member',
        // }
      });
    res.status(200).json(data);
};
module.exports.getOne = async function(req, res) {
    var oneUser = await mchat.findById(req.params.id, function(err, docs){
        if (err) {
            res.status(400).json(e)
        }
    }).populate({
        path: 'message'
    })
    res.status(200).json(oneUser)
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
    var result = await new muser({
        "username" : req.body.username,
        "password" : req.body.password,
    }).save();
    if (req.body.password == null) {
        res.status(400).json("Null Password");
        return;
    } else {
        res.status(200).json("ngon");
    }
}

