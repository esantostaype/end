import mongoose, { Model, model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDay: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'super-admin', 'editor', 'client'],
        default: 'client',
        required: true
    },
    billingAddress: {
        type: {
            firstName: { type: String },
            lastName: { type: String },
            country: { type: String },
            address: { type: String },
            address2: { type: String },
            city: { type: String },
            zipCode: { type: String },
            phone: { type: String }
        },
        default: undefined
    },
    shippingAddress: {
        type: {
            firstName: { type: String },
            lastName: { type: String },
            country: { type: String },
            address: { type: String },
            address2: { type: String },
            city: { type: String },
            zipCode: { type: String },
            phone: { type: String }
        },
        default: undefined
    }
}, {
    timestamps: true
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema );

export default User;