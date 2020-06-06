require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var calendarSchema = new mongoose.Schema({
	/*- Dateplan	Date
	- sender		String	ObjectID Team
	- Content		String	*/
    id: String,
    dateplan: Date,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'team' },
  	content: String
})
global.calendarSchema = global.calendarSchema || mongoose.model('calendar', calendarSchema);
module.exports = global.calendarSchema;