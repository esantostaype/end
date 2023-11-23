import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { User } from '../../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../../utils';
import { IBillingAddress, IShippingAddress } from '../../../../interfaces';

type Data =
    | { message: string }
    | {
        user: {
            name: string;
            firstName: string;
            lastName: string;
            birthDay: string;
            phone: string;
            email: string;
        }
    }


export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){

        case 'PUT':
            return updateUser( req, res )
            
        default:
            return res.status(400).json({ message: 'Enpoint no existe.' })
    }
}

const updateUser = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const userToUpdate = await User.findById( id );

    if ( !userToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay usuario con ese ID: ' + id })
    }
    
    const {
        name = userToUpdate.name,
        firstName = userToUpdate.firstName,
        lastName = userToUpdate.lastName,
        birthDay = userToUpdate.birthDay,
        phone = userToUpdate.phone,
        email = userToUpdate.email,
    } = req.body;
    
    await db.connect();

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    firstName,
                    lastName,
                    birthDay,
                    phone,
                    email: email.toLowerCase()
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
                name,
                firstName,
                lastName,
                birthDay,
                phone,
                email
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