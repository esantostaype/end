import mongoose, { Model, model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDay: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: [ 'admin', 'client' ],
            message: '{VALUE} is not a valid role',
            default: 'client',
            required: true
        }
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