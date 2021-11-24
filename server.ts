import express from 'express';
import './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import { Router } from 'express';
import userRoute from './routes/user.route';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { strategy } from './strategies/LocalStrategy';
import userModel from './models/user.model';



const app = express();

dotenv.config({ path: './config/.env' });
app.use(cors());
app.use(express.json());


app.use(session({
    secret: 'sidjfoiaiopxcp!!!5452@@çdsfs&fd',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser((user: any, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
    userModel.findOne({ _id: id }, (err: Error, data: any) => {
        const userInformation = {
            username: data.username,
            email: data.email,
            id: data.id,
        };

        cb(err, userInformation);
    });
});

const routes = Router();
const port = process.env.PORT || 7000;

routes.use('/api/user', userRoute);
app.use(routes);

app.listen(port, () => console.log(`server running on port ${port}`));