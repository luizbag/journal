let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
    	if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, cb);
};

module.exports = mongoose.model('User', UserSchema);
