/**
 * stripeChargesCreate_v2.js
 * source directory:  node-services
 * 
 * Orginally By R.E. Moore Jr.
 * Last revised: 02-17-2105 by R.E. Moore Jr.
 * v2 created in order for deconstructing / expansion of stripe full node SDK by Alex Collier on 04/03/2018
 * 
 *
 * Process charge using Stripe Checkout
 * @param {Object} packet
 * 		@param {string} packet._key - Stripe issued public key
 * 		@param {number} packet._amount - Charge amount, in cents
 * 		@param {string} packet._currency - The currency of the amount (3 letter ISO code), default is USD
 * 		@param {string} packet._tokenId - The token id generated by XBasic function,  initStripe  
 * 		@param {string} packet._descripiton - Description of charge
 * @param {Object} response
 * @param {Object} sendResponse 
*/

exports.handler = function(packet,response,sendResponse) {
	debugger;
	var e;
	var stripeLib = require('stripe');  //note Alex Collier as updated this version of Stripe the lastest version and confirm old stuff still works
	
	try {
	    var stripe = stripeLib(	
			packet._key
		);
		console.log('Calling stripe.charges.create ');
		stripe.charges.create({
			amount: packet._amount,
			currency: packet._currency,
			card: packet._tokenId,
			description: packet._description
		}, function(err, charge) {
			err?response.result = err : response.result = charge;
			console.log('Result: ');
			console.log(response.result);
			sendResponse(response);
		});
		
	} catch( e ) {
		response.result = e.message;
	    sendResponse(response);
	}
};

