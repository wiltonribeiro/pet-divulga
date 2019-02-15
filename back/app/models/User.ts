import mongoose = require('mongoose');
import {Schema} from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
}

export const UserSchema = new mongoose.Schema({
    name: {type: Schema.Types.String, required: true},
});


const User = mongoose.model<IUser>('User', UserSchema);
export default User;