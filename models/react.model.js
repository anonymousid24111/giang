require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var reactSchema = new mongoose.Schema({
  /*- Reactname	String	Like, Care, Sad, Angry, Haha
	- Sender		String 	ObjectID User*/
  id: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: Date,
  reactname: String
})
global.reactSchema = global.reactSchema || mongoose.model('react', reactSchema);
module.exports = global.reactSchema;