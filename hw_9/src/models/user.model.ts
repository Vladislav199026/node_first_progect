import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: String,
    username: String,
    email: String,
});

const UserModel = mongoose.model('User', UserSchema);


export default UserModel;