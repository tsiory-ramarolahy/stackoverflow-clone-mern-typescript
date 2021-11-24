import userModel from "../models/user.model";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await userModel.find().select('-password');
    res.status(200).send(users);
};

export const getOneUser = async (req: Request, res: Response) => {
    if (Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ message: 'id not found' });
    }

    userModel.findById(req.params.id, (err:Error, user:any) => {
        if (err) {
            res.send(500).send({ message: 'error to getting user' })
        } else {
            res.status(200).send(user);
        }
    });
};

