(function (angular) {
	'use strict';

	angular
		.module('notificationFeederApp')
		.component('notificationFeedComponent', {
			templateUrl: 'src/notification-feed-component/notification-feed-template.html',
			controller: NotificationFeedController
		});

	NotificationFeedController.$inject = ['$scope', '$websocket', 'config', '$timeout'];

	function NotificationFeedController($scope, $websocket, config, $timeout) {
		var dataStream = null;

		$scope.successMsg = null;
		$scope.errorMsg = null;
		$scope.notification = {
			message: null,
			type: null
		};

		$scope.feedNotification = feedNotification;
		$scope.canSubmit = canSubmit;

		init();

		function init() {
			dataStream = $websocket('ws://' + config.host + ':' + config.port);

			dataStream.onError(function (event) {
				$timeout(function () {
					$scope.errorMsg = 'Connection failed!! Start the websocket server before proceeding';
				});
			});

			dataStream.onOpen(function (event) {
				showSuccessMsg('Connection Successful!!');
			});
		}

		function canSubmit() {
			return !!($scope.notification.message && $scope.notification.type);
		}

		function showSuccessMsg(msg, hideAfterTime) {
			$timeout(function () {
				$scope.successMsg = msg;
			});

			$timeout(function () {
				$scope.successMsg = null;
			}, hideAfterTime || 3000);
		}

		function feedNotification() {
			dataStream.send(JSON.stringify($scope.notification));
			showSuccessMsg('Notification feeded to websocket server!!', 1000);
			clearNotification();
		}

		function clearNotification() {
			$scope.notification.message = '';
			$scope.notification.type = '';
		}
	}
})(angular);