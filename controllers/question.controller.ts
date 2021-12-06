import questionModel from "../models/question.model";
import { Request, Response } from "express";
import { Types } from "mongoose";


export const getAllQuestion = async (req: Request, res: Response) => {
    const questions = await questionModel.find({});
    res.status(200).send(questions);
}

export const getOneQuestion = (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ message: 'id not found' });
    }

    questionModel.findById(
        req.params.id,
        (err: Error, data: any) => {
            if (err) res.status(500).send({ message: 'error on getting question:' + err })
            else res.status(200).send(data);
        }

    );
}

export const postQuestion = async (req: Request, res: Response) => {
    const { title, contents, categories, username, userId, userAvatar } = req.body;

    await questionModel.create({
        title: title,
        contents: contents,
        createAt: new Date().getTime(),
        categories: categories,
        users: {
            id: userId,
            username: username,
            avatar: userAvatar
        }
    }).then(async (data: any) => {
        console.log('question created');
        await data.save();
        return res.status(201).send(data);
    }).catch(e => {
        console.log('error:', e);
        res.status(500).send({ message: e });
    });
}


