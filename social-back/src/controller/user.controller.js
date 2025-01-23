import bcrypt from 'bcrypt';
import userRepository from '../repositories/user.repository.js';

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            return res.status(401).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepository.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully.',
            user: { id: newUser._id, email: newUser.email },
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export default {
    register,
};
