define(
	[
	"underscore",
	"backbone",
	"models/oficina"
	], function( _, Backbone, oficina) {

		Oficinas = Backbone.Collection.extend({
			url: "data/oficinas.json"
		});

		return Oficinas;

	});