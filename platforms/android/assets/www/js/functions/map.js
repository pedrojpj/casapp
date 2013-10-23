define(["jquery", "alertas", "phonegap"], function($, alertas, phonegap) {

	var mapInitialize = function(zoom, latitude, longitude) {

		var self = this;

		var mapOptions = {

			zoom: zoom,
			center: new google.maps.LatLng(latitude, longitude),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true


		}

		map = new google.maps.Map(document.getElementById('map'), mapOptions);



	};

	var getGeolocation = function(callback) {

		 document.addEventListener("deviceready", onDeviceReady, false);

	    // device APIs are available
	    //
	    function onDeviceReady() {

	    	alert("pasa");
	        navigator.geolocation.getCurrentPosition(onSuccess, onError);
	    }


		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
		var self = this;


		function onSuccess(position) {

			alert("pasa");

		    	var geoPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		    	map.setCenter(geoPosition);
		    	map.setZoom(14);


				var marker = new google.maps.Marker({
				      position: geoPosition,
				      map: map,
				      title: 'You'
				});

				if (callback) callback(position.coords.latitude, position.coords.longitude);

		       
		}

		function onError(error) {
		   alertas.error("ERROR", error.message);
		 }


	};

	var mapTalleres = function() {
		
		 document.addEventListener("deviceready", onDeviceReady, false);

		 var self = this;

		    // device APIs are available
		    //
		    function onDeviceReady() {
		        navigator.geolocation.getCurrentPosition(onSuccess, onError,  {maximumAge: 60000, timeout: 20000, enableHighAccuracy:false});

		    }



		    // onSuccess Geolocation
		    //
		    function onSuccess(position) {

		    	var geoPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		    	map.setCenter(geoPosition);
		    	map.setZoom(14);


				var marker = new google.maps.Marker({
				      position: geoPosition,
				      map: map,
				      title: 'You'
				});

		       
		    }

		    // onError Callback receives a PositionError object
		    //
		    function onError(error) {
		        alertas.error("ERROR", error.message);
		    }


	};


	var mapOficinas = function(oficinas) {

		var bounds = new google.maps.LatLngBounds(),
		i = 0;


		    if (window.devicePixelRatio == 2) {
				var image = {
				    url: 'img/icoMap.png',
				    scaledSize: new google.maps.Size(31, 40)
				};
			} else {
				var image = {
				    url: 'img/icoMap.png'
				};				
			}

		
        $.each(oficinas, function( index, elem ) {
        	i++;

        	marker = new google.maps.Marker({
	            position: new google.maps.LatLng(elem.lat, elem.lng),
	            map: map,
	            icon: image,
	            url: elem.provincia
          	});

          	bounds.extend(marker.position);

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

            	appRouter.oficinasMapAction(marker.url)
           
            }
          })(marker, i));
			
		});

		map.fitBounds(bounds);

	};

	var mapCenter = function(lat, lng) {

		google.maps.event.trigger(map, "resize");
		var geoPosition = new google.maps.LatLng(lat, lng);
		map.setCenter(geoPosition);
	}


	return({

		mapInitialize: mapInitialize,
		mapTalleres: mapTalleres,
		getGeolocation: getGeolocation,
		mapOficinas: mapOficinas,
		mapCenter: mapCenter



	})
	


});