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
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * ( taxRate + 1 );

        if( total !== backendTotal ) {
            throw new Error( 'El total no cuadra con el monto' );
        }

        if ( session ) {
            const user = session.user._id;
            const newOrder = new Order({ ...req.body, isPaid: false, user });
            await newOrder.save();    
            await db.disconnect();    
            return res.status(201).json( newOrder );
        } else {
            const newOrder = new Order({ ...req.body, isPaid: false });
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