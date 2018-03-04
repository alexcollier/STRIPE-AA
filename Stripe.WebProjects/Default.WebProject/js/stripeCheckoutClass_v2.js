/*

Comments by Alex Collier 
Date: 3/3/2018

Most of the Code in this js Class file has been written by Alpha Software

This js file was written to handle the selections from the wizard and does the initial prep work. 
 
It then handles the triggering of the a Xbasic function. 

StripeCheckoutClass also loads Stripecheckout.js (Client Side code written by Stripe, and is hosted by stripe). 
 
Xbasic calls into node. The first node file it runs through has been written by Alpha. This file has a few lines and basically servers as a handler of calling from Xbasic.
 
This node file then calls a node_module called stripe.js. This version is an old one. (Stripe v2) Currently the lastest version of Stripe is V3.

*/



A5.loadJavascriptFile('https://checkout.stripe.com/checkout.js');

//New Stripe Client Side API - > https://stripe.com/docs/stripe-js/reference
A5.loadJavascriptFile('https://js.stripe.com/v3/');

// JS class for Stripe Checkout
// revised: 11-07-2016 to support locale
// revised: 03-20-2017 to init properly with specified currency
function stripeCheckoutClass_v2(obj) {
	debugger;
	this.id = obj.id;
	this.initialized = false;
	this.stripe = {};
	this.stripe.charge = {};
	this.stripe.charge.name = obj.name;
	this.stripe.charge.amount = 0;
	this.stripe.charge.description = "";
	this.stripe.charge.currency = obj.currency;
	this.stripeHandler;
	//private properties
	var that = this;
	var appType = obj.appType;
	var testPublishableKey = obj.testPublishableKey;
	var livePublishableKey = obj.livePublishableKey;
	var appIcon = obj.appIcon;
	var locale = obj.locale;
	var currency = obj.currency;
	var xbasicFunctionName = obj.xbasicFunctionName;
	var onCheckoutCompleteJS = obj.userOnStripeCheckoutCompleteFunction;
	var chargeAmountJS = obj.userGetChargeAmountFunction;
	var chargeDescriptionJS = obj.userGetChargeDescriptionFunction;
	//privileged public methods
	this.initStripe = function() {
			debugger;
			//object for all Stripe Checkout results
 			DLG1_DlgObj._stripeResults = {};
 			A5.stripe = {};
 			A5.stripe.results = {};
 			
 			//getStripeResults method
 			DLG1_DlgObj.getStripeResults = function(){
 				debugger;
 				return DLG1_DlgObj._stripeResults;
 			}
 			
 			//getEmbeddedStripeResults method
 			A5.stripe.getEmbeddedStripeResults = function() {
 				debugger;
 				return A5.stripe.results;
 			}
			var _options = {};
			_options.key = appType == 'Test'?testPublishableKey:livePublishableKey;
			_options.image = appIcon; 
			_options.currency = currency;
			_options.locale = locale;
			_options.xbasicFunctionName = xbasicFunctionName; 
			initStripeHandler(_options);
	}
	this.onStripeCheckoutComplete = function(e) {
		try {
			debugger;
			var f = new Function(onCheckoutCompleteJS);
			var js = f();
			return js;
		} catch(e) {
			alert('Error in onStripeCheckoutComplete function.');
		}
	}
	this.getStripeChargeAmount = function() {
		try {
			var f = new Function(chargeAmountJS);
			var amt = f();
			return amt;
		} catch(e) {
			alert('Error in getChargeAmount function.');
		}
	}
	this.getStripeChargeDescription = function() {
		try {
			var f = new Function(chargeDescriptionJS);
			var desc = f();
			return desc; 
		} catch(e) {
			alert('Error in getChargeDescription function.');
		}
	}
	
	//private methods
	function initStripeHandler(options){
		debugger;
		that.stripeHandler = StripeCheckout.configure({
		 	key: options.key,
	    	image: options.image,
	    	currency: options.currency,
	    	locale:options.locale,
	    	token: function(token) {
	      		DLG1_DlgObj.ajaxCallback('','',options.xbasicFunctionName,'','token='+token.id,{onComplete: function() { that.onStripeCheckoutComplete(); }});
	    	}
		});
		that.initialized = true;
	}
}

stripeCheckoutClass_v2.prototype.callStripeCheckout = function() {
	debugger;
	if (!this.initialized) {
		this.initStripe();
	}
	try {
		this.stripe.charge.amount = this.getStripeChargeAmount();
		if (this.stripe.charge.amount <= 0) {
			throw 'Charge value is is less than or equal to 0';
		}
		if (isNaN(this.stripe.charge.amount)) {
			throw 'Charge value is not a number.';
		}
	} catch(e) {
		alert('Error: '+e+'.\nProcess aborted.');
		return;
	}
	try {
		this.stripe.charge.description = this.getStripeChargeDescription();
	} catch(e) {
		alert('Error evaluating JavaScript for description string.\nProcess aborted.');
		return;
	}
	DLG1_DlgObj.setStateInfo(this.stripe);
	if (this.id) {
		this.stripeHandler.open({
			name: this.stripe.charge.name,
			description: this.stripe.charge.description,
			amount: this.stripe.charge.amount
		});
	} else {
		var err = 'Error initializing stripeHandler';
		DLG1_DlgObj._stripeResults = err;
		A5.stripe.results = err; 
	}
}

 

