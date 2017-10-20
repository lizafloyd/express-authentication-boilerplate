const 
  Authentication = require('./controllers/authentication'),
  passportService = require('./services/passport'),
  passport = require('passport');

const 
  requireAuth = passport.authenticate('jwt', { session: false }),
  requireSignIn = passport.authenticate('local', { session: false });

// Route Exports
module.exports = function(app) {
  // Protected route that requires you to pass through requireAuth
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Server authentication home route' })
  });

  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);
}