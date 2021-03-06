Package.describe({
	summary: "Folktale data.future. A monad for time-dependant values, providing explicit effects for delayed computations, latency, etc."
});

Npm.depends({
	"data.future": "2.2.0"
});

Package.on_use(function (api, where) {
	
		api.export("Future");
	
	where = where || ["client", "server"];
	api.add_files("data_future.js", where);
});

Package.on_test(function (api) {
	api.use(["folktale-data-future", "tinytest", "test-helpers"]);

	api.add_files(["data_future.js", "data_future_tests.js"], ["client", "server"]);
});