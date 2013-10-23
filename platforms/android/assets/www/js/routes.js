define(
	[
	"underscore",
	"backbone",
	"views",
	"animations",
	"alertas",
	"storage",
	"help"
	], function(_, Backbone, views, animations, alertas, storage, help) {

		var AppRouter = Backbone.Router.extend({
			routes: {
				"": 							"indexAction",
				"introAction":                  "introAction",
				"alertasAction": 				"alertasAction",
				"talleresAction": 				"talleresAction",
				"talleresMapAction": 			"talleresMapAction",
				"urgenciasAction": 				"urgenciasAction",
				"guiaSiniestroAction": 			"guiaSiniestroAction",
				"cuadroMedicoAction": 			"cuadroMedicoAction", 
				"productosAction": 				"productosAction",
				"ajustesAction": 				"ajustesAction",
				"listadoAlertasAction": 		"listadoAlertasAction",
				"asistenciaAction": 			"asistenciaAction",
				"asistenciaFormAction":			"asistenciaFormAction",
				"solicitarAsistenciaAction": 	"solicitarAsistenciaAction",
				"contactoAction": 				"contactoAction",
				"oficinasAction": 				"oficinasAction",
				"oficinasMapAction": 			"oficinasMapAction",
				"oficinasMapAction/:id": 		"oficinasMapAction",
				"telefonosAction": 				"telefonosAction",
				"helpIndexAction": 				"helpIndexAction"

			},
			initialize: function() {

			},
			indexAction: function(e) {

				/***
			
				if (device.platform == "Android" && !booleanHistory) {
					this.introAction();
				}

				***/
				
				

				new views.templateHeaderIndex();
				new views.templateIndex();
				

				if (booleanHistory) {
					animations.animationPage("popback", 300, "snap");
				} else {
					animations.animationPage(null);
				}

				if (!storage.getData("indexHelp")) {
					help.helpIndex();
					storage.setData("indexHelp", true);
				}
				
				return false;
			},
			introAction: function(e) {
				new views.templateIntro();

				return false;
			},
			alertasAction: function(e) {

				new views.templateHeaderBasic();
				new views.templateAlertas();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			talleresAction: function(e) {

				new views.templateHeaderContent();
				new views.templateTalleres();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			talleresMapAction: function(e) {

				new views.templateHeaderContent();
				new views.templateTalleresMap();
				
				animations.animationPage("pop", 300, "snap");


				return false;
			},
			urgenciasAction: function(e) {

				new views.templateHeaderContent();
				new views.templateUrgencias();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			guiaSiniestroAction: function(e) {

				new views.templateHeaderContent();
				new views.templateGuia();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			cuadroMedicoAction: function(e) {
				return false;
			},
			productoAction: function(e) {
				return false;
			},
			ajustesAction: function(e) {

				new views.templateHeaderBasic();
				new views.templateAjustes();
				
				animations.animationPage("pop", 300, "snap");

				return false;
			},
			listadoAlertasAction: function(e) {
				return false;
			},
			asistenciaAction: function(e) {

				new views.templateHeaderContent();
				new views.templateAsistencia();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			asistenciaFormAction: function(e) {

				new views.templateHeaderContent();
				new views.templateAsistenciaForm();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			solicitarAsistenciaAction: function(e) {
				return false;s
			},
			contactoAction: function(e) {

				new views.templateHeaderContent();
				new views.templateContacto();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			oficinasAction: function(e) {
				new views.templateHeaderContent();
				new views.templateOficinas();
				
				animations.animationPage("pop", 300, "snap");
				return false;
			},
			oficinasMapAction: function(id) {
				new views.templateHeaderContent();
				new views.templateOficinasMap({id: id});

				animations.animationPage("pop", 300, "snap");
				return false;
			},
			telefonosAction: function(e) {

				new views.templateHeaderContent();
				new views.templateTelefonos();

				animations.animationPage("pop", 300, "snap");				
				return false;
			}

		});

		return {
			AppRouter: AppRouter
		}

	}
)