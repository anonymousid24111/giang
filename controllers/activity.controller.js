var mactivity = require('../models/activity.model');
module.exports.getAll = async function(req, res) {
    var allactivity = await mactivity.find({});
    res.status(200).json(allactivity);
};
module.exports.getOne = async function(req, res) {
    var oneactivity = await mactivity.findById(req.params.id, function(err, docs){
        if (err) {
            res.status(400).json(err); 
        }

    });
    // console.log(oneactivity)
    if(oneactivity){
        res.status(200).json(oneactivity);
    }
    else{
        res.status(400).json("khac 1 activity");
    }
};
module.exports.put = async function(req, res) {
    var json = '';
    if (req.body.newsubject != null) {
        await mactivity.findByIdAndUpdate(req.params.id, {subject: req.body.newsubject, data: Date()});
        json+='subject updated,'
    }
    if (req.body.newlink != null) {
        await mactivity.findByIdAndUpdate(req.params.id, {link: req.body.newlink});
        json+='link updated,'
    }
    if (req.body.newsender != null) {
        await mactivity.findByIdAndUpdate(req.params.id, {sender: req.body.newsender}, function(err, docs){
            if (err) {
                res.status(400).json(err)
            }
        });
        json+='sender updated'
    }
    // console.log(json)
    if (!json) res.status(400).json("no updated")
    else res.status(200).json(json)
}
module.exports.post = async function(req, res){
    // var existed = await mactivity.findOne({subject: req.body.subject});
    // // console.log(existed)
    // if(existed) return res.status(400).json('activity existed')
    if (req.body.link == null) {
        res.status(400).json("Null link");
    }
    else if(req.body.sender == null){
        res.status(400).json("Null sender");
    }
    else if(req.body.subject == null){
        res.status(400).json("Null subject");
    }
    else {
        var result = await new mactivity({
            "subject" : req.body.subject,
            "link" : req.body.link,
            "sender" : req.body.sender,
        }).save();
        res.status(200).json(result);
    }
}
module.exports.delete = async function(req, res){
    await mactivity.findByIdAndDelete(req.params.id);
    res.status(200).json('activity deleted')
}