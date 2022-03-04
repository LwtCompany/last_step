import {Request, Response, NextFunction} from 'express'
import { Op } from 'sequelize';
import {User} from '../db/models/User.model';

interface UserInterface{
    id?: number,
    full_name?: string,
    login: string,
    password: string,
    socket_id?: string
}

const createUser = async(req: Request, res: Response, next: NextFunction) => {
    const {full_name, password, login} = req.body;
    let data;
    
    let is_have = await User.findOne({
        where: {
            full_name: full_name,
            password: password,
            
        }
    });

    if(!(is_have))
        data = await User.create({
            full_name,
            login,
            password
        });

    res.status(405).json({
        message: 'post deleted successfully',
        data
    });
}

const loginUser  = async(req: Request, res: Response, next: NextFunction) => {
    let {login, password} = <UserInterface> req.body;

        let data = await User.findOne({
            where: {
                login: login,
                password: password
            }
        });
        
    res.status(200).send({
        message: 'Success',
        data
    })
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users_list = await User.findAll({
        where: {
            socket_id:{
                [Op.not]: null
            }
        }
    });

    res.status(200).send(users_list)
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.query;
    console.log(id)
    const users_list = await User.destroy({
        where: {
             id
        }
   });

    res.sendStatus(200).send(users_list)
}
export default { createUser, loginUser, getAllUsers,deleteUser };