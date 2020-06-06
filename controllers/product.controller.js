var Product = require('../models/product.model');
module.exports.index = async function(req, res) {
	var students = await Product.find();
  res.json(students);
};
module.exports.edit = async function(req, res) {

  var id= req.params.id;
  var name= req.body.name;
  var email= req.body.email;
  var address= req.body.address;
  var result = await Product.findOneAndUpdate({id:id}, req.body, { new: true });
                return res.json(result);
};
module.exports.deleteid = async function(req, res) {
  // var id = req.params.id;
  var result= await Product.deleteOne({id:req.params.id});
  var students = await Product.find();
  res.json(students);
  // res.redirect('/studentlist');
  // return res.status(200);
};
module.exports.create =async function(req, res) {
  var id = parseInt(req.body.id);
  var name= req.body.name;
  var email= req.body.email;
  var address= req.body.address;
  var result = await new Product({
    "id" : req.body.id,
    "name" : req.body.name,
    "email" : req.body.email,
    "address" : req.body.address
    }).save();
  res.send("ok");
};
module.exports.getid = async function(req, res) {

  var students = await Product.find({id:req.params.id});
  var student=students[0];
  res.json(students);
};