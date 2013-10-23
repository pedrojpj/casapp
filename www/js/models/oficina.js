define(
	[
	"underscore",
	"backbone",
	], function( _, Backbone) {

		Oficina = Backbone.Model.extend({
			defaults: {
				provincia: "STRING",
				map: "STRING",
				direccion: "STRING",
				cp: "STRING",
				provMin: "STRING",
				telefono: "STRING",
				fax: "STRING",
				email: "STRING"
			},
			initialize: function() {

			}

		});

		return Oficina;


	});