var app=require('express')();
var http = require('http').Server(app);
var allowedOrigins = "http://localhost:*";
var io = require('socket.io')(http,{ origins: allowedOrigins});
const cors=require('cors');



const port=process.env.PORT || 3000

app.use(cors())
app.get("/",function(req,resp){
  resp.send('<h1>Chat app online...</h1>');
})

http.listen(port, function(){
  console.log('listening on *:3000');
});
io.configure(function () {  
  io.set("transports", ["websocket", "xhr-polling"]); 
  io.set("polling duration", 10); 
});
io.on("connection", (socket)=>{
    console.log("user connected")

    socket.on("new-message",(msg)=>{
      console.log(msg);
      io.emit("new-message",msg);
      
    })
})

