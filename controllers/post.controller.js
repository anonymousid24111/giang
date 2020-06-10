var mpost = require('../models/post.model');
var mchannel = require('../models/channel.model')
var mongoose = require('mongoose')
module.exports.getAll = async function(req, res) {
    var allpost = await mpost.find();
    res.status(200).json(allpost);
};
module.exports.getOne = async function(req, res) {
    var onepost = await mpost.find({_id: req.params.id});
    if(onepost.length==1){
        res.status(200).json(onepost);
    }
    else{
        res.status(400).json("khac 1 post");
    }
};
module.exports.put = async function(req, res) {
    var flag = false;
    if (req.body.newpostname != null) {
        const r = await mpost.replaceOne({_id: req.params.id}, {postname: req.body.newpostname});
        res.status(200).json(r);
        flag = true;
    }
    if (req.body.newPassword != null) {
        await mpost.replaceOne({_id: req.params.id}, {password: req.body.newPassword});
        res.status(200).json("ngon");
        flag = true;
    }
    if (req.body.newEmail != null) {
        await mpost.replaceOne({_id: req.params.id}, {email: req.body.newEmail});
        res.status(200).json("ngon");
        flag = true;
    }
    if (flag) res.status(400).json("None params");
}
module.exports.post = async function(req, res){
    console.log("server nhan request")
    if (req.body.content == null) {
        res.status(400).json("Null Password");
        return;
    }
    else{
        var result = await new mpost({
            _id: new mongoose.Types.ObjectId(),
            content : req.body.content,
            sender: req.body.sender,
            date : Date(),
        }).save();
        await mchannel.findByIdAndUpdate(req.query.channelid,{
            $push:{
                post:[result._id]
            }
        })
        res.status(200).json("ngon");
    }
}

