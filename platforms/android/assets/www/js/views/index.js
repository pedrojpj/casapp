define(
	["jquery",
	"underscore",
	"backbone",
	"handlebars"], function($, _, Backbone, Handlebars) {

		var template = Backbone.View.extend({
			el: $('section'),
			initialize: function() {
				this.render();
			},
			render: function() {

			}

		});

		return template;


	});