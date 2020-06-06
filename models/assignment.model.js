require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var assignmentSchema = new mongoose.Schema({
	/*	- Sender		String	ObjectId Team
	- Status		String	Assigned or Completed
	- Deadline	Date	
	- Datecreate	Date
	- Title		String	
	- Content		String*/
	id: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'team' },
    status: String,
    deadline: Date,
    date: Date,
    title: String,
	content: Array
})
global.assignmentSchema = global.assignmentSchema || mongoose.model('assignment', assignmentSchema);
module.exports = global.assignmentSchema;