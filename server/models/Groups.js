const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: { 
		type: String, 
		required: [true, 'Group name is required'],
		minlength: [4, 'Group name must have at least 4 characters'],
		maxlength: [40, 'Group name cannot contain more than 40 characters']
	},
	created_by: { type: Schema.type.ObjectId, ref: 'User' },
	created_at: { type: date, default: () => new Date() }
	
});



const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;