var mongoose = require('mongoose');

var historyScheme = new mongoose.Schema({
    /*- connecter		String	ObjectID
	- Date		Data 	dd/mm/yy
	- Status		String 	Incoming, Didn't connect, Outgoing, Rang(Miss) */
	id: String,
	connecter: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	date: Date,
	status: String
})
historyModel = mongoose.model('history', historyScheme);	
module.exports = historyModel;