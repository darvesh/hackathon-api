const passport = require('passport');
const router = require('express').Router();
const auth = require('../service/auth');
const User = require('../models/Users');
const { validationResult } = require('express-validator/check');
const { registerUserValidators } = require('../utils/validator');


//POST new user route (optional, everyone has access)
router.post('/', registerUserValidators, auth.optional, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: "false",
      errors: errors.array()
    });
  }
  const { body } = req;
  console.log(User);
  const finalUser = new User(body);

  finalUser.setPassword(body.password);
  console.log(finalUser);

  return finalUser.save()
    .then((response) => res.json({
      success:"true",
      user: finalUser.toAuthJSON()
    }))
    .catch(error=>{
      const emailTest = /email/i;
      const { errmsg: errorMessage } = error;
      if(error){
        if (emailTest.test(errorMessage)) error.message = "Email Already Exists"
      }
      res.json({
        "success": "false",
        "message": error.message
      });
    });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  console.info(user);

  if (!user.email) {
    return res.status(422).json({
      errors: {
        message: 'email is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        message: 'password is required',
      },
    });
  }

  return passport.authenticate('local', {
    session: false
  }, (err, passportUser, info) => {
    if (err) {
      //console.log(err);
      return next(err);
      //return res.json("invalid username or password");
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({
        user: user.toAuthJSON()
      });
    }

    return res.status(400).json({
      "success":"false",
      "message":"Incorrect Email or Password "
    });
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  console.log(req.session.user)
  const {
    payload: {
      id
    }
  } = req;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({
        user: user.toAuthJSON()
      });
    });
});

router.put('/',auth.required, (req,res)=>{
  if(req.session.user!=='admin'){
    res.json({
      success:"false",
      message:"You are not an admin"
    })
  }else{
    User.updateOne({
      id: req.body.userId
    }, {
      $set: {
        admin: true
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
          message: "User is an admin now"
        })
      }
    })
  }
})

module.exports = router;