import {Document, Schema, Model, model} from "mongoose";

export interface IUser {
    email?: string;
    username?: string;
    password?: string;
}

export interface IUserModel extends IUser, Document {
}

export const UserSchema: Schema = new Schema({
    email: String,
    username: String,
    password: String
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);