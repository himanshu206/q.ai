(function (angular) {
	'use strict';

	angular
		.module('notificationFeederApp', ['ngWebSocket'])
		.constant('config', {
			host: '127.0.0.1',
			port: 1337
		});
})(angular);
