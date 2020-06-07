var mongoose = require('mongoose');

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
fileModel =  mongoose.model('file', fileSchema);
module.exports = fileModel;