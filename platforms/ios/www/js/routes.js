define(
	[
	"underscore",
	"backbone",
	"views",
	"animations",
	"alertas",
	"storage",
	"help",
	"touch"
	], function(_, Backbone, views, animations, alertas, storage, help, touch) {

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
			commonAction: function() {
				touch.initialize();
			},
			back: function() {
			      window.history.back();
			},
			indexAction: function(e) {

				if (device.platform == "Android") {
					if (!booleanHistory) this.introAction();
				} else {
					$('.intro').remove();
				}

				new views.templateHeaderIndex();
				new views.templateIndex();
				
				animations.animationPage(null);

				if (!storage.getData("indexHelp")) {
					help.helpIndex();
					storage.setData("indexHelp", true);
				}

				this.commonAction();
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
				this.commonAction();
				return false;
			},
			talleresAction: function(e) {

				new views.templateHeaderContent();
				new views.templateTalleres();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();				
				return false;
			},
			talleresMapAction: function(e) {

				new views.templateHeaderContent();
				new views.templateTalleresMap();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			urgenciasAction: function(e) {

				new views.templateHeaderContent();
				new views.templateUrgencias();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			guiaSiniestroAction: function(e) {

				new views.templateHeaderContent();
				new views.templateGuia();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
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
				this.commonAction();
				return false;
			},
			listadoAlertasAction: function(e) {
				return false;
			},
			asistenciaAction: function(e) {

				new views.templateHeaderContent();
				new views.templateAsistencia();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			asistenciaFormAction: function(e) {

				new views.templateHeaderContent();
				new views.templateAsistenciaForm();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			solicitarAsistenciaAction: function(e) {
				return false;s
			},
			contactoAction: function(e) {

				new views.templateHeaderContent();
				new views.templateContacto();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			oficinasAction: function(e) {
				new views.templateHeaderContent();
				new views.templateOficinas();
				
				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			oficinasMapAction: function(id) {
				new views.templateHeaderContent();
				new views.templateOficinasMap({id: id});

				animations.animationPage("pop", 300, "snap");
				this.commonAction();
				return false;
			},
			telefonosAction: function(e) {

				new views.templateHeaderContent();
				new views.templateTelefonos();

				animations.animationPage("pop", 300, "snap");	
				this.commonAction();			
				return false;
			}

		});

		return {
			AppRouter: AppRouter
		}

	}
)