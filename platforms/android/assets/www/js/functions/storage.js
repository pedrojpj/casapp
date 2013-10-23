define(["phonegap", "alertas", "literales", "routes"], function(phonegap, alertas, literales, routes) {

	return {

		getData: function(data) {
			return window.localStorage.getItem(data);
		},
		setData: function(data, value) {
			window.localStorage.setItem(data, value);
			return window.localStorage.getItem(data);
		},
		deleteData: function(data) {
			window.localStorage.removeItem(data);

			return true;
		},
		openDataBase: function(dbName) {
			var self = this;
			var db = window.openDatabase(dbName, "1.0", "Test DB", 1000000);
			db.transaction(populateDB, error, success);

			function populateDB(tx) {
			    tx.executeSql('CREATE TABLE IF NOT EXISTS alertas (id, idProvincia, idZona, name)');
			}

			function error(tx, err) {
		        alertas.error("ERROR", "Error processing SQL: "+err);
		        return false;
		    }

		    function success() {
		        return db;
		    }

		},

		insertAlerta: function(values) {

			var db = window.openDatabase(dbName, "1.0", "Test DB", 1000000);
			db.transaction(populateDB, error, success);

			function populateDB(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS alertas (id Integer PRIMARY KEY AUTOINCREMENT, idProvincia, idZona, name varchar(255) NOT NULL)');
			    tx.executeSql('INSERT INTO alertas (idProvincia, idZona, name) VALUES ('+values[0]+','+values[1]+',"'+values[2]+'")');
			}

			function error(tx, err) {
		        alertas.error("ERROR", "Error processing SQL: "+err);
		        return false;
		    }

		    function success() {
		        alertas.error(literales.alerta_ok, literales.alerta_ok02, function() {

		        	appRouter.navigate('alertasAction', {trigger: true});

		        });
		    }

		},

		deleteAlerta: function(id) {

			var db = window.openDatabase(dbName, "1.0", "Test DB", 1000000);
			db.transaction(populateDB, error, success);

			function populateDB(tx) {
				tx.executeSql('DELETE FROM alertas WHERE id='+id);
			}

			function error(tx, err) {
		        alertas.error("ERROR", "Error processing SQL: "+err);
		        return false;
		    }

		    function success() {
		        alertas.error(literales.alerta_eliminada, literales.alerta_eliminada02, function() {

		        	appRouter.alertasAction();

		        });
		    }

		},

		checkAlertas: function (idProvincia, idZona, callback) {

			var db = window.openDatabase(dbName, "1.0", "Test DB", 1000000);
			db.transaction(populateDB, error, success);

			function populateDB(tx) {
				tx.executeSql('SELECT * FROM alertas WHERE idProvincia = '+idProvincia+' AND idZona = '+idZona, [], success, error);
			}

			function error(tx, err) {
		        alertas.error("ERROR", "Error processing SQL: "+err);
		        return false;
		    }

		    function success(tx, results) {
		        if (callback) callback(results.rows.length);
		    }


		},

		getListAlertas: function(callback) {

			var db = window.openDatabase(dbName, "1.0", "Test DB", 1000000);
			db.transaction(populateDB, error, success);

			function populateDB(tx) {
				tx.executeSql('SELECT * FROM alertas ORDER by id DESC', [], success, error);
			}

			function error(tx, err) {
		        alertas.error("ERROR", "Error processing SQL: "+err);
		        return false;
		    }

		    function success(tx, results) {
		        if (callback) callback(results);
		    }

		}

	}


})