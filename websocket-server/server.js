var WebSocketServer = require('websocket').server;
var http = require('http');

var PORT_NUM = 1337;
var messages = [];
var clients = [];

var NOTIFICATION_TYPE = {
	GENERAL: 'general',
	REMINDER: 'reminder',
	TASK: 'task'
};

var notificationTypeCount = {
	general: 0,
	reminder: 0,
	task: 0
};

var server = http.createServer(function (request, response) {});
server.listen(PORT_NUM, function () {});

// create the server
wsServer = new WebSocketServer({
	httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
	var connection = request.accept(null, request.origin);
	clients.push(connection);

	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			var origMsg = JSON.parse(message.utf8Data);

			notificationTypeCount[origMsg.type]++;

			var obj = {
				createdAt: new Date().getTime(),
				message: origMsg.message,
				type: origMsg.type
			};

			if (obj.message) {
				messages.push(obj);
			}

			for (var i = 0; i < clients.length; ++i) {
				clients[i].sendUTF(
					JSON.stringify({data: {
						messages: messages,
						meta: [
							{
								type: 'Assigned Tasks',
								count: notificationTypeCount[NOTIFICATION_TYPE.TASK]
							},
							{
								type: 'Reminders',
								count: notificationTypeCount[NOTIFICATION_TYPE.REMINDER]
							},
							{
								type: 'Notifications',
								count: notificationTypeCount[NOTIFICATION_TYPE.GENERAL]
							}
						]
					}})
				)
			}
		}
	});

	connection.on('close', function (connection) {
		// close user connection
	});
});