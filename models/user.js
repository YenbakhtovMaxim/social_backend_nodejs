const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	hashed_password: {
		type: String,
		required: true,
	},
	salt: String,
	created: {
		type: Date,
		default: Date.now,
	},
	updated: Date
});

// virtual field
userSchema.virtual('password')
.set(password => {
	// create temporary variable
	this._password = password;
	this.salt = uuidv1();
	this.hashed_password = this.encryptPassword(password);
})
.get(() => {
	return this.password;
});

// methods
userSchema.methods = {
	encryptPassword: password => {
		if(!password) return "";
		try {
			return crypto.createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex');
		} catch (err) {
			return "";
		}
	}
}

module.exports = mongoose.model("User", userSchema);