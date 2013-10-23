define(
	["jquery",
	"underscore",
	"backbone",
	"handlebars",
	"collections/oficinas",
	"text!templates/oficinas.html"], function($, _, Backbone, Handlebars, collectorOficinas, layout) {

		var template = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				var self = this;
				this.collection = new collectorOficinas();
				this.collection.fetch({reset :true});
                this.collection.bind('reset', function () {
                    self.render();
                });
				

			},
			render: function() {

				var data = this.collection.toJSON();
				var source = layout;
				var template = Handlebars.compile(source);
				var html = template(data);

				this.$el.html(html);

			}

		});

		return template;


	});