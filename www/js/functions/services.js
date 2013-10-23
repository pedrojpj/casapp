define(["jquery"], function($) {

	return({

		registrarServicio: function(data, callback) {


			var xmlDocument = '<?xml version="1.0" encoding="ISO-8859-1" standalone="yes" ?>';
			xmlDocument += '<InputRegistrar>';
			xmlDocument += '<colectivo>CASER</colectivo>';
			xmlDocument += '</ InputRegistrar>';
			xmlDocument += '</xml>';

			var encrypted = CryptoJS.AES.encrypt("prueba", "Caser", { mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding});

			var value = encrypted.key.toString();

			var data = {
                "xmlInput" : value
        	};

			$.ajax({ 
			   type: "PUT",
			   contentType: "application/text",
			   dataType: "text",
			   url: "http://test-ws.race.es/raceServicesMobileApps/Acceso/registrar/"+value,
			   success: function(data){    

			   alert("pasa");    
			     alert(data);
			   }
			});

		},

		solicitarAsistencia: function(data, callback) {

			var xmlDocument = '<?xml version="1.0" encoding="ISO-8859-1" standalone="yes" ?>';
			xmlDocument += '<InputSolicitarAsistencia>';
			xmlDocument += '<colectivo>CASER</colectivo>';
			xmlDocument += '<Matricula>'+data.matricula+'</Matricula>';
			xmlDocument += '<Latitud>'+data.latitud+'</Latitud> ';
			xmlDocument += '<Longitud>'+data.longitud+'</Longitud>';
			xmlDocument += '<Percance>'+data.percance+'</Percance>';
			xmlDocument += '</InputSolicitarAsistencia>';
			xmlDocument += '</xml>';

			var data = {
                "xmlInput" : xmlDocument
        	};

			$.ajax({
			  type : "PUT",
			  contentType: "text/xml",
			  url: urlServiceRace+"solicitarAsistencia",
			  data: data,
			  success: function(result) {

			  	alert("prueba");
			  	console.log(result);
			  	if(callback) callback(result);
			  }
			});



		}


	})


});