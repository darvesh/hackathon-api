const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const CitySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minlength: [4, 'Name must have at least 4 characters'],
		maxlength: [70, 'Name cannot contain more than 70 characters']
	},
	district: {
		type: String,
		required: [true, 'District Name is required'],
		minlength: [4, 'District Name must have at least 4 characters'],
		maxlength: [70, 'District Name cannot contain more than 70 characters']
	},
	state: {
		type: String,
		required: [true, 'State Name is required'],
		minlength: [4, 'State Name must have at least 4 characters'],
		maxlength: [70, 'State Name cannot contain more than 70 characters']
	}
});

const City = mongoose.model("City", CitySchema);
module.exports = City;