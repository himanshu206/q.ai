# q.ai
This is an angular notifications component along with node websocket server to push notifications to the client.

# Apps:
__1. Notification Component:__ This is the main component which will show notifications pushed by the websocket server.

__2. Notification Feeder App:__ This is the application through which we will feed notifications to the websocket server which will be pushed by the websocket server to the client.

__3. Websocket App:__ This is the node websocket server application 



# How to Run the project:
__1.__ Clone the repository from URL -> https://github.com/himanshu206/q.ai.git

__2.__ Open the folder `websocket server` in terminal and run command `npm install` to load all dependencies and then run command `node server.js` to start the websocket server.

__3.__ Open the folder `notification app` in terminal and run command `npm install` to load all dependencies and then run command `live-server` to serve the folder via a light weight web server.

__4.__ Repeat step 2 for folder `notification feeder app`

__5.__ Now the setup is ready, and you can start pushing notifications from `notification feeder app` to websocket server which will push those notifications to `notification app`


