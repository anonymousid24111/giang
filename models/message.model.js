require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
global.messageSchema = global.messageSchema || mongoose.model('message', messageSchema);
module.exports = global.messageSchema;