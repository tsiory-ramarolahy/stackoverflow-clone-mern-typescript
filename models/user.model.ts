import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

interface User {
    username: string;
    email: string;
    password: string
}

const userSchema = new Schema<User>({
    username: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const userModel = model('users', userSchema);

export default userModel;