import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';
import { IBillingAddress, IShippingAddress } from '../../../interfaces';

type Data =
    | { message: string }
    | {
        token: string;
        user: {
            name: string;
            firstName: string;
            lastName: string;
            birthDay: string;
            email: string;
            password: string;
            role: string;
            billingAddress?: IBillingAddress;
            shippingAddress?: IShippingAddress;
        }
    }


export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){

        case 'POST':
            return registerUser( req, res )
            
        default:
            return res.status(400).json({ message: 'Enpoint no existe.' })
    }
}

const registerUser = async( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {
        name = '',
        firstName = '',
        lastName = '',
        birthDay = '',
        email = '',
        password = '',
        billingAddress = {},
        shippingAddress = {}
    } = req.body as {
        name: string,
        firstName: string,
        lastName: string,
        birthDay: string,
        email: string,
        password: string,
        billingAddress?: IBillingAddress;
        shippingAddress?: IShippingAddress;
    } ;
    
    await db.connect();
    const user = await User.findOne({ email });

    if ( user ) {
        return res.status( 400 ).json({
            message: "You can't use that email"
        });
    }

    const newUser = new User({
        name,
        firstName,
        lastName,
        birthDay,
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        billingAddress,
        shippingAddress
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            message: 'Review Server Logs'
        })
    }

    const { _id, role } = newUser;

    const token = jwt.signToken( _id, email );

    return res.status( 200 ).json ({
        token,
        user: {
            name,
            firstName,
            lastName,
            birthDay,
            email,
            password,
            role,
            billingAddress: undefined,
            shippingAddress: undefined
        }
    })

}