var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  /*- Sender		String	Username
	- Date		Date	dd/mm/yyyy
	- Content		String 	message or link to join a meeting or link to file
	- React		Array 	ObjectID React
  - Reply		Array 	ObjectID Post */
  id: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: Date,
  content: String,
  react: [{ type: mongoose.Schema.Types.ObjectId, ref: 'react' }],
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reply' }],
})
postModel = mongoose.model('post', postSchema);
module.exports = postModel;