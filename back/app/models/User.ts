import mongoose = require('mongoose');

export interface IUser extends mongoose.Document {

}

export const UserSchema = new mongoose.Schema({
    url_image : {type: mongoose.Schema.Types.String},
    type : {type: mongoose.Schema.Types.String, required: true},
    username: {type: mongoose.Schema.Types.String, required: true, unique: true},
    name: {type: mongoose.Schema.Types.String, required: true},
    email: {type: mongoose.Schema.Types.String, required: true, unique: true},
    password: {type: mongoose.Schema.Types.String, required: true},
    registration: {type: mongoose.Schema.Types.String, required: true},
    about: {type: mongoose.Schema.Types.String, required: false},
    status: {type: mongoose.Schema.Types.Boolean, required: true},
    links: [{
        type: mongoose.Schema.Types.String, required: false
    }],
    publications: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Publication'
    }]
});


const User = mongoose.model<IUser>('User', UserSchema);
export default User;