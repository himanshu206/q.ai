(function (angular) {
	'use strict';

	angular
		.module('notificationApp', ['angularMoment', 'ngWebSocket'])
		.constant('config', {
			host: '127.0.0.1',
			port: 1337
		});
})(angular);