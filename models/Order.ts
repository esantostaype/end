import mongoose, { Model, model, Schema } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({
    orderId: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderItems: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    billingAddress: {
        country: { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    shippingAddress: {
        country: { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    paymentResult: { type: String },
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },
    transactionId: { type: String }
}, {
    timestamps: true
});

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema );

export default Order;