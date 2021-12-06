import { Router } from "express";
import passport from "passport";
import { login, register } from "../controllers/auth.controller";
import {getAllUsers, getOneUser} from '../controllers/user.controller';
import { Request, Response } from "express";
const userRoute = Router();

userRoute.get('/',  getAllUsers);
userRoute.get('/:id', getOneUser);
userRoute.post('/register', register);
userRoute.post('/login', passport.authenticate('local'), (req:Request, res:Response) => {
    res.status(200);
    res.send({message: req.user});
});

export default userRoute;