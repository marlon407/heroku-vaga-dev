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

//Verifying type of email that should be sent
UserSchema.methods.isFrontEndDev = function(){
	if(this.css_score >= 7 && this.html_score >= 7 && this.js_score >= 7){
		return true;
	}
	return false;
}

//Verifying type of email that should be sent
UserSchema.methods.isBackEndDev = function(){
	if(this.python_score >= 7 && this.django_score >= 7){
		return true;
	}
	return false;
}

//Verifying type of email that should be sent
UserSchema.methods.isMobileDev= function(){
	if(this.ios_score >= 7 && this.android_score >= 7){
		return true;
	}
	return false;
}

//Verifying type of email that should be sent
UserSchema.methods.isGeneral = function(){
	if(!this.isMobileDev() && !this.isBackEndDev() && !this.isFrontEndDev() ){
		return true;
	}
	return false;
}

// Export the model schema
module.exports =  mongoose.model('User', UserSchema);