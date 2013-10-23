define([ "jquery", 
		"underscore", 
		"backbone",
		"animations",
		"literales",
		"text!templates/helpIndex.html",
		"text!templates/helpTalleresMap.html"], function($, _, Backbone, animations, literales, indexLayout, talleresLayout) {



		var helpIndex = function() {

			var data = {literales: literales};
				var source = indexLayout;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$("body").append(html);	

				animations.animationHelp();

			$(".helpLayout").on("click", function() {
				animations.animationCloseHelp();
			});


		};

		var helpTalleres = function() {

			var data = {literales: literales};
				var source = talleresLayout;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$("body").append(html);	

				animations.animationHelp();

			$(".helpLayout").on("click", function() {
				animations.animationCloseHelp();
			});


		};


		return( {
			helpIndex:helpIndex,
			helpTalleres: helpTalleres
		})



});