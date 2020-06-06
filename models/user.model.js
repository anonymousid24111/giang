require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var userSchema = new mongoose.Schema({
	/*
	- Username	String
	- Avatar		String	link
	- Sex		Boolean	true: male	false: female
	- Email		String	*@gmail.com
	- Birthdate	Date	dd/mm/yy
	- Contact		Array	ObjectID	User
	- History		Array	ObjectID	History
	- Team		Array	ObjectID	Team
	- Activity		Array	ObjectID	Activity
	- Chat		Array	ObjectID Chat
	- Assignment	Array	ObjectID
	- Calendar	Array	ObjectID
	- Files		Array	ObjectID */
	id:	String,
	username: String,
	avatar: String,
	sex: String,
	email: String,
	birthday: Date,
	password: String,
	contact: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
	history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'history' }],
	team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
	activity: [{ type: mongoose.Schema.Types.ObjectId, ref: 'activity' }],
	chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }],
	assignment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'assignment' }],
	calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'calendar' }],
	file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'file' }]
})
global.userSchema = global.userSchema || mongoose.model('user', userSchema);
module.exports = global.userSchema;
