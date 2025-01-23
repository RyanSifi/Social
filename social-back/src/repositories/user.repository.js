import User from '../models/user.model.js';

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const create = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export default {
    findByEmail,
    create,
};
