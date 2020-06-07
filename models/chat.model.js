var mongoose = require('mongoose');

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
chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;