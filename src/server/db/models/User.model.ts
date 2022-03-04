import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({tableName: 'users', timestamps: false})

export class User extends Model<User>{

  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

   
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    full_name: string;

   
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    password: string;

  
    @Column({type: DataType.STRING,  allowNull:false})
    login: boolean;

   
    @Column({type: DataType.STRING,  allowNull:true})
    socket_id: string

    
}