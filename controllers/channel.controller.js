var mchannel = require('../models/channel.model');
var mteam = require('../models/team.model')
var mpost = require('../models/post.model')
var mongoose = require('mongoose')
module.exports.getAll = async function(req, res) {

    var allchannel = await mteam.findOne({_id: req.query.teamid}).populate({
        path: 'channel',
        populate:{
            path: 'post'
        }
    });
    res.status(200).json(allchannel);
};
module.exports.getOne = async function(req, res) {
    var onechannel = await mchannel.findById(req.params.id).populate({
        path: 'post',
        populate:{
            path: 'sender',
            select: 'username'
        }
    });
    // console.log(onechannel)
    if(onechannel){
        res.status(200).json(onechannel);
    }
    else{
        res.status(400).json("khac 1 channel");
    }
};
module.exports.put = async function(req, res) {
    var flag = false;
    if (req.body.newchannelname != null) {
        const r = await mchannel.replaceOne({_id: req.params.id}, {channelname: req.body.newchannelname});
        res.status(200).json(r);
        flag = true;
    }
    if (req.body.newPassword != null) {
        await mchannel.replaceOne({_id: req.params.id}, {password: req.body.newPassword});
        res.status(200).json("ngon");
        flag = true;
    }
    if (req.body.newEmail != null) {
        await mchannel.replaceOne({_id: req.params.id}, {email: req.body.newEmail});
        res.status(200).json("ngon");
        flag = true;
    }
    if (flag) res.status(400).json("None params");
}
module.exports.post = async function(req, res){
    if (req.body.channelname == null) {
        res.status(400).json("Null channelname");
        return;
    }
    else {var result = await new mchannel({
        _id: new mongoose.Types.ObjectId(),
        channelname : req.body.channelname,
    }).save();
    await mteam.findByIdAndUpdate(req.body.teamid,{
        $push:{
            channel: [result._id]
        }
    })
    res.status(200).json("ngon");}
    // if (req.body.channelname == null) {
    //     res.status(400).json("Null channelname");
    //     return;
    // } else {
    // }
}

