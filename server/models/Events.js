const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const EventSchema = new Schema({
	city: {
		type: Schema.Types.ObjectId,
		ref: 'City'
	},
	place:{
		type: Schema.Types.ObjectId,
		ref:'Place',
		unique:true
	},
	done: {
		type: Boolean,
		default: false
	},
	time: {
		type: Date,
		required:true
	},
	createAt: {
		type: Date,
		default: () => new Date()
	}
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;