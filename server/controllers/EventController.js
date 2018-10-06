const router = require('express').Router();
const auth = require('../service/auth');
const Event = require('../models/Events');

router.post('/', auth.required, (req, res, next) => {
	const body = req.body;
	if (!body.city) {
		return req.json({
			"success": "false",
			"message": "city is required"
		})
	} else if (!body.place) {
		return req.json({
			"success": "false",
			"message": "place is required"
		})
	} else if (!body.time) {
		return req.json({
			"success": "false",
			"message": "time is required"
		})
	} else {
		const event = new Event(body);
		return event.save()
			.then((events) => res.json({
				success: "true",
				events: events
			}))
			.catch(error => {
				res.json({
					"success": "false",
					"message": error
				});
			});

	}

})



//find all city
router.get('/', auth.required, (req, res, next) => {
	Event.find({done:false})
		.populate('place')
		.populate('city')
		.exec(function (err, results) {
			if(err){
				res.json({
					success: false,
					message: err
				})
			}
			if(!!results){
				res.json({
					sucess: true,
					message: results
				});
			}
		});
})

//events under one city
router.get('/:city', auth.required, (req, res, next) => {
	const city = req.params.city;
	if(!city){
		res.json({
			success:"false",
			"message":"City is required"
		})
	}else{
		Event.find({ city:city })
			.then(events => {
				res.json({
					sucess: true,
					message: events
				});
			})
			.catch(err => {
				res.json({
					success: false,
					message: err
				})
			})
	}
})

router.put('/', auth.required, (req, res, next) => {
	if(!req.body.id){
		res.json({
			success:false,
			message:"select the event"
		})
	}else if(!req.body.done){
		res.json({
			success: false,
			message: "Please select true/false"
		})
	}else{
		Event.updateOne({ _id: req.body.id }, { $set: { done: req.body.done } }, { upsert: true }, function (err) { 
			console.log(err)
			if(!!err){
				res.json({
					sucess:false,
					message:" Error while updating"
				})
			}else{
				Event.findById(req.body.id)
				.then(r=>{
					res.json(r)
				})
				.then(response => {
					console.log("RESONSE: " + response);
					Place.updateOne({
						id: response.id
					}, {
						$set: {
							cleaned: true
						}
					}, {
						upsert: true
					}, function (err) {
						console.log(err);
						if (err) {
							res.json({
								sucess: false,
								message: " Error while inserting"
							})
						} else {
							res.json({
								sucess: true,
								message: "Welldone"
							})
						}

					})
				})
				.catch(err => {
					res.json({
						success: false,
						message: "Error while updating"
					})
				})
			}
		})
	}
})
module.exports = router;