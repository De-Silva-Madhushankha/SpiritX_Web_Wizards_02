import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import { generateTokenAndSetCookie, clearCookie } from '../utils/jwtUtils.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const checkUsername = async (req, res, next) => {
  try {
    const { username } = req.query;
    const user = await User
      .findOne({ username })
      .select('username');
    console.log(user);
    if (user) { 
      res.status(200).json({ available: false });
    } else {
      res.status(200).json({ available: true });
    }   
  }
  catch (error) {
    next(error);
  }
}


export const signup = async (req, res, next) => {

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;

    if (userResponse) {
      res.status(201).send({ success: true, message: "User created successfully", user: userResponse });
    }
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, 'Email already exists'));
    }
  }
}


export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validUser = await User.findOne({ username });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const isMatch = await bcryptjs.compare(password, validUser.password);
    if (!isMatch) {
      return next(errorHandler(401, 'Invalid credentials'));
    }

    const { password: hashedPassword, ...rest } = validUser._doc;

    if (validUser) {
      const token = generateTokenAndSetCookie(validUser._id, res);
      res.status(200).json({success:true,user:rest,token:token});
    }
  } catch (error) {
    next(error);
  }
};


export const signout = (req, res) => { 
  clearCookie(res);
}

export const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User
      .findOne({ email })
      .select('email'); 
    if (!user) {
      return next(errorHandler(404, 'Email not found'));
    }
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  }
  catch (error) {
    next(error);
  }
}

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User
      .findOne({ email })
      .select('email');
    if (!user) {
      return next(errorHandler(404, 'Email not found'));
    }
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  }
  catch (error) {
    next(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User
      .findOneAndUpdate({ email }, { password: hashedPassword })
      .select('email');
    if (!user) {
      return next(errorHandler(404, 'Email not found'));
    }
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  }
  catch (error) {
    next(error);
  }
}


