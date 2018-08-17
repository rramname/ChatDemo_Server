var app=require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/",function(req,resp){
  resp.send('<h1>Chat app online...</h1>');
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on("connection", (socket)=>{
    console.log("user connected")

    socket.on("new-message",(msg)=>{
      console.log(msg);
      io.emit("new-message",msg);
      
    })
})

