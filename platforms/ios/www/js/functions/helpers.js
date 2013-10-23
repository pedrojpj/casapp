define(["jquery", "handlebars"], function($, handlebars) {


	Handlebars.registerHelper('checked', function(options) {

  		if (options == "true") {
  			return "checked='checked'";
  		} else {
  			return "";
  		}
	});


});