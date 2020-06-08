var muser = require('../models/user.model');
var mteam = require('../models/team.model');
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
            path: 'message',
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
    if (!req.body.teamname) {
        res.status(201).send("teamname miss")
    }
    else{

        const newteam =await new mteam({
            _id: new mongoose.Types.ObjectId(),
            admin: [req.cookies.userid],
            date: Date(),
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

