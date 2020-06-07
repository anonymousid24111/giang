var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	/*- Sender		String	ObjectID User
	- Viewer 		Array	ObjectID User
	- React 		Array	ObjectID React
	- Content		String	Message, link, image, video. */
	id: String,
	sender: String,
	viewer: [String],
	react: [{ type: mongoose.Schema.Types.ObjectId, ref: 'react' }],
	content: String
})
messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel;