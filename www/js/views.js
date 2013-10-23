define(["jquery",
	"underscore",
	"backbone",
	"handlebars",
	"iscroll",
	"plugins",
	"literales",
	"animations",
	"help",
	"map",
	"elements",
	"storage",
	"alertas",
	"collections",
	"models",
	"helpers",
	"services",
	"text!templates/headerIndex.html",
	"text!templates/headerContent.html",
	"text!templates/headerBasic.html",
	"text!templates/intro.html",
	"text!templates/index.html",
	"text!templates/asistencia.html",
	"text!templates/asistenciaPaso1.html",
	"text!templates/talleres.html",
	"text!templates/talleresMap.html",
	"text!templates/ajustes.html",
	"text!templates/listAlertas.html",
	"text!templates/urgenciasMedicas.html",
	"text!templates/guiaSiniestro.html",
	"text!templates/contacto.html",
	"text!templates/oficinas.html",
	"text!templates/oficinasMap.html",
	"text!templates/telefonos.html"], function(
		$, _, Backbone, Handlebars, iscroll, plugins, literales, animations, help, map, elements, storage, alertas, c, m, helpers, services, headerIndex, headerContent, headerBasic, layoutIntro, layoutIndex, layoutAsistencia, layoutAsistenciaForm, layoutTalleres, layoutTalleresMap, layoutAjustes, layoutAlertas, layoutUrgencias, layoutGuia, layoutContacto, layoutOficinas, layoutOficinasMap, layoutTelefonos) {


		var templateHeaderIndex = Backbone.View.extend({
			el: $('header'),
			initialize: function() {

				this.render();
			},
			render: function() {
				var data = {};
				var source = headerIndex;
				var template = Handlebars.compile(source);
				var html = template(data);

				this.$el.html(html);	

			}

		});

		var templateHeaderContent = Backbone.View.extend({
			el: $('header'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = {};
				var source = headerContent;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				this.$el.html(html);	

				$('.back').hammer().on("tap", function(e) {
					appRouter.back();
				})

			}
		});

		var templateHeaderBasic = Backbone.View.extend({
			el: $('header'),
			initialize: function() {

				this.render();
			},
			render: function() {

				var data = {};
				var source = headerBasic;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				this.$el.html(html);	

				$('.back').hammer().on("tap", function(e) {
					appRouter.back();
				})

			}
		});


		var templateIntro = Backbone.View.extend({
			el: $('body'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = {};
				var source = layoutIntro;
				var template = Handlebars.compile(source);
				var html = template(data);

				this.$el.append(html);	

				setTimeout(function() {
					$('.intro').fadeOut();
				}, 500)		

			}

		});


		var templateIndex = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {

				this.render();
			},
			render: function() {

				var data = {
					literales: literales,
					title: literales.caser_seguros
				};

				var source = layoutIndex;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$('header').find("h1").html(literales.caser_seguros);
				$('article:not(.active)').html(html);	

				var size = $(".home .footer").find("li").outerWidth(true) * ($(".home .footer").find("li").length-1);

				$("#scroller").width(size+$('.home .footer li:last-child').width()+20);
				new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false });	

				$('.ayuda a').on("click", function(e) {
					self.helpFunction(e);
				});


			},
			helpFunction: function(e) {
				e.preventDefault();
				help.helpIndex();
			}

		});

		var templateAsistencia = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = {literales:literales};
				var source = layoutAsistencia;
				var template = Handlebars.compile(source);
				var html = template(data);

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.asistencia_carretera);


			}

		});

		var templateAsistenciaForm = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = {literales:literales};
				var source = layoutAsistenciaForm;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;
				var latitude = null;
				var longitude = null;
				var matricula = null;
				var percance = null;

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.asistencia_carretera);

				if (storage.getData("matricula")) $('input[name="matricula"]').val(storage.getData("matricula"));

				elements.radio(function() {
					self.checkForm();
				});

				$('input[name="matricula"]').on("blur", function() {
					self.checkForm();
				})

				map.mapInitialize(8, 40.42, -3.71);
				map.getGeolocation(function(lat, lng) {
					$('.map').css({"height":"50%", "top": "50%"});
					map.mapCenter(lat,lng);
					latitude = lat;
					longitude = lng;

					map.getAddress(lat, lng, function(json) {
						$('input[name="direccion"]').val(json.results[0].formatted_address);
					})
				});

				$('.buttonLocation').on("click", function(e) {
					e.preventDefault;
						map.getGeolocation(function(lat, lng) {
						$('.map').css({"height":"50%", "top": "50%"});
						map.mapCenter(lat,lng);
						latitude = lat;
						longitude = lng;

						map.getAddress(lat, lng, function(json) {
							$('input[name="direccion"]').val(json.results[0].formatted_address);
						})
					});
				});

				var action =  $('.window').hammer();
				var button = $('.window').find(".btnPoint");


				action.on("swipeup", function() {
					var porcentage = ($(this).height()*20)/100;
					var height = $(this).height()-porcentage;
					$('.map').css({"height":"100%", "top":0});

					if (latitude && longitude) map.mapCenter(latitude, longitude);
					$(this).transition({y: -height}, 300, "ease", function() {
						$(this).find(".btnPoint").addClass("btnClose").removeClass("btnPoint");
					});
				});

				button.on("click", function() {

					if (!button.hasClass("btnClose")) {
						var porcentage = ($(".window").height()*20)/100;
						var height = $(".window").height()-porcentage;
						$('.map').css({"height":"100%", "top":0});

						if (latitude && longitude) map.mapCenter(latitude, longitude);
						$(".window").transition({y: -height}, 300, "ease", function() {
										
							$(this).find(".btnPoint").addClass("btnClose").removeClass("btnPoint");

						});
					} else {
						var height = $(".window").height();
									
						$(".window").transition({y: 0}, 300, "ease", function() {

							$('.map').css({"height":"50%", "top":"50%"});
							if (latitude && longitude) map.mapCenter(latitude, longitude);
							button.addClass("btnPoint").removeClass("btnClose");

						});
						}
				});

				$('button.submit').on("click", function(e) {
					e.preventDefault();
					self.submitForm(latitude, longitude);

				})

			},
			checkForm: function() {

				var tipoAsistencia = $('input[name="tipoAsistencia"]:checked');
				var matricula = $('input[name="matricula"]').val();
				var localizacion = $('input[name="direccion"]').val();
				var self = this;


				if (self.validarMatricula(matricula)) {
					$('input[name="matricula"]').removeClass("nocompleted").removeClass("error");
					storage.setData("matricula", matricula);
				} else {
					$('input[name="matricula"]').addClass("nocompleted").addClass("error");
					alertas.error("ERROR", literales.matricula_no_valida);
				};


				if (tipoAsistencia.length) {
					$('input[name="tipoAsistencia"]').removeClass("nocompleted");
				} else {
					$('input[name="tipoAsistencia"]').addClass("nocompleted");
				};	

				if (localizacion != "") {
					$('input[name="direccion"]').removeClass("nocompleted");
				} else {
					$('input[name="direccion"]').addClass("nocompleted");
				}


				if (!$('.nocompleted').length) {
					$('button.submit').removeAttr("disabled", "disabled");
				} else {
					$('button.submit').attr("disabled", "disabled");
				}



			},
			validarMatricula: function(matricula) {

				var expreg = "^([1-9]{4}[A-Z]{3})$|^([A-Z]{1,2}[1-9]{4}[A-Z]{0,2})$";

				if(matricula.match(expreg)) {
					return true
				} else {
					return false;
				}

			},
			submitForm: function(latitude, longitude) {

				require(["text!templates/elements/confirmacionAlerta.html"],
					function(layout) {
						var data = { literales: literales };
						var source = layout;
						var template = Handlebars.compile(source);
						var html = template(data);

						$('body').append(html);

						$('.confirmacionAlerta').css({y: $(window).height()});
						$('.confirmacionAlerta').transition({y: 0}, 300, "ease", function() {
							$(this).find(".content").transition({opacity:1}, 300, "ease");
						});

						$('.confirmacionAlerta').find(".btnCancelar").on("click", function() {
							$('.confirmacionAlerta').transition({opacity: 0}, 300, "ease", function() {
								$(this).remove();
							});
						});

						$('.confirmacionAlerta').find(".btnTel").on("click", function() {

							var tipoAsistencia = $('input[name="tipoAsistencia"]:checked').val();
							var matricula = $('input[name="matricula"]').val();

							

							

						})

					}
				);

			}

		});


		var templateTalleres = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales };
				var source = layoutTalleres;
				var template = Handlebars.compile(source);
				var html = template(data);

				$('article:not(.active)').html(html);	

				$('header').find("h1").html(literales.talleres);
				new IScroll('#wrapperList', {  });	

			}

		});

		var templateTalleresMap = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales };
				var source = layoutTalleresMap;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.talleres);

				
				map.mapInitialize(8, 40.42, -3.71);
				map.mapTalleres();

				/*** EVENTOS ***/

				$('.buttonLocation').on("click", function(e) {
					e.preventDefault();
					map.mapTalleres();
				});

				var footerEvent = $(".footer").hammer();

				footerEvent.on("swipeleft", function(ev) {
					if (!$(this).hasClass("helpOn")) {
						var width = $(this).find(".helpButton").outerWidth();
						$(this).find("ul").transition({x: -width }, 300, "ease");
						$(this).find(".helpButton").transition({x: -width }, 300, "ease");	

						$(this).addClass("helpOn");
					}
				});

				footerEvent.on("swiperight", function(ev) {
					if ($(this).hasClass("helpOn")) {
						var width = $(this).find(".helpButton").outerWidth();
						$(this).find("ul").transition({x: 0 }, 300, "ease");
						$(this).find(".helpButton").transition({x: 0 }, 300, "ease");	

						$(this).removeClass("helpOn");
					}
				});


				$('.helpButton a').on("click", function(e) {
					self.helpFunction(e);

				});
			},
			helpFunction: function(e) {
				e.preventDefault();
				help.helpTalleres();
			}

		});

		var templateAjustes = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales, checkedNotification: storage.getData("showAlertas") };
				var source = layoutAjustes;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.ajustes);

				elements.checkbox(
					function() {
					$(".showAlertas").removeClass("noDisplay");
					storage.setData("showAlertas", true);
					},
					function() {
					$(".showAlertas").addClass("noDisplay");
					storage.setData("showAlertas", false);
					}
				);

				$('input').on("keyup", function() {
					self.checkForm();
				});

				$('select').on("change", function() {
					self.checkForm();
				});

				$('button.submit').on("click", function(e) {
					e.preventDefault();

					self.submitForm();

				})

			},
			submitForm: function() {

				var form = $('form[name="ajustesForm"]');
				var data = form.serializeArray();
				var dataArray = new Array();
				$.each(data, function( index, value ) {
					dataArray.push(value.value);
				});


				storage.checkAlertas(dataArray[0], dataArray[1], function(countResult) {

					if (countResult == 0) {
						storage.insertAlerta(dataArray);
					} else {
						alertas.error("ERROR", literales.error_alerta)
					}

				})

				

			},
			checkForm: function() {

				$('select').each(function() {

					if ($(this).val() != 0) {
						$(this).removeClass("nocompleted");
					} else {
						$(this).addClass("nocompleted");
					}

				});

				$('input').each(function() {

					if ($(this).val() != "") {
						$(this).removeClass("nocompleted");
					} else {
						$(this).addClass("nocompleted");
					}

				});

				if (!$('.nocompleted').length) {
					$('button.submit').removeAttr("disabled", "disabled");
				}

			}

		});

		var templateAlertas = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {

				var self = this;

				storage.getListAlertas(function(result) {

					this.collection = new c.Alertas();

					for (var i=0; i<result.rows.length; i++){
			           var alerta = new m.Alerta({ id: result.rows.item(i).id, name: result.rows.item(i).name, idProvincia: result.rows.item(i).idProvincia, idZona: result.rows.item(i).idZona });
    
    					this.collection.add(alerta);
			        }

					self.render(this.collection);
				});


				
			},
			render: function(result) {

				var data = { literales: literales, alertas: result.toJSON() };
				var source = layoutAlertas;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$('article:not(.active)').html(html);	

				$('header').find("h1").html(literales.listado_alertas);
				new IScroll('#wrapperList', {  });	


				$('.btnErase').on("click", function(e) {
					e.preventDefault();
					var id = $(this).parent().attr("id");
					self.deleteAlerta(id);
				})



			},
			deleteAlerta: function(id) {
				storage.deleteAlerta(id);
			}

		});

		var templateUrgencias = Backbone.View.extend({
			el: $('.secondView'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales };
				var source = layoutUrgencias;
				var template = Handlebars.compile(source);
				var html = template(data);
				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.urgencias_medicas);
				


			}

		});

		var templateGuia = Backbone.View.extend({
			el: $('article:not(.active)'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales };
				var source = layoutGuia;
				var template = Handlebars.compile(source);
				var html = template(data);

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.guia_siniestro);
				elements.collapsable();
				new IScroll('#wrapperList', { checkDOMChanges: true });	
				

			}

		});

		var templateContacto = Backbone.View.extend({
			el: $('article:not(.active)'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales };
				var source = layoutContacto;
				var template = Handlebars.compile(source);
				var html = template(data);

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.contacto);


			}

		});

		var templateOficinas = Backbone.View.extend({
			el: $('article:not(.active)'),
			initialize: function() {
				
				var self = this;
				this.collection = new c.Oficinas();
				this.collection.fetch({reset :true});
                this.collection.bind('reset', function () {
                    self.render();
                });


			},
			render: function() {

				var oficinas = this.collection;
				var data = { literales: literales, oficinas: oficinas.toJSON() };
				var source = layoutOficinas;
				var template = Handlebars.compile(source);
				var html = template(data);

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.oficinas);

				var scroller = new IScroll('#wrapperList', { probeType: 3 });

				elements.listView();


				$('select[name="provincia"]').change(function() {

					var value = $(this).val();
					var result = oficinas.listbyProvincia();

					if (value == 0) {
						require(["text!templates/elements/listOficinas.html"],
						    function(list) {
						        var data = { literales: literales, oficinas: result.toJSON() };
								var source = list;
								var template = Handlebars.compile(source);
								var html = template(data);

								$('.listView ul').html(html);
						    }
						);
					} else {
						window.location = "#oficinasMapAction/"+value;
					}
				})


			}

		});

		var templateOficinasMap = Backbone.View.extend({
			el: $('article:not(.active)'),
			id: null,
			initialize: function() {

				
				var self = this;
				this.collection = new c.Oficinas();
				this.collection.fetch({reset :true});
                this.collection.bind('reset', function () {
                    self.render();
                });


			},
			render: function() {

				var oficinas = this.collection;
				var data = { literales: literales, oficinas: oficinas.toJSON() };
				var source = layoutOficinasMap;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.oficinas);

				map.mapInitialize(8, 40.42, -3.71);

				if (!this.id) {
					map.mapOficinas(oficinas.toJSON());
				} else {
					var result = oficinas.listbyProvincia(this.id);
					self.showFicha(result);
					map.mapOficinas(result.toJSON());
				}

				$('select[name="provincia"]').change(function() {

					var value = $(this).val();

					if (value != 0) {
						var result = oficinas.listbyProvincia(value);
						
						map.mapOficinas(result.toJSON());
						self.showFicha(result);
					} else {
						map.mapOficinas(oficinas.toJSON());
					}

				});


			}, 
			showFicha: function(result) {

				require(["text!templates/elements/ficha.html"],
					    function(ficha) {
					    	var oficina = result.toJSON();

					        var data = { literales: literales, oficina: oficina };
							var source = ficha;
							var template = Handlebars.compile(source);
							var html = template(data);

							$('.fichaLoad').html(html);
							

							$('.ficha').css({y: -$(".ficha").height(), opacity: 1});
							$(".ficha").delay(300).transition({y: 0}, 300, "ease", function() {
								 $('.map').css({"height":"50%", "top":"50%"});

								 map.mapCenter(oficina[0].lat, oficina[0].lng);
							});
									


							var action =  $('.ficha').hammer();
							var buttonClose = $('.ficha').find(".btnClose");
							var button = $('.ficha').find(".btnPoint");


							action.on("swipeup", function() {
								var porcentage = ($(this).height()*20)/100;
								var height = $(this).height()-porcentage;
								$('.map').css({"height":"100%", "top":0});
								map.mapCenter(oficina[0].lat, oficina[0].lng);
								$(this).transition({y: -height+15}, 300, "ease", function() {
									
									$(this).find(".btnPoint").addClass("btnClose").removeClass("btnPoint");

								});

							});

							button.on("click", function() {

								if (!button.hasClass("btnClose")) {
									var porcentage = ($(".ficha").height()*20)/100;
									var height = $(".ficha").height()-porcentage;
									$('.map').css({"height":"100%", "top":0});
									map.mapCenter(oficina[0].lat, oficina[0].lng);
									$(".ficha").transition({y: -height+15}, 300, "ease", function() {
										
										$(this).find(".btnPoint").addClass("btnClose").removeClass("btnPoint");

									});
								} else {
									var height = $(".ficha").height();
									
									$(".ficha").transition({y: 0}, 300, "ease", function() {

										$('.map').css({"height":"50%", "top":"50%"});
										map.mapCenter(oficina[0].lat, oficina[0].lng);
										button.addClass("btnPoint").removeClass("btnClose");

									});
								}
							});

					    }
				);
			}

		});

		var templateTelefonos = Backbone.View.extend({
			el: $('article:not(.active)'),
			initialize: function() {
				this.render();
			},
			render: function() {

				var data = { literales: literales };
				var source = layoutTelefonos;
				var template = Handlebars.compile(source);
				var html = template(data);

				$('article:not(.active)').html(html);	
				$('header').find("h1").html(literales.telefonos);
				new IScroll('#wrapperList', { checkDOMChanges: true });	

			}

		});

		return ({
			templateHeaderIndex: templateHeaderIndex,
			templateHeaderContent: templateHeaderContent,
			templateHeaderBasic: templateHeaderBasic,
			templateIntro: templateIntro,
			templateIndex: templateIndex,
			templateAsistencia: templateAsistencia,
			templateAsistenciaForm: templateAsistenciaForm,
			templateTalleres: templateTalleres,
			templateTalleresMap: templateTalleresMap,
			templateAjustes: templateAjustes,
			templateAlertas: templateAlertas,
			templateUrgencias: templateUrgencias,
			templateGuia: templateGuia,
			templateContacto: templateContacto,
			templateOficinas: templateOficinas,
			templateOficinasMap: templateOficinasMap,
			templateTelefonos: templateTelefonos
		})


	});