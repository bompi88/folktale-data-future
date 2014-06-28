Package.describe({
	summary: "Folktale data.future. A monad for time-dependant values, providing explicit effects for delayed computations, latency, etc."
});

Npm.depends({
	"data.future": "2.2.0"
});

Package.on_use(function (api, where) {
	if(api.export)
		api.export("Future");
	
	where = where || ["client", "server"];
	api.add_files("data_future.js", where);
});

Package.on_test(function (api) {
	api.use(["Future", "tinytest", "testhelpers"]);

	api.add_files("data_future.js", ["client", "server"]);
});