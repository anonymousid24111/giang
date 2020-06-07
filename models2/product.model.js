var mongoose = require('mongoose');
var productSchema  = new mongoose.Schema({
	id: Number,
	name: String,
	email: String,
	address: String
});
var Product = mongoose.model('students', productSchema, 'students');

module.exports = Product;