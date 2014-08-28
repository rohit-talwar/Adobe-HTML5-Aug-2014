var nodejsWebSocket = require("nodejs-websocket");
var server = nodejsWebSocket.createServer(function(connection){
	console.log("A new connection is established");
	var timer = undefined;
	connection.on("text", function(data){
		console.log("Data received from the client = ", data);
		if (data === "time?"){
			timer = setInterval(function(){
				connection.sendText(new Date().toString())
			},10000);
		} else if (data === "stop"){
			clearInterval(timer);
		} else {
			console.log("unknown request - " + data);
		}
	});
});
server.listen(9090);
console.log("Web socket server is listening on port 9090....");