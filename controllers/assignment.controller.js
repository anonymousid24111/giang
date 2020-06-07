var massignment = require('../models/assignment.model');
module.exports.getAll = async function(req, res) {
    var allassignment = await massignment.find({});
    res.status(200).json(allassignment);
};
module.exports.getOne = async function(req, res) {
    var oneassignment = await massignment.findById(req.params.id, function(err, docs){
        if (err) {
            res.status(400).json(err); 
        }

    });
    // console.log(oneassignment)
    if(oneassignment){
        res.status(200).json(oneassignment);
    }
    else{
        res.status(400).json("khac 1 assignment");
    }
};
module.exports.put = async function(req, res) {
    var json = '';
    if (req.body.newstatus != null) {
        await massignment.findByIdAndUpdate(req.params.id, {status: req.body.newstatus, data: Date()});
        json+='status updated,'
    }
    if (req.body.newtitle != null) {
        await massignment.findByIdAndUpdate(req.params.id, {title: req.body.newtitle});
        json+='title updated,'
    }
    if (req.body.newcontent != null) {
        await massignment.findByIdAndUpdate(req.params.id, {content: req.body.newcontent});
        json+='content updated,'
    }
    if (req.body.newsender != null) {
        await massignment.findByIdAndUpdate(req.params.id, {sender: req.body.newsender}, function(err, docs){
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
    // var existed = await massignment.findOne({status: req.body.status});
    // // console.log(existed)
    // if(existed) return res.status(400).json('assignment existed')
    if (req.body.title == null) {
        res.status(400).json("Null title");
    }
    else if(req.body.sender == null){
        res.status(400).json("Null sender");
    }
    else if(req.body.status == null){
        res.status(400).json("Null status");
    }
    else if(req.body.content == null){
        res.status(400).json("Null content");
    }
    else {
        var result = await new massignment({
            "status" : req.body.status,
            "title" : req.body.title,
            "sender" : req.body.sender,
            "content" : req.body.content,
        }).save();
        res.status(200).json(result);
    }
}
module.exports.delete = async function(req, res){
    await massignment.findByIdAndDelete(req.params.id);
    res.status(200).json('assignment deleted')
}