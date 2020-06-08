var mUser = require('../models/user.model');
module.exports.getAll = async function(req, res) {
    var allUser = await mUser.find();
    res.status(200).json(req.cookies.id);
};
module.exports.getOne = async function(req, res) {
    var oneUser = await mUser.find({_id: req.params.id});
    if(oneUser.length==1){
        res.status(200).json(oneUser);
    }
    else{
        res.status(400).json("khac 1 user");
    }
};
module.exports.put = async function(req, res) {
    var flag = false;
    if (req.body.newUsername != null) {
        const r = await mUser.replaceOne({_id: req.params.id}, {username: req.body.newUsername});
        res.status(200).json(r);
        flag = true;
    }
    if (req.body.newPassword != null) {
        await mUser.replaceOne({_id: req.params.id}, {password: req.body.newPassword});
        res.status(200).json("ngon");
        flag = true;
    }
    if (req.body.newEmail != null) {
        await mUser.replaceOne({_id: req.params.id}, {email: req.body.newEmail});
        res.status(200).json("ngon");
        flag = true;
    }
    if (flag) res.status(400).json("None params");
}
module.exports.post = async function(req, res){
    var result = await new mUser({
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

