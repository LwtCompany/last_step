import { Op } from 'sequelize';
import { User } from './../db/models/User.model';
export default  function(socket_io){
    socket_io.on('updateUser', async (data) => {
        await updateUser(data)
    });

    socket_io.on('disconnect',  async () => {
        await offline(socket_io.id);
    });

    socket_io.on("userList", async () => {
       const userList = await onlineList();
    //    console.log(userList)
        // socket_io.emit("onlineList", (userList));
    })
}

async function updateUser(params:any) {
    const {id, socket_id} = params;
    console.log(id)
    const user_data = await User.findOne({
        where: {
            id
        }
    });

    if(user_data){
        user_data.socket_id = socket_id;
        await user_data.save();
    }
 
}

async function offline(socket_id:any) {
        const user = await User.findOne({
            where:{
                socket_id
            }
        });

        user.socket_id = null;
        await user.save();

        console.log("Oxirgi jarayon :", user.socket_id)
}

async function onlineList() {
    const users_list = await User.findAll({
        where: {
            socket_id:{
                [Op.not]: null
            }
        }
    });
    console.log(users_list)
    // return users_list;
}