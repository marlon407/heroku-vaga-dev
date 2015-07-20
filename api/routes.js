// April 2015, Ciro Ferreira da Cruz

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

		.get(function(req, res){
			User.find(function(err, users){
				if (err) res.send(err);
				res.json(users);
			});
		})

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
				if(user.isFrontEndDev(user)){
					mailOptions.subject = options.emailFrontEnd.subject;
					mailOptions.text = options.emailFrontEnd.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("Front-end mail sent");
					})
				}
				if(user.isBackEndDev(user)){
					mailOptions.subject = options.emailBackEnd.subject;
					mailOptions.text = options.emailBackEnd.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("Back-end mail sent");
					})
				}
				if(user.isMobileDev(user)){
					mailOptions.subject = options.emailMobile.subject;
					mailOptions.text = options.emailMobile.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("Mobile mail sent");
					})
				}
				if(user.isGeneral(user)){
					mailOptions.subject = options.emailGeneral.subject;
					mailOptions.text = options.emailGeneral.text;
					transpoter.sendMail(mailOptions, function(error, res){
						if(error)	throw error;
						else console.log("General mail sent");
					})
				}
			})
		});

	// On routes that end in /users/:user_id
	apiRoutes.route('/users/:user_id')
		// (accessed at GET http://localhost:PORT/api/users/:user_id)
		.get(function(req, res){
			
			User.findById(req.params.user_id, function(err, user){
				if (err) res.send(err);

				// Return that user
				res.json(user);
			});
		})

		// (accessed at PUT http://localhost:PORT/api/users/:user_id)
		.put(function(req, res){

			// Use user model to find the user
			User.findById(req.params.user_id, function(err, user){
				if (err) res.send(err);

				// Update the users info only if its new
				if (req.body.name) user.name = req.body.name;
				if (req.body.email) user.email = req.body.email;
				if (req.body.html_score) user.html_score = req.body.html_score;
				if (req.body.css_score) user.css_score = req.body.css_score;
				if (req.body.js_score) user.js_score = req.body.js_score;
				if (req.body.python_score) user.python_score = req.body.python_score;
				if (req.body.django_score) user.django_score = req.body.django_score;
				if (req.body.ios_score) user.ios_score = req.body.ios_score;
				if (req.body.android_score) user.android_score = req.body.android_score;

				// Save the user
				user.save(function(err){
					if (err) res.send(err);
					// Return a message
					res.json({ message: 'User updated!' });
				});
			});
		})

		// (accessed at DELETE http://localhost:PORT/api/users/:user_id)
		.delete(function(req, res){
			User.remove({
				_id: req.params.user_id
			}, function(err, user){
				if (err) return res.send(err);

				res.json({ message: 'User deleted' });
			});
		});

	// ========================================================================
	// USER ROUTES: Ending ====================================================
	// ========================================================================

	return apiRoutes;
};