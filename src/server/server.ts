import express, {Express} from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import {sequelize}  from './db/config';
import routes from './api/index';
import socketController from './api/socket.controller';

const router: Express = express();
const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: socketIO.Server

    constructor(port: number) {
        this.port = port

        sequelize.authenticate()
        .then(() => {
            console.log('database connected');
        })
        .catch(err => {
            console.error('Error database disconnected ->:', err);
        });

        router.use(express.urlencoded({ extended: false }));
        router.use(express.json());
        router.use('/', routes);

        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/', router);
        this.server = new http.Server(app)
        this.io = new socketIO.Server(this.server)

        this.io.on('connection', (socket: socketIO.Socket) => {
           
            socket.emit('newUser', socket.id)
            socketController(socket);
            
            // socket.broadcast.emit(
            //     'message',
            //     'Everybody, say hello to ' + socket.id
            // )


            // socket.on('disconnect',  () => {
          
            //     socket.emit('deleteUser', socket.id);
            //     console.log("Birinchi etap :", socket.id)
            //     // socket.broadcast.emit(
            //     //     'everyOne',
            //     //     'This user disconnected ' + socket.id
            //     // )
            // })
        })

        // setInterval(() => {
        //     this.io.emit('random', Math.floor(Math.random() * 10))
        // }, 1000)
    }

    public Start() {
        this.server.listen(this.port)
        console.log(`Server listening on port ${this.port}.`)
    }
}

new App(port).Start()