import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const User = db.User;

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });

    //antes era if(!(user && ....))
    if (!(user && bcrypt.compareSync(password, user.password))){
        console.log(bcrypt.compareSync(password, user.password))
        console.log(username)
        console.log(user.username)
        console.log(password)
        console.log(user.password)
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        ...user.toJSON(),
        token
    };
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.find({userId: id});
}

async function create(params) {
    // validate
    if (await User.findOne({userId: params.userId})){
        throw `this userid ${params.userId} already exist`
    }
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }
    if (!params.email.includes('@')){
        throw `the ${params.email} is not a emaill valid`
    }

    const user = new User(params);

    // hash password
    if (params.password) {
        user.password = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await User.findOne({userId: id});
    
    console.log(user)

    // validate
    if (!user) throw 'User not found';
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.password = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id) {
    await User.findOneAndDelete({userId: id});
}
