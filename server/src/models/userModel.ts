import { Schema, Document, model, Model } from 'mongoose';
import type { id } from '../types/id.js';

export interface IUser extends Document {
    username: string;
    password: string;
    avatar: string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            description: "Username can't be empty and must be between 3-30 characters",
        },
        password: {
            type: String,
            required: true,
            minlength: 30,
            description: 'Always hash passwords',
        },
        avatar: {
            type: String,
            required: true,
            trim: true,
            description: 'Static images provided by the server',
        },
    },
    { timestamps: true },
);

// Static method to create a user
userSchema.statics['createUser'] = async function (
    username: string,
    password: string,
    avatar: string,
) {
    if (!avatar) avatar = `basicAvatar.svg`;
    const user = new this({ username, password, avatar });
    if (password.length < 30) {
        console.warn('⚠️ Password might not be hashed!');
    }
    return user.save();
};

// Static method to get user by username
userSchema.statics['getUserByUsername'] = async function (username: string) {
    return this.findOne({ username });
};

// Static method to get all users
userSchema.statics['getAllUsers'] = async function () {
    return this.find();
};

// Static method to delete a user by ID
userSchema.statics['deleteUser'] = async function (id: id) {
    return this.findByIdAndDelete(id);
};

// Static method to update password
userSchema.statics['updatePassword'] = async function (id: id, password: string) {
    return this.findByIdAndUpdate(id, { password }, { new: true });
};

userSchema.statics['updateUsername'] = async function (id: id, username: string) {
    return this.findByIdAndUpdate(id, { username }, { new: true });
};

// Static method to update avatar
userSchema.statics['updateAvatar'] = async function (id: id, avatar: string) {
    return this.findByIdAndUpdate(id, { avatar }, { new: true });
};

export interface IUserModel extends Model<IUser> {
    createUser(username: string, password: string, avatar: string): Promise<IUser>;
    getUserByUsername(username: string): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[]>;
    deleteUser(id: id): Promise<IUser | null>;
    updatePassword(id: id, newPassword: string): Promise<IUser | null>;
    updateAvatar(id: id, newAvatar: string): Promise<IUser | null>;
    updateUsername(id: id, newUsername: string): Promise<IUser | null>;
}

export const User = model<IUser, IUserModel>('User', userSchema);
