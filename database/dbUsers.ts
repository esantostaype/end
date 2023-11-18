import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs'
import { db } from '.'
import { User } from '../models';
import { IUser } from '../interfaces';

export const getUserById = async( id: string ):Promise<IUser| null> => {

    if ( !isValidObjectId(id) ){
        return null;
    }

    await db.connect();
    const user = await User.findById( id ).lean();
    await db.disconnect();

    if ( !user ) {
        return null;
    }

    return JSON.parse(JSON.stringify(user));

}
export const checkUserEmailPassword = async( email: string, password: string ) => {
    
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) {
        return null;
    }

    if ( !bcrypt.compareSync( password, user.password ) ) {
        return null;
    }

    const { role, name, _id } = user;
    
    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name
    }

}

export const oAuthToDbUser = async( oAuthEmail: string, oAuthUserName: string ) => {

    await db.connect();
    const user = await User.findOne({ oAuthEmail });

    if ( user ) {
        await db.disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
    }

    const newUser = new User ({ email: oAuthEmail, name: oAuthUserName, password: '@', role: 'client' });
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };

}