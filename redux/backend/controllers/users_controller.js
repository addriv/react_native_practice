const User = require('../models/user');
const jwt = require('jwt-simple');
const config = '../services/config';

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  });
};

const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password){
    return res.status(422).send({error: 'You must have email and password'});
  }

  User.findOne({email}, (error, existingUser) => {
    if (error) {return next(error);}
    if (existingUser) {return res.status(422).json({error: 'Email Taken'});}
    const user = new User({
      email: email,
      password: password
    });
    user.save(error2 => {
      if (error2) {return next(error2);}
      res.json({user_id: user.id, token: tokenForUser(user)});
    });
  }); 

};

export default signup;