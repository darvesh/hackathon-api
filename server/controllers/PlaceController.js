const router = require('express').Router();
const auth = require('../service/auth');
const Place = require('../models/Places.js');

router.post('/', auth.required, (req, res, next) => {
	const body = req.body;
	if (!body.address) {
		return res.json({
			"success": "false",
			"message": "address is required"
		})
	} else if (!body.address) {
		return res.json({
			"success": "false",
			"message": "address is required"
		})
	} else if (!body.city) {
		return res.json({
			"success": "false",
			"message": "city is required"
		})
	} else {
		const place = new Place(body);
		return place.save()
			.then((place) => res.json({
				success: "true",
				city: place
			}))
			.catch(error => {
				res.json({
					"success": "false",
					"message": error
				});
			});

	}

})

router.get('/', auth.required, (req, res, next) => {
	Place.find({})
		.then(places => {
			res.json({
				sucess: true,
				message: places
			});
		})
		.catch(err => {
			res.json({
				success: false,
				message: err
			})
		})
})

//places under a city
router.get('/:city', auth.required, (req, res, next) => {
	const city = req.params.city;
	Place.find({ city:city,cleaned:false })
		.then(places => {
			res.json({
				sucess: true,
				message: places
			});
		})
		.catch(err => {
			res.json({
				success: false,
				message: err
			})
		})
})

router.put('/', auth.required, (req, res, next) => {
	if (!req.body.id) {
		res.json({
			success: false,
			message: "select the the place"
		})
	} else if (!req.body.cleaned) {
		res.json({
			success: false,
			message: "Please select true/false"
		})
	} else {
		Place.update({
			id: req.body.id
		}, {
			$set: {
				cleaned: req.body.cleaned
			}
		}, {
			upsert: true
		}, function (err) {
			res.json({
				sucess: false,
				message: " Error while inserting"
			})
		})
	}
})

module.exports = router;

