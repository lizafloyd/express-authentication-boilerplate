const 
  jwt = require('jwt-simple'),
  User = require('../models/user'),
  config = require('../config');

// Generates a JWT token.
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password authenticated
  // so they just need to be given a token.
  res.send({ token: tokenForUser(req.user)  });
}

// Signs the user up for the service
exports.signup = function(req, res, next) {
  const 
    email = req.body.email,
    password = req.body.password;

  // Handle the case of someone only providing an email, or password, not both.
  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide an email and password!'
    })
  }

  // See if a user with the given email exists.
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send( { error: 'Email is in use!' })
    }

    // If a user with an email does not exist, create and save use record
    const user = new User({
      email: email,
      password: password
    })

    // Save the record to the database
    user.save(function(err) {
      if (err) { return next(err); }

       // Respond to the request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });

}