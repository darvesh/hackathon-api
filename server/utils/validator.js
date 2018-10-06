const {
	body
} = require('express-validator/check');
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const registerUserValidators = [
	body('password', 'Invalid Password')
	.exists()
	.matches(strongRegex)
	.withMessage("Password length should be greater than 8 characters and should contain one\
		special character, one digit, one lowercase and one uppercase letter"),
	body('email', 'Email is not valid')
	.exists()
	.isEmail(),
	body('name', "Name isn't valid")
	.exists()
	.withMessage("Please fill Name field")
	.trim()
	.isAlpha()
	.isLength({
		min: 4,
		max: 70
	})
	.withMessage("Name must be between 4 and 70 chars."),
];

const loginUserValidators = [
	body('email')
	.exists(),
	body('password')
	.exists()
];

module.exports = {
	registerUserValidators,
	loginUserValidators
};
