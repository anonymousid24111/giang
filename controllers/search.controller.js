var muser = require('.././models/user.model')
module.exports.getOne = async function(req, res) {
    var oneuser = await muser.find({username:{ $regex: '.*' + req.query.username + '.*' } }, function(err, docs){
        if (err) {
            res.status(400).json(err);
        }
    });
    // console.log(oneuser)
    // if(oneuser){
        res.status(200).json(oneuser);
    // }
    // else{
    //     res.status(400).json("khac 1 user");
    // }
};