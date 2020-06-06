require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var teamScheme = new mongoose.Schema({
	/*- Teamname	String
	- Avatar  		String	link
	- Date(create)	Date	dd/mm/yy
	- Admin		Array	ObjectID User
	- Member 	Array	ObjectID	User
	- Chanel		Array 	ObjectID Channel
	- Detail		String	*/
	id: String,
	teamname: String,
	avatar: String,
	admin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
	member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
	channel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'channel' }],
	detail: String
})
global.teamScheme = global.teamScheme || mongoose.model('team', teamScheme);	
module.exports = global.teamScheme;