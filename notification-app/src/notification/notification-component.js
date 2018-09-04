(function (angular, moment) {
	'use strict';

	angular
		.module('notificationApp')
		.component('notificationComponent', {
			templateUrl: 'src/notification/notification-template.html',
			controller: NotificationController
		});

	NotificationController.$inject = ['$scope', 'moment', '$websocket', 'config', '$timeout'];

	function NotificationController($scope, moment, $websocket, config, $timeout) {
		var dataStream = null;

		$scope.successMsg = null;
		$scope.errorMsg = null;

		$scope.notificatons = null;
		$scope.notificationMeta = null;

		init();

		function init() {
			$scope.date = moment().format('LL');

			dataStream = $websocket('ws://' + config.host + ':' + config.port);

			dataStream.onError(function (event) {
				$timeout(function () {
					$scope.errorMsg = 'Connection failed!! Start the websocket server before proceeding';
				});
			});

			dataStream.onOpen(function (event) {
				showSuccessMsg('Connection Successful!!');
			});

			dataStream.onMessage(function (message) {
				var msg = JSON.parse(message.data);

				$scope.notifications = msg.data.messages;

				$scope.notifications.sort(function (a, b) {
					return b.createdAt - a.createdAt
				});

				$scope.notificationListMeta = msg.data.meta;
			});

	        dataStream.send(JSON.stringify({ action: 'get' }));
		}

		function showSuccessMsg(msg, hideAfterTime) {
			$timeout(function () {
				$scope.successMsg = msg;
			});

			$timeout(function () {
				$scope.successMsg = null;
			}, hideAfterTime || 3000);
		}
	}
})(angular, moment);