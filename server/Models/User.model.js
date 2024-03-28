import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please enter an uniqe Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
    },
    firstname: {type: String},
    lastname: {type: String},
    mobile: {type: Number },
    address: {type: String},
    profile: {type: String}

});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
