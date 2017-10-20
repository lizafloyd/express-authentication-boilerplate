const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

// User Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // Get access to the user model
  const user = this;

  // Generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); };

    // Hash (encrypt) the password using the salt and then run a callback
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); };

      // Overwrite plain text password with the encrypted password
      user.password = hash;

      // Save the model
      next();
    });
  });
});

// Compares provided password and the provided candidate
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch)
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);


// Export the model
module.exports = ModelClass;