require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var channelScheme = new mongoose.Schema({
	/*- Chanelname	String
	- Post 		Array 	ObjectID Post
	- File		Array	ObjectID File*/
	id: String,
	channelname: String,
	post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
	file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'file' }],
})
global.channelScheme = global.channelScheme || mongoose.model('channel', channelScheme);	
module.exports = global.channelScheme;