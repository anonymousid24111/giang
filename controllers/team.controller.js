var muser = require('../models/user.model');
var mteam = require('../models/team.model');
var mchannel = require('../models/channel.model')
var mpost = require('../models/post.model')
var mongoose = require('mongoose')
module.exports.getAll = async function(req, res) {
    var data = await muser.findOne({username: req.cookies.username},"team").populate({
        path: 'team',
        populate:{
            path: 'admin',
            // match: { username: req.cookies.username },
            // username: req.cookies.username,
            select: 'username'
        }
        ,
        // match: { "team.teamname": "team1" },
      });
    res.status(200).json(data);
};
module.exports.getOne = async function(req, res) {
    console.log(req.params.id)
    if (!req.params.id) {
        res.status(201).json('khong co params')
    }
    else{
        var oneUser = await mteam.findById(req.params.id, function(err, docs){
            if (err) {
                res.status(400).json(err)
            }
        }).populate({
            path: 'member',
            select: 'username'
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
    if (!req.body.teamname) {
        res.status(201).send("teamname miss")
    }
    else{

        const newteam =await new mteam({
            _id: new mongoose.Types.ObjectId(),
            admin: [req.cookies.userid],
            date: Date(),
            member: [req.cookies.userid],
            teamname: req.body.teamname
        })
        const user = await muser.findByIdAndUpdate(req.cookies.userid,{
            $push:{
                team: newteam._id
            },
        })
        newteam.save();
        // user.save();
        res.status(200).send('post method team')
    }
}
module.exports.remove = async (req, res)=>{
    await muser.findByIdAndUpdate(req.cookies.userid,{
        $pull:{
            team: req.params.id
        }
    })
    res.status(200).json('thanhcong')
}
module.exports.newmem = async (req, res)=>{
    var data = await muser.findOneAndUpdate({username: req.body.newmem},{
        $push:{
            team: [req.body.teamid]
        }
    })
    console.log(req.body.teamid)
    if (data) {
        // await mteam.findByIdAndUpdate(req.body.teamid)
        await mteam.findOneAndUpdate({_id: req.body.teamid, 'member':{$ne: data._id}},{
            $push:{
                member: [data._id]
            }
        })
        res.status(200).json('thang cong')
    } else {
        
        res.status(201).json("khong thay user ")
    }
}
module.exports.removemem = async (req, res)=>{
    var data = await muser.findOneAndUpdate({_id: req.query.mem},{
        $pull:{
            team: req.params.id
        }
    })
    await mteam.findOneAndUpdate({_id: req.params.id},{
        $pull:{
            member: data._id
        }
    })
    res.status(200).json('thanh cong')
}
module.exports.removechannel = async (req, res)=>{
    var data = await mteam.findOneAndUpdate({_id: req.query.teamid},{
        $pull:{
            channel: req.params.id
        }
    })
    await mchannel.findOneAndDelete({_id: req.params.id})
    res.status(200).json('thanh cong')
}
module.exports.removepost = async (req, res)=>{
    var data = await mchannel.findOneAndUpdate({_id: req.query.channelid},{
        $pull:{
            post: req.params.id
        }
    })
    await mpost.findOneAndDelete({_id: req.params.id})
    res.status(200).json('thanhcong')
}