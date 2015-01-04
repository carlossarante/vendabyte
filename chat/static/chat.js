ws = new WebSocket("ws://127.0.0.1:8001/websocket");

ws.onmessage = function(evt){ 
	x = document.getElementsByName("chatbox");
	x[0].innerHTML += evt.data+"\n";
}
	
function sendMessage(){
	x = document.getElementsByName("messagebox");
	ws.send(x[0].value);
}

