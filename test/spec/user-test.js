describe("User", function() {
  var User = require('../../api/models/user');
  var user;
	
	beforeEach(function() {
    user = new User();
  });
	
	describe("What type of email should be sent?", function() {
    beforeEach(function() {
      user.name = "marlon";
			user.email = "marlon@gmail.com";
    });

    it("should send a general email", function() {
      expect(user.isGeneral()).toEqual(true);
    });
		it("should send a front end email", function() {
			user.html_score = 7;
			user.css_score = 7;
			user.js_score = 7;
      expect(user.isFrontEndDev()).toEqual(true);
    });
		it("should send a back end email", function() {
			user.django_score = 7;
			user.python_score = 7;
      expect(user.isBackEndDev()).toEqual(true);
    });
		it("should send a mobile email", function() {
			user.ios_score = 7;
			user.android_score = 7;
      expect(user.isMobileDev()).toEqual(true);
    });
  });
});
