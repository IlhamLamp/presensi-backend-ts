import express, {Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import session, { Store } from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import sequelizeConnection from './src/config/dbConnect';

// model
// import User from './src/db/models/User';
// import Guru from './src/db/models/Guru';
// import Siswa from './src/db/models/Siswa';

// routes
import UserRoute from './src/routes/UserRoute';
import GuruRoute from './src/routes/GuruRoute';
import SiswaRoute from './src/routes/SiswaRoute';
import RegisterRoute from './src/routes/RegisterRoute';

// Conf
dotenv.config();
const app = express();
// const sessionStore = SequelizeStore(session.Store);

// const store = new sessionStore({
//     db: sequelizeConnection,
//     table: "Session"
// });

// app.use(session({
//     secret: process.env.SESS_SECRET!,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//         secure: 'auto'
//     }
// }));

// cors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use(cookieParser());
app.use(UserRoute);
app.use(GuruRoute);
app.use(SiswaRoute);
app.use(RegisterRoute);

try {
    app.listen(process.env.APP_PORT, () => {
        console.log(`🚀 App listening on port ${process.env.APP_PORT}`)
    })
} catch (err) {
    console.log("🐊 Error!")
}
