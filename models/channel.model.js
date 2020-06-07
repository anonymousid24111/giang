var mongoose = require('mongoose');

var channelScheme = new mongoose.Schema({
	/*- Chanelname	String
	- Post 		Array 	ObjectID Post
	- File		Array	ObjectID File*/
	id: String,
	channelname: String,
	post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
	file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'file' }],
})
channelModel = mongoose.model('channel', channelScheme);	
module.exports = channelModel;