import User from '../models/userModel.js';
import Otp from '../models/otpModel.js';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import { generateTokenAndSetCookie, clearCookie } from '../utils/jwtUtils.js';
import { sendEmail } from '../utils/sendEmail.js';

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

export const checkUsername = async (req, res, next) => {
  try {
    const { username } = req.query;
    const user = await User
      .findOne({ username })
      .select('username');

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
      role: 'user',
      email,
      password: hashedPassword,
      budget: 9000000,
      points: 0,
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

export const sendOTP = async (req, res) => {
  const { email} = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ email });

    await Otp.create({ email, otp, expiresAt: otpExpiry });

    await sendEmail({
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ success: true, message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};


export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) return res.status(400).json({ success: false, message: "Invalid OTP" });

    // OTP is valid; delete it
   // await Otp.deleteMany({ email });
    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to verify OTP." });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) return res.status(400).json({ success: false, message: "Invalid OTP" });

    const now = new Date();
    if (now > otpEntry.expiresAt) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ success: false, message: "OTP has expired. Request a new one." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    await Otp.deleteMany({ email });
    res.status(200).json({ success: true, message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reset password." });
  }
}


