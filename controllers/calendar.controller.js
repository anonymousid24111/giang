var mcalendar = require('../models/calendar.model');
module.exports.getAll = async function(req, res) {
    var allcalendar = await mcalendar.find({});
    res.status(200).json(allcalendar);
};
module.exports.getOne = async function(req, res) {
    var onecalendar = await mcalendar.findById(req.params.id, function(err, docs){
        if (err) {
            res.status(400).json(err); 
        }

    });
    // console.log(onecalendar)
    if(onecalendar){
        res.status(200).json(onecalendar);
    }
    else{
        res.status(400).json("khac 1 calendar");
    }
};
module.exports.put = async function(req, res) {
    var json = '';
    if (req.body.newcontent != null) {
        await mcalendar.findByIdAndUpdate(req.params.id, {content: req.body.newcontent});
        json+='content updated,'
    }
    if (req.body.newdateplan != null) {
        await mcalendar.findByIdAndUpdate(req.params.id, {dateplan: req.body.newdateplan});
        json+='content updated,'
    }
    
    if (req.body.newsender != null) {
        await mcalendar.findByIdAndUpdate(req.params.id, {sender: req.body.newsender}, function(err, docs){
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
    // var existed = await mcalendar.findOne({status: req.body.status});
    // // console.log(existed)
    // if(existed) return res.status(400).json('calendar existed')
    if (req.body.dateplan == null) {
        res.status(400).json("Null dateplan");
    }
    else if(req.body.sender == null){
        res.status(400).json("Null sender");
    }
    else if(req.body.content == null){
        res.status(400).json("Null content");
    }
    else {
        var result = await new mcalendar({
            "status" : req.body.status,
            "dateplan" : req.body.dateplan,
            "sender" : req.body.sender,
            "content" : req.body.content,
        }).save();
        res.status(200).json(result);
    }
}
module.exports.delete = async function(req, res){
    await mcalendar.findByIdAndDelete(req.params.id);
    res.status(200).json('calendar deleted')
}