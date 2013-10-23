google.maps.visualRefresh = true;

var booleanHistory = false,
    map = null,
    dbName = "caserDB",
    dataBase = null,
    appRouter = null,
    activate = false,
    urlServiceRace = "http://test-ws.race.es/raceServicesMobileApps/";



require.config({
    baseUrl: "",
    paths: {
        backbone: "js/vendor/backbone",
        underscore: "js/vendor/underscore",
        handlebars: "js/vendor/handlebars",
        jquery: "js/vendor/jquery",
        iscroll: "js/vendor/iscroll",
        plugins: "js/vendor/plugins",
        statusBar: "js/vendor/StatusBar",
        routes: "js/routes",
        help: "js/functions/help",
        storage: "js/functions/storage",
        services: "js/functions/services",
        touch: "js/functions/touch",
        animations: "js/functions/animations",
        map: "js/functions/map",
        alertas: "js/functions/alertas",
        elements: "js/functions/elements",
        helpers: "js/functions/helpers",
        views: "js/views",
        models: "js/models",
        collections: "js/collections",
        text: "js/text",
        templates: "js/templates",
        literales: "js/literales"
    },
    shim: {
        "handlebars": {
            exports: "Handlebars"
        },
        "plugins": {

        }
    },
    waitSeconds: 5

});


require(["routes", "storage"], function(r, storage) {

    appRouter = new r.AppRouter();
    Backbone.history.start();

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

});
