import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';  // Ensure your errorHandler is defined


//(postman  checked)
export const signup = async (req, res, next) => {
    try {
        // Destructuring only the username and password from the request body
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(errorHandler(400, 'Username already exists'));
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user with the hashed password
        const user = new User({
            username,
            password: hashedPassword,
        });

        // Save the new user to the database
        await user.save();

        // Prepare the response data (remove password from the response)
        const userResponse = user.toObject();
        delete userResponse.password; 

        // Send success response
        res.status(201).send({
            message: "User created successfully",
            user: userResponse,
        });
    } catch (error) {
        // Handle MongoDB duplicate key error (username already exists)
        if (error.code === 11000) {
            return next(errorHandler(400, 'Username already exists'));
        }
        // Pass other errors to the error handler
        next(error);
    }
};
