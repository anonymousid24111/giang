var mongoose = require('mongoose');

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
	date: Date,
	detail: String
})
teamModel = mongoose.model('team', teamScheme);	
module.exports = teamModel;