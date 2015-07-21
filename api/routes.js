module.exports = function(express){

	// Getting required packages
	var path 		= require('path'),
			options = require('../config'),
			nodemailer = require('nodemailer'),
			User 		= require(path.resolve('api/models/user')),
			apiRoutes 	= express.Router();

	// ========================================================================
	// USER ROUTES: Begining ==================================================
	// ========================================================================
	apiRoutes.route('/users')

		.post(function(req, res){
			
			// Create a new instance of the User model
			var user = new User();
			
			// Set the users information (comes from the request)
			user.name = req.body.name;
			user.email = req.body.email;
			if (req.body.html_score) user.html_score = req.body.html_score;
			if (req.body.css_score) user.css_score = req.body.css_score;
			if (req.body.js_score) user.js_score = req.body.js_score;
			if (req.body.python_score) user.python_score = req.body.python_score;
			if (req.body.django_score) user.django_score = req.body.django_score;
			if (req.body.ios_score) user.ios_score = req.body.ios_score;
			if (req.body.android_score) user.android_score = req.body.android_score;
			
			// Save the user and check for errors
			user.save(function(err){
				if (err){
					// Duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: 'A user with that username already exists. '});

					else
						return res.send(err);
				}

				res.json({ message: 'User created!' });
				//Send email to user
				var transpoter = nodemailer.createTransport(options.email);
				var mailOptions = {
						from: options.email.auth.user, 
						to: user.email
					};
				if(user.isFrontEndDev()){
					mailOptions.subject = options.emailFrontEnd.subject;
					mailOptions.text = options.emailFrontEnd.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("Front-end mail sent");
					})
				}
				if(user.isBackEndDev()){
					mailOptions.subject = options.emailBackEnd.subject;
					mailOptions.text = options.emailBackEnd.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("Back-end mail sent");
					})
				}
				if(user.isMobileDev()){
					mailOptions.subject = options.emailMobile.subject;
					mailOptions.text = options.emailMobile.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("Mobile mail sent");
					})
				}
				if(user.isGeneral()){
					mailOptions.subject = options.emailGeneral.subject;
					mailOptions.text = options.emailGeneral.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("General mail sent");
					})
				}
			})
		});
	// ========================================================================
	// USER ROUTES: Ending ====================================================
	// ========================================================================

	return apiRoutes;
};