import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '../../../interfaces';
import { db } from '../../../database';
import { Order, Product } from '../../../models';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

type Data =
    | { message: string }
    | IOrder;

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            return createOrder( req, res );
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }

}

const createOrder = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { orderItems, total } = req.body as IOrder;

    const session: any = await getServerSession(req, res, authOptions);
    
    const productsIds = orderItems.map( product => product._id );
    
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {
        const subTotal = orderItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id )!.price;
            if ( !currentPrice ) {
                throw new Error('Verifique el carrito de nuevo, producto no existe');
            }
            return ( currentPrice * current.quantity ) + prev
        }, 0 );
        const tax =  subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const total = subTotal + tax
        const backendTotal = Math.round(( total ) * 100 ) / 100;

        if( total !== backendTotal ) {
            throw new Error( 'El total no cuadra con el monto' );
        }
        
        const orderId = await generateOrderId();

        if ( session ) {
            const user = session.user._id;
            const newOrder = new Order({ ...req.body, orderId, isPaid: false, user });
            newOrder.total = Math.round( newOrder.total * 100 ) / 100;
            await newOrder.save();    
            await db.disconnect();    
            return res.status(201).json( newOrder );
        } else {
            const newOrder = new Order({ ...req.body, orderId, isPaid: false });
            await newOrder.save();
            await db.disconnect();
            return res.status(201).json( newOrder );
        }
        
    } catch (error:any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }
    
}

const generateOrderId = async () => {
    const currentYear = new Date().getFullYear();

    const lastOrder = await Order.findOne({ orderId: new RegExp(`^${currentYear}-`, 'i') })
        .sort({ orderId: -1 })
        .limit(1);

    let lastOrderNumber = 0;

    if (lastOrder && lastOrder.orderId) {
        const lastOrderIdParts = lastOrder.orderId.split('-');
        lastOrderNumber = parseInt(lastOrderIdParts[1], 10);
    }

    const nextOrderNumber = lastOrderNumber + 1;

    const paddingZeros = '000000';
    const orderId = `${currentYear}-${(paddingZeros + nextOrderNumber).slice(-6)}`;
    return orderId;
};