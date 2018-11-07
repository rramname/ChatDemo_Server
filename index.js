var app=require('express')();
const cors=require('cors');

app.use(cors())
var http = require('http').Server(app);
var allowedOrigins = "http://localhost:*";
var io = require('socket.io')(http,
    { origins: "*:*" });

    var users=[];

const port=process.env.PORT || 3000


app.get("/",function(req,resp){
  resp.send('<h1>Chat app online...</h1>');
})

http.listen(port, function(){
  console.log('listening on *:3000');
});

io.on("connection", (socket)=>{
    
    console.log("user connected")
    
    socket.on("new-connection",(user)=>{
      
      users.push(user)
      io.emit("new-connection-success",users)
    })
    
    //io.broadcast.emit("new-connection-success",users)

    socket.on("new-message",(msg)=>{
      io.emit("new-message",msg);
      
    })

    socket.on('disconnect', function (user) {
      console.log("User disconnected.")
      let userIndx=users.indexOf(user);
      users.splice(userIndx-1,1);
      io.emit('user-disconnected',users);
    });
})

