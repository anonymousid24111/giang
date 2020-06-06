require('dotenv').config()
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var fileSchema = new mongoose.Schema({
	/*- Type		String	Image, docx, pdf
	- Name		String	
	- Modified	Date	
	- Location	String
*/
	id: String,
    type: String,
    filename: String,
    link: String,
    datemodified: Date,
    location: String
})
global.fileSchema = global.fileSchema || mongoose.model('file', fileSchema);
module.exports = global.fileSchema;