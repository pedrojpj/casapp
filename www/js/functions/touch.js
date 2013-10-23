define(["jquery", "plugins"], function($, plugins) {

	return ({

		initialize: function() {

			$('a').hammer().on("tap", function(e) {
				e.preventDefault();
				window.location = $(this).attr("href");
			});

		}


	})


})