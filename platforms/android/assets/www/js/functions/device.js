define(["phonegap"], function(phonegap) {

	return {

		initialize: function() {
            this.bindEvents();

        },

        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
            this.receivedEvent('deviceready');
            if (parseFloat(window.device.version) === 7.0) {
                  document.body.style.marginTop = "20px";
            }

        },

        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);

            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }

	}


});