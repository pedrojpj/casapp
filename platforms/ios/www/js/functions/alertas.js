define([ "jquery", 
		"underscore", 
		"backbone",
		"animations",
		"literales",
		"text!templates/alertas.html"], function($, _, Backbone, animations, literales, layout) {



		var error = function(title, message, callback) {

			var alerta = {
				title: title,
				message: message
			}

			var data = {literales: literales, alerta: alerta};
				var source = layout;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$("body").append(html);	
				animations.animationAlerta();

				$('.btnClose').on("click", function() {
					animations.animationAlertaClose();

					if (callback) callback();
				});

				$('.btnAccept').on("click", function() {
					animations.animationAlertaClose();

					if (callback) callback();
				});

		}


		return( {
			error:error
		})



});