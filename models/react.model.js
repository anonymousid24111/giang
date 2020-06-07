var mongoose = require('mongoose');

var reactSchema = new mongoose.Schema({
  /*- Reactname	String	Like, Care, Sad, Angry, Haha
	- Sender		String 	ObjectID User*/
  id: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: Date,
  reactname: String
})
reactModel = mongoose.model('react', reactSchema);
module.exports = reactModel;