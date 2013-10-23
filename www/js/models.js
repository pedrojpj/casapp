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

		Alerta = Backbone.Model.extend({
			defaults: {
				id: 0,
				name: "STRING",
				idProvincia: 0,
				idZona: 0
			},
			initialize: function() {

			}

		});

		return ({
			Oficina: Oficina,
			Alerta: Alerta
		});

	});