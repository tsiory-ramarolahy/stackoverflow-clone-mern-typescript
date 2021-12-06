import questionModel from "../models/question.model";
import mongoose from 'mongoose';
import { Request, Response } from "express";
import { request } from "http";

export const getAllQuestion = async (req:Request, res:Response) => {
    questionModel.find()
}