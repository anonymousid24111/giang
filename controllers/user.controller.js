var muser = require('../models/user.model');
var jwt = require('jsonwebtoken')
module.exports.getAll = async function(req, res) {
    var alluser = await muser.find({},"username");
    res.status(200).json(alluser);
};
module.exports.getOne = async function(req, res) {
    var oneuser = await muser.findById(req.params.id, function(err, docs){
        if (err) {
            res.status(201).json(err);
        }
    });
    // console.log(oneuser)
    if(oneuser){
        res.status(200).json(oneuser);
    }
    else{
        res.status(201).json("khac 1 user");
    }
};
module.exports.put = async function(req, res) {
    var json = '';
    if (req.body.newusername != null) {
        await muser.findByIdAndUpdate(req.params.id, {username: req.body.newusername});
        json+='username updated,'
    }
    if (req.body.newpassword != null) {
        await muser.findByIdAndUpdate(req.params.id, {password: req.body.newpassword});
        json+='password updated,'
    }
    if (req.body.newemail != null) {
        await muser.findByIdAndUpdate(req.params.id, {email: req.body.newemail});
        json+='email updated'
    }
    console.log(json)
    if (!json) res.status(201).json("no updated")
    else res.status(200).json(json)
}
module.exports.post = async function(req, res){
    var existed = await muser.findOne({username: req.body.username});
    // console.log(existed)
    if(existed) return res.status(201).json('user existed')
    if (req.body.password == null) {
        res.status(201).json("Null password");
    } else {
        var result = await new muser({
            "username" : req.body.username,
            "password" : req.body.password,
        }).save();
        res.status(200).json(result);
    }
}
module.exports.delete = async function(req, res){
    await muser.findByIdAndDelete(req.params.id);
    res.status(200).json('user deleted')
}

module.exports.login =async (req, res)=>{

    const oneuser = await muser.findOne({username: req.body.username});
    if (oneuser) {
        const pass = await muser.findOne({username: req.body.username, password: req.body.password});
        if (pass) {
            var token = jwt.sign({username: req.body.username}, "key",{ expiresIn: 30});
            console.log(pass)
            res.status(200).json({
                token: token,
                username: req.body.username,
                userid:  pass._id
                })
        } else {
            res.status(201).send('pass khong dung')
        }
    }
    else{
        res.status(201).send('user not found')
    }
    console.log(req.body)
    
  }
  module.exports.signup = async (req, res)=>{
    var existed = await muser.findOne({username: req.body.username});
    console.log('adsjflkjjakldsfjkl')
    console.log(existed)
    if(existed) return res.status(201).json('user existed')
    if (req.body.password == null) {
        res.status(201).json("Null password");
    } else {
        var result = await new muser({
            username : req.body.username,
            password : req.body.password,
        }).save();
        res.status(200).json(result);
    }
  }