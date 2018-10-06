const router = require('express').Router();
const auth = require('../service/auth');
const City = require('../models/Cities.js');

router.post('/', auth.required, (req, res, next) => {
	const body = req.body;
	console.log(req.body.name);
	if(!body.name){
		console.log(body.name);
		return res.json({
			"success":"false",
			"message":"name is required"
		})
	}	
	else if (!body.district) {
		return res.json({
			"success": "false",
			"message": "district is required"
		})
	}
	else if (!body.state) {
		return res.json({
			"success": "false",
			"message": "state is required"
		})
	}else{
		const city = new City(body);
		  return city.save()
		  	.then((cities) => res.json({
				success: "true",
				message: "City Created",
				city:cities
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
	City.find({})
	.then(cities =>{
		res.json({
			success:true,
			cities:cities
		});
	})
	.catch(err=>{
		res.json({
			success: false,
			message: err
		})
	})
})

module.exports = router;