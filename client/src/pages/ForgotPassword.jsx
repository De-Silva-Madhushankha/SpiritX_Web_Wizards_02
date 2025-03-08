import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOTP, verifyOTP, resetPassword } from '../features/auth/authActions';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Step tracking
    const [currentStep, setCurrentStep] = useState('email'); // 'email', 'otp', or 'reset'

    // Form data
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI states
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    // OTP validation
    const validateOTP = (otp) => {
        if (!otp.trim()) {
            setOtpError('OTP is required');
            return false;
        } else if (!/^\d{6}$/.test(otp)) {
            setOtpError('OTP must be 6 digits');
            return false;
        } else {
            setOtpError('');
            return true;
        }
    };

    const evaluatePasswordStrength = (password) => {
        let strength = '';

        if (!password) {
            setPasswordStrength('');
            return;
        }

        if (password.length > 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength = 'strong';
        } else if (password.length >= 6) {
            strength = 'medium';
        } else {
            strength = 'weak';
        }

        setPasswordStrength(strength);
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 'strong': return 'bg-green-500';
            case 'medium': return 'bg-yellow-500';
            case 'weak': return 'bg-red-500';
            default: return 'bg-gray-200';
        }
    };

    // Password validation
    const validatePassword = () => {
        let valid = true;
        let error = '';

        // Validate password
        if (!password.trim()) {
            error = 'Password is required';
            valid = false;
        } else if (password.length < 8) {
            error = 'Password must be at least 8 characters';
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            error = 'Password must contain at least one uppercase letter';
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            error = 'Password must contain at least one lowercase letter';
            valid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            error = 'Password must contain at least one special character';
            valid = false;
        } else {
            error = '';
        }

        evaluatePasswordStrength(password);
        setPasswordErrors({ ...passwordErrors, password: error });
        return valid;
    };

    // Confirm password validation
    const validateConfirmPassword = () => {
        if (!confirmPassword.trim()) {
            setPasswordErrors({ confirmPassword: 'Confirm password is required' });
            return false;
        } else if (password !== confirmPassword) {
            setPasswordErrors({ confirmPassword: 'Passwords do not match' });
            return false;
        } else {
            setPasswordErrors({ confirmPassword: '' });
            return true;
        }
    };

    // Handle input changes
    const handleChange = (e, field) => {
        const value = e.target.value;

        switch (field) {
            case 'email':
                setEmail(value);
                validateEmail(value);
                break;
            case 'otp':
                // Only allow digits
                const otpValue = value.replace(/\D/g, '').slice(0, 6);
                setOtp(otpValue);
                validateOTP(otpValue);
                break;
            case 'password':
                setPassword(value);
                validatePassword();
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                validateConfirmPassword();
                break;
            default:
                break;
        }
    };

    // Handle Step 1: Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(sendOTP({ email }));

            if (result.payload?.success) {
                toast.success('OTP sent to your email. Please check your inbox.');
                setCurrentStep('otp');
            } else {
                if (result.error?.message.includes('not found')) {
                    setEmailError('No account found with this email address');
                } else {
                    toast.error('Failed to send OTP. Please try again later.');
                }
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Step 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        if (!validateOTP(otp)) {
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(verifyOTP({ email, otp }));

            if (result.payload?.success) {
                toast.success('OTP verified successfully.');
                setCurrentStep('reset');
            } else {
                setOtpError('Invalid or expired OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Failed to verify OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(resetPassword({
                email,
                otp,
                password
            }));

            if (result.payload?.success) {
                toast.success('Password reset successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error('Failed to reset password. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Resend OTP handler
    const handleResendOTP = async () => {
        if (!validateEmail(email)) {
            return;
        }

        try {
            const result = await dispatch(sendOTP({ email }));

            if (result.payload?.success) {
                toast.success('New OTP sent. Please check your email.');
                setOtp('');
            } else {
                toast.error('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/assets/signup-bg.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <div className="relative bg-white/10 p-8 rounded-3xl backdrop-filter backdrop-blur-md border border-white/20 shadow-2xl w-full max-w-md z-10 text-white">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-100">Forgot Password</h2>
                    <p className="text-gray-300 mt-2">
                        {currentStep === 'email' && "Enter your email to receive a verification code"}
                        {currentStep === 'otp' && "Enter the 6-digit code sent to your email"}
                        {currentStep === 'reset' && "Create a new password for your account"}
                    </p>
                </div>

                {/* Step 1: Email Input */}
                {currentStep === 'email' && (
                    <form onSubmit={handleSendOTP} className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-1">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => handleChange(e, 'email')}
                                className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                                placeholder="Enter your email address"
                            />
                            {emailError && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting || emailError}
                                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${isSubmitting || emailError ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-700 hover:shadow-lg'}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </div>

                        <div className="text-center font-semibold">
                            <a href="/login" className="text-sm text-orange-400 hover:underline">
                                Back to Login
                            </a>
                        </div>
                    </form>
                )}

                {/* Step 2: OTP Verification */}
                {currentStep === 'otp' && (
                    <form onSubmit={handleVerifyOTP} className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-100 mb-1">
                                Verification Code
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => handleChange(e, 'otp')}
                                className={`w-full px-4 py-3 rounded-lg border ${otpError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                            />
                            {otpError && <p className="mt-1 text-sm text-red-600">{otpError}</p>}
                            <p className="text-sm text-gray-300">
                                A 6-digit verification code has been sent to {email}
                            </p>
                        </div>

                        <div className="flex items-center justify-between space-x-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${isSubmitting || otpError ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-700 hover:shadow-lg'}`}
                            >
                                {isSubmitting ? 'Verifying...' : 'Verify Code'}
                            </button>
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 bg-orange-400 hover:bg-orange-700 hover:shadow-lg'}`}
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3: Reset Password */}
                {currentStep === 'reset' && (
                    <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                        {/* New Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => handleChange(e, 'password')}
                                    className={`w-full px-4 py-3 rounded-lg border ${passwordErrors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-100 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {passwordErrors.password && <p className="mt-1 text-sm text-red-600">{passwordErrors.password}</p>}

                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                                className={`h-2 rounded-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                                                style={{ width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : passwordStrength === 'strong' ? '100%' : '0%' }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium capitalize">
                                            {passwordStrength && `${passwordStrength}`}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {/* Password Requirements */}
                            <div className="mt-2 grid grid-cols-2 gap-1">
                                <p className={`text-xs ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-300'}`}>• Add Lowercase letters</p>
                                <p className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-300'}`}>• Add Uppercase letters</p>
                                <p className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-300'}`}>• Add Special characters</p>
                                <p className={`text-xs ${password.length >= 8 ? 'text-green-600' : 'text-gray-300'}`}>• 8+ characters</p>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-100 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => handleChange(e, 'confirmPassword')}
                                    className={`w-full px-4 py-3 rounded-lg border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
                                    placeholder="Confirm your new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-100 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {passwordErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${isSubmitting || passwordErrors.password || passwordErrors.confirmPassword ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-700 hover:shadow-lg'}`}
                            >
                                {isSubmitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;