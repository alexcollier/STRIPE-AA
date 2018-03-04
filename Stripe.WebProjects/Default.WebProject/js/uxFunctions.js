function doStripeCheckout() {

	debugger;
	
	//default settings Note keys or any other setting here can be and will be overriden by settings defined in the getStripeAuthentication js file. 
	
	var defaultObj = {
	"specifyAPIKeys": "Explicit",
	"testPublishableKey": "",
	"livePublishableKey": "",
	"appType": "Test",
	"name": "",
	"appIcon": "",
	"currency": "AUD",
	"locale": "auto",
	"xbasicFunctionName": "stripeCheckout_xb_v2",
	"userGetChargeAmountFunction": "return 2500;",
	"userGetChargeDescriptionFunction": "return 'Online purchases';"
	};
	
	defaultObj.id = 'f89e86576e9748d0a57a3a1a56e57403';
	
	debugger;
	
	obj = getStripeAuthentication(defaultObj);
	
	if (typeof stripeObj_f89e86576e9748d0a57a3a1a56e57403 == 'undefined') {
	  stripeObj_f89e86576e9748d0a57a3a1a56e57403 = new stripeCheckoutClass_v2(obj);
	}
	
	debugger;
	
	stripeObj_f89e86576e9748d0a57a3a1a56e57403.callStripeCheckout();
}