var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
	/*- Dateplan	Date
	- sender		String	ObjectID Team
	- Content		String	*/
    id: String,
    dateplan: Date,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'team' },
  	content: String
})
calendarModel = mongoose.model('calendar', calendarSchema);
module.exports = calendarModel;