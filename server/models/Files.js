const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: [true, 'File name is required'],
		minlength: [5, 'File name must have at least 5 characters'],
		maxlength: [50, 'File name cannot contain more than 50 characters']
	},
	uploaded_by: { type: Schema.type.ObjectId, ref: 'User' },
	uploaded_at: { type: date, default: () => new Date() }
});


const File = mongoose.model("File", FileSchema);
module.exports = File;