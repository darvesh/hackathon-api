const { body } = require('express-validator/check');
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const registerUserValidators = [
	body('username', 'Username is not valid.')
		.exists()
		.trim()
		.isLength({
			min: 5,
			max:15
		})
		.withMessage('Username must have at least 5 chars.')
		.matches(/^[a-z]\w+$/)
		.withMessage('Username is not valid.'),
	body('password','Invalid Password')
		.exists()
		.matches(strongRegex)
		.withMessage("Password length should be greater than 8 characters and should contain one\
		special character, one digit, one lowercase and one uppercase letter"),
	body('email', 'Email is not valid')
		.exists()
		.isEmail(),
	body('name',"Name isn't valid")
		.exists()
		.withMessage("Please fill Name field")
		.trim()
		.isAlpha()
		.isLength({
			min:4,
			max:70
		})
		.withMessage("Name must be between 4 and 70 chars.")
];

const loginUserValidators = [
	body('username')
		.exists(),
	body('password')
		.exists()
];

module.exports = {
	registerUserValidators,
	loginUserValidators
};

// export const entryValidators = [
// 	body('username', 'Username is not valid.')
// 	.exists()
// 	.trim()
// 	.isLength({
// 		min: 6
// 	})
// 	.withMessage('Username must have at least 5 chars.')
// 	.matches(/^[a-z]\w+$/)
// 	.withMessage('Username is not valid.'),
// 	body('category', 'Category is not valid')
// 	.exists()
// 	.custom(value => categories.some(cat => cat.slug === value)),
// 	body('title', 'Title is not valid')
// 	.exists()
// 	.trim()
// 	.isLength({
// 		min: 3,
// 		max: 54
// 	})
// 	.withMessage('Title must be between 3 and 54 chars.'),
// 	body('description', 'Description is not valid')
// 	.exists()
// 	.trim()
// 	.isLength({
// 		min: 20,
// 		max: 800
// 	})
// 	.withMessage('Description must be between 20 and 800 chars.'),
// ];
