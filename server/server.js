const express = require('express');
const app = express();
app.use(express.static('../public'))

const {createServer}= require('http');
const httpServer = createServer(app);

const {Server}= require('socket.io');
const io = new Server(httpServer);
const PlayerArray=[];

io.on('connection',(socket)=>{

    console.log(socket.id + " is connected my server");
    io.emit('addPlayer',socket.id);
    //all browser update the 

    
    socket.on('constructPlayer', (obj) => {
        PlayerArray.push({id: obj.id, x:obj.x , y:obj.y});
        io.emit('updatePlayer',PlayerArray);
      });

    socket.on('moveRight',(obj)=>{
        io.emit('moveByID',socket.id);
    })
    socket.on('move',(obj)=>{
        switch(obj){
            case 'right':
                io.emit('moveByID_right',socket.id);
                break;
            case 'left':
                io.emit('moveByID_left',socket.id);
                break;
            case 'up':
                io.emit('moveByID_up',socket.id);
                break;
            case 'front':
                io.emit('moveByID_front',socket.id);
                break;
        }
        
    })
    
    socket.on('stop',(obj)=>{
        io.emit('stopByID',socket.id);
    }) 
})



httpServer.listen(8000);