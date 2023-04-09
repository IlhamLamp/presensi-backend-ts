require('dotenv').config();
import express from 'express';
import db from './models';
import { users } from './seeders/users';


const app = express();
const port: number = parseInt(process.env.APP_PORT!);

// DEFINE SEEDER
const createUsers = () => {
    users.map(user => {
        db.User.create(user)
    })
}
// createUsers();

try {
    db.sequelize.sync().then(() => {
        app.listen(port, () => {
            console.log(`🚀 App listening on port ${port}`)
        })
    })
} catch (err) {
    console.log("🐊 Error!")
}
