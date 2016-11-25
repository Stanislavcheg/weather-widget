app.factory('weatherForecastResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/forecast?q=:city,country&units=metric&appid=' + api_key;
	return $resource(path);
});