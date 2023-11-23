import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { User } from '../../../../models';
import { IBillingAddress, IShippingAddress } from '../../../../interfaces';

type Data =
    | { message: string }
    | {
        user: {
            billingAddress?: IBillingAddress;
            shippingAddress?: IShippingAddress;
        }
    }


export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){

        case 'PUT':
            return updateAddresses( req, res )
            
        default:
            return res.status(400).json({ message: 'Enpoint no existe.' })
    }
}

const updateAddresses = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const userToUpdate = await User.findById( id );

    if ( !userToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay usuario con ese ID: ' + id })
    }
    
    const {
        billingAddress = userToUpdate.billingAddress,
        shippingAddress = userToUpdate.shippingAddress
    } = req.body;
    
    await db.connect();

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    billingAddress,
                    shippingAddress
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            user: {
                billingAddress,
                shippingAddress
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Review Server Logs',
        });
    } finally {
        await db.disconnect();
    }

}