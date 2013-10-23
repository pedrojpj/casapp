define(
	[
	"underscore",
	"backbone",
	"models",
	], function( _, Backbone, m) {

		Oficinas = Backbone.Collection.extend({
			url: "data/oficinas.json",
			listbyProvincia: function(provincia) {
                        filtered = this.filter(function(box) {
                              return box.get("provincia") === provincia;
                      });
                return new Oficinas(filtered);
            }
		});

		Alertas = Backbone.Collection.extend({
			model: new m.Alerta()
		});

		return ({
			Oficinas: Oficinas,
			Alertas: Alertas
		})

	});