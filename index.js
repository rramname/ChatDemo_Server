var app=require('express')();
const cors=require('cors');

app.use(cors())
var http = require('http').Server(app);
var allowedOrigins = "http://localhost:*";
var io = require('socket.io')(http,
    { origins: "https://chatwebclient.herokuapp.com:*" });



const port=process.env.PORT || 3000


app.get("/",function(req,resp){
  resp.send('<h1>Chat app online...</h1>');
})

http.listen(port, function(){
  console.log('listening on *:3000');
});

io.on("connection", (socket)=>{
    console.log("user connected")

    socket.on("new-message",(msg)=>{
      console.log(msg);
      io.emit("new-message",msg);
      
    })
})

