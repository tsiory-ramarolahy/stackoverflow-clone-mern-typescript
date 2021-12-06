import { Schema, model } from "mongoose";
import { Question } from "../interfaces/question.interface";

const questionSChema = new Schema<Question>({
    title: {
        type: String
    },
    contents: {
        type: String
    },
    createAt: {
        type:   Number,
        default: new Date().getTime() 
    },
    votes: {
        type: Number, 
        default: 0,
    },
    views: {
        type: Number,
        default: 0
    },
    categories: {
        type: String,
    },
    users: {
        type: [
            {
                id: String,
                username: String,
                avatar: String,
            }
        ]
    },
    answers: {
        type: [
            {
                userName: String,
                contents: String, 
                avatar: String
            }
        ]
    }
})

const questionModel = model('questions', questionSChema);

export default questionModel;