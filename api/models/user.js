// April 2015, Ciro Ferreira da Cruz

// Getting required packages
var mongoose 	= require('mongoose');


// Creating a User Schema
var UserSchema = new mongoose.Schema({
	
	name: {
		type: String,
		required: true
	},
	
	email: {
		type: String,
		required: true
	},

	html_score: {
		type: String
	},

	css_score: {
		type: String
	},

	js_score: {
		type: String
	},
	python_score: {
		type: String
	},
	django_score: {
		type: String
	},
	ios_score: {
		type: String
	},
	android_score: {
		type: String
	}
});

UserSchema.methods.isFrontEndDev = function(user){
	if(user.css_score >= 7 && user.html_score >= 7 && user.js_score >= 7){
		return true;
	}
	return false;
}

UserSchema.methods.isBackEndDev = function(user){
	if(user.python_score >= 7 && user.django_score >= 7){
		return true;
	}
	return false;
}

UserSchema.methods.isMobileDev= function(user){
	if(user.ios_score >= 7 && user.android_score >= 7){
		return true;
	}
	return false;
}

UserSchema.methods.isGeneral = function(user){
	if(user.ios_score < 7  && user.django_score < 7 && user.css_score < 7 ){
		return true;
	}
	return false;
}

// Export the model schema
module.exports =  mongoose.model('User', UserSchema);