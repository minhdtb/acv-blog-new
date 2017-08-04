import * as mongoose from "mongoose";
import {IModel} from "./Model";
import {Model, model, Schema, Document} from "mongoose";

interface IPost {
    title: string,
    postedBy: mongoose.Types.ObjectId
}

interface IPostModel extends IPost, IModel, Document {
}

export const PostSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}).pre('save', beforeSave);

async function beforeSave(this: IPostModel, next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }

    this.modifiedAt = now;

    next();
}

export const Post: Model<IPostModel> = model<IPostModel>("Post", PostSchema);