define([
	"jquery",
	"plugins",
	"literales",
	"text!templates/elements/checkbox.html",
	"text!templates/elements/radio.html"], function($, plugins, literales, layoutCheck, layoutRadio) {


	return {

		checkbox: function(callbackOn, callbackOff) {

			$("input[type='checkbox']").each(function(index, elem) {

				$(this).hide();

				var data = {literales: literales};
				var source = layoutCheck;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$(this).before(html);	

				var buttonCheck = $(this).prev().find(".action").hammer();
				var button = $(this).prev().hammer();

				if($(this).is(':checked')) {
					buttonCheck.css({x: buttonCheck.width()});
					if(callbackOn) callbackOn();
				}

				buttonCheck.on("swiperight", function(e) {

					e.stopPropagation();
					$(this).transition({x: $(this).width()}, 300, "ease");
					$(this).parent().next().attr("checked", "checked");
					if(callbackOn) callbackOn();
				});

				buttonCheck.on("swipeleft", function(e) {

					e.stopPropagation();
					$(this).transition({x: 0}, 300, "ease");
					$(this).parent().next().removeAttr("checked");
					if(callbackOff) callbackOff();
				});

				button.on("tap", function(e) {

					e.stopPropagation();

					if($(this).next().is(':checked')) {
						$(this).find(".action").transition({x: 0}, 300, "ease");
						$(this).next().removeAttr("checked");
						if(callbackOff) callbackOff();
					} else {
						$(this).find(".action").transition({x: $(this).find(".action").width()}, 300, "ease");
						$(this).next().attr("checked", "checked");
						if(callbackOn) callbackOn();
					}
				});



			});


		},

		collapsable: function() {

			$('.collapsable').each(function() {

				var action = $(this).hammer();
				var height = $(this).find(".colapText").height();

				$(this).find(".colapText").css({height: 0});

				action.on("release", function(e) {

					e.stopPropagation();
					var $this = $(this);

					if ($(this).hasClass("active")) {

						$(this).find(".colapText").transition({height: 0}, 300, "ease");
						$(this).removeClass("active");

					} else {

						if ($('.collapsable.active').length) {
					
							$('.collapsable.active').find(".colapText").transition({height: 0}, 300, "ease", function() {

								$('.collapsable.active').removeClass("active");
								$this.find(".colapText").transition({height: height}, 300, "ease");
								$this.addClass("active");

							});

						} else {

							$this.find(".colapText").transition({height: height}, 300, "ease");
							$this.addClass("active");
						}
						
					}

					
				});


			});

		},
		listView: function() {

			$('.listView li').each(function() {

				var action = $(this).hammer();

				action.on("tap", function() {
					$(this).addClass("active");
					window.location = $(this).find("a").attr("href");
				})

			});

		},
		radio: function(callback) {

			$('fieldset.radio').each(function() {

				$(this).hide();

				var radioValue = new Array();
				$(this).find("input[type='radio']").each(function(index, elem) {
					radioValue.push($(elem).attr("title"));
				});

				var data = {literales: literales, radio: radioValue};
				var source = layoutRadio;
				var template = Handlebars.compile(source);
				var html = template(data);
				var self = this;

				$(this).before(html);

				var customRadio = $(this).prev();
				var radio = $(this);
				var radioButton = $(this).prev().find("li").hammer();

				radioButton.on("tap", function() {

					customRadio.find("li").removeClass("active");
					radio.find("input").removeAttr("checked");

					var index = $(this).index()+1;
					radio.find("input:nth-child("+index+")").attr("checked", "checked");
					$(this).addClass("active");

					if (callback) callback();
				});


			});


		}

	}





})