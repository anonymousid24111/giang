require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var chatSchema = new mongoose.Schema({
  /*	- Roomchatname	String
	- Member		Array	ObjectID User
	- Date(create) 	Date 	dd/mm/yyyy
	- Message	Array	ObjectID User*/
  id: String,
  chatname: String,
  // sender: String,
  member: [String],
  date: Date,
  message:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }]
})
global.chatSchema = global.chatSchema || mongoose.model('chat', chatSchema);
module.exports = global.chatSchema;