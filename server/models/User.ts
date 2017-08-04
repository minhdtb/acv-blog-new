import {Document, Schema, Model, model} from "mongoose";
import {IModel} from "./Model";
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

interface IUser {
    username: string;
    password: string;
    email?: string;

    comparePassword(cp);
}

interface IUserModel extends IUser, IModel, Document {
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}).pre('save', beforeSave);

async function beforeSave(this: IUserModel, next) {
    if (this.isModified('password')) {
        let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
    }

    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }

    this.modifiedAt = now;

    next();
}

UserSchema.methods.comparePassword = function (cp) {
  return  bcrypt.compare(cp, this.password);
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);