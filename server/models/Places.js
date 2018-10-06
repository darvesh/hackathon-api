const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const PlaceSchema = new Schema({
	address: {
		type: String,
		required: [true, 'Address is required'],
		unique: [true, 'This place has already been added.']
	},
	city: { type: Schema.Types.ObjectId, ref: 'City' },
	cleaned: {
		type: Boolean,
		default: false
	},
	date: { type: Date, default: () => new Date() }
});

const Place = mongoose.model("Place", PlaceSchema);
module.exports = Place;