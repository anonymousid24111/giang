var mongoose = require('mongoose');
var activitySchema = new mongoose.Schema({
  /*- Sender		String	Username	Alex Bla
	- Subject		String	Alex Bla reacted to a post you upload
	- Link 		String	/conversation?post=baba&chanel=baba&team=baba*/
  id: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: Date,
  subject: String,
  link: String
})
activityModel = mongoose.model('activity', activitySchema);
module.exports = activityModel;