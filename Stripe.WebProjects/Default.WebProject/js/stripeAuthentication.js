function getStripeAuthentication(__obj) {
	
	debugger;

	var obj = __obj
	
	obj.specifyAPIKeys = "Explicit";
	obj.testPublishableKey = "{yourkey}"
	obj.livePublishableKey = ""
	obj.appType = "Test"
	obj.name = "{your email account}"
	
	return obj

}
