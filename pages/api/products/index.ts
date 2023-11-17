import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data =
    | { message: string }
    | IProduct[]
    | IProduct

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){

        case 'GET':
            return getProducts( req, res )

        case 'POST':
            return addProduct( req, res )
            
        default:
            return res.status(400).json({ message: 'Enpoint no existe.' })
    }
}

const getProducts = async( req: NextApiRequest,res: NextApiResponse<Data> ) => {

    const { gender = 'all' } = req.query;

    let condition = {}

    if( gender != 'all' && SHOP_CONSTANTS.validGenders.includes( `${ gender }` ) ) {
        condition = { gender };
    };

    await db.connect();
    const products = await Product.find( condition ).select('title images price inStock slug -_id').lean();
    await db.disconnect();
    res.status(200).json( products );
}

const addProduct = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const ProductData = {
        createdAt: Date.now(),
        ...req.body
    };

    const newProduct = new Product(ProductData);
    
    try {
        await db.connect();
        await newProduct.save();
        await db.disconnect();
        return res.status(201).json( newProduct );
    }
    
    catch ( error ) {
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salió mal, revisar consola del servidor.' });
    }
}