import { Request, Response } from 'express';
import passport from 'passport';
import userModel from '../models/user.model';

export const register = async (req: Request, res: Response, next: any) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(500);
        res.send({
            name: 'EmptyInputError',
            message: 'All input in required'
        });
        return;
    }

    if (req.body.password.length < 6) {
        res.status(500);
        res.send({
            name: 'EmptyInputError',
            message: 'Password must have 6 caractere minimum'
        });
        return;
    }

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
        res.status(500)
        res.send({
            name: 'PasswordError',
            message: 'This email is already exists'
        });
        return;
    }

    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    await newUser.save();
    res.send({ message: 'Success on register user:', userid: newUser._id });

}


export const login = (req: Request, res: Response) => {
    res.status(200);
    res.send({ message: 'user logged' });

}
