class Client {
    private socket: SocketIOClient.Socket;
    private user_id = sessionStorage.getItem("user_id");

    constructor() {
        this.socket = io()
        this.socket.on('newUser',  (message: any) => {
            sessionStorage.setItem("socket_id", message);
            if(this.user_id)
            this.socket.emit('updateUser', {socket_id:message, id: this.user_id})
        })
        this.socket.emit("userList", () => {
            this.socket.on("onlineList", (data: any) => {
                console.log(data);
            })
        })
      
        // this.socket.on('random', function (message: any) {
        //     console.log(message)
        //     document.body.innerHTML += 'Winning number is ' + message + '<br/>'
        // })

        // this.socket.on('connect', function () {
        //     console.log('connect')
        //     document.body.innerHTML = ''
        // })

        // this.socket.on('disconnect',  (data: any) =>{
        //     console.log("Ikinchi klent etap :", data)
        //     this.socket.emit('dropUser', data)
        // })
    }
    
}

const client = new Client()