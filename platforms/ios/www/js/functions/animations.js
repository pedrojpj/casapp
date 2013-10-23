define("animations", ["jquery", "plugins"], function ($, plugins) {

	return {

		animationPage: function (type, time, easing) {

			var self = this;
			var activePage = $('article.active');
			var secondPage = $('article:not(.active)');

			switch(type) {

				case null:

					self._clonePage(activePage, secondPage);

				break;

				case "fade": 

					activePage.transition({"opacity": 0}, time, easing, function() {
						self._clonePage(activePage, secondPage);
					});

				break;
				case "pop":

					secondPage.css({scale: 0.8, opacity: 0, x: 0});
					activePage.css({opacity:1});

					activePage.transition({opacity:0}, time, easing);

					secondPage.transition({scale: 1, opacity: 1}, time, easing, function() {
						self._clonePage(activePage, secondPage);

					});


				break;

				case "flip":

					secondPage.css({ perspective: '100px', rotateY: '180deg'});

					activePage.transition({ perspective: '100px', rotateY: '180deg', "z-index": 1}, time, easing);
					secondPage.transition({ perspective: '0', rotateY: '0', "z-index": 2}, time, easing, function() {
						self._clonePage(activePage, secondPage);

					});				

				break;

				case "slidefade":

					secondPage.css({x: activePage.width()});

					activePage.transition({ x: -activePage.width()}, time, easing);
					secondPage.transition({ x: 0 }, time, easing, function() {
						self._clonePage(activePage, secondPage);

					});


				break;

				case "slidedown":

					secondPage.css({x: -activePage.height()});

					activePage.transition({ y: activePage.height()}, time, easing);
					secondPage.transition({ y: 0 }, time, easing, function() {
						self._clonePage(activePage, secondPage);

					});


				break;


				case "slideback":

					secondPage.css({x: -activePage.width(), opacity: 1});
					activePage.css({opacity:1});

					activePage.transition({ x: +activePage.width()}, time, easing);
					secondPage.transition({ x: 0 }, time, easing, function() {
						self._clonePage(activePage, secondPage);

					});


				break;

				case "popback":

					secondPage.css({scale: 1.2, opacity: 0, x: 0});
					activePage.css({opacity:1});

					activePage.transition({opacity:0, scale: 0.8}, time, easing);

					secondPage.transition({scale: 1, opacity: 1}, time, easing, function() {
						self._clonePage(activePage, secondPage);

					});


				break;


			}

		},

		animationHelp: function() {

			var layout = $('.helpLayout');

			layout.find(".opacity").transition({opacity:0.8}, 300, "ease", function() {

				setTimeout(function() {

					var elementos = layout.find("li").length,
					i = -1,
					interval = 0;


					interval = setInterval(function() {

						i++;

						if (i >=elementos) {
							clearInterval(interval);
							return;
						}

						$('.helpLayout li').eq(i).transition({opacity:1}, 300, "ease");

						


					}, 100)

				})

			});


		},

		animationCloseHelp: function() {

			var layout = $('.helpLayout');

			layout.transition({opacity:0}, 500, "ease", function() {
				layout.remove();
			});

		},

		animationAlerta: function() {

			var layout = $('.alertaLayout');

			layout.find(".opacity").transition({opacity:0.8}, 300, "ease", function() {
				layout.find(".message").css({scale: 0.4, opacity:0});
				layout.find(".message").transition({scale: 1, opacity:1}, 300, "ease");

			});


		},

		animationAlertaClose: function() {

			var layout = $('.alertaLayout');

			layout.find(".message").transition({scale: 0.4, opacity:0}, 300, "ease", function() {
				layout.find(".opacity").transition({opacity:0}, 300, "ease", function() {
					layout.remove();
				})
			});



		},

		_clonePage: function (activePage, secondPage) {

			activePage.removeAttr("style").removeClass("active");
			activePage.empty();
			secondPage.removeAttr("style").addClass("active");

		}


	}

	


});