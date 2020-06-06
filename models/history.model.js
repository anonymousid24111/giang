require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var historyScheme = new mongoose.Schema({
    /*- connecter		String	ObjectID
	- Date		Data 	dd/mm/yy
	- Status		String 	Incoming, Didn't connect, Outgoing, Rang(Miss) */
	id: String,
	connecter: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	date: Date,
	status: String
})
global.historyScheme = global.historyScheme || mongoose.model('history', historyScheme);	
module.exports = global.historyScheme;