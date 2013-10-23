define(
	["jquery",
	"underscore",
	"backbone",
	"handlebars",
	"text!templates/intro.html"], function($, _, Backbone, Handlebars, layout) {

		var template = Backbone.View.extend({
			el: $('body'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = {};
				var source = layout;
				var template = Handlebars.compile(source);
				var html = template(data);

				this.$el.append(html);				

			}

		});

		return template;


	});