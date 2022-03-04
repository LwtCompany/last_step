import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User.model';
export const sequelize = new Sequelize({
  database: 'ts_chat',
  dialect: 'postgres',
  username: 'postgres',
  password: 'hunter',
  port: 5432,
  models: [__dirname + './models'],
})

sequelize.addModels([User]);