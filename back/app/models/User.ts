import mongoose = require('mongoose');

export interface IUser extends mongoose.Document {

}

export const UserSchema = new mongoose.Schema({

});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;