import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    // Real-time validation as user types
    validateField(id, value);
  };

  // Validate a single field
  const validateField = (id, value) => {
    let errorMessage = '';

    switch (id) {
      case 'username':
        if (value.trim() === '') {
          errorMessage = 'Username is required';
        }
        break;
      case 'password':
        if (value.trim() === '') {
          errorMessage = 'Password is required';
        } else if (value.length < 8) {
          errorMessage = 'Password must be 8 characters';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [id]: errorMessage
    }));
  };

  // Validate all fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Username validation
    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      isValid = false;
    } else {
      newErrors.username = '';
    }

    // Password validation
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8 characters';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await dispatch(loginUser(formData));

      if (result.payload.success) {
        toast.success('Signin successful!');
        if(result.payload.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        // Handle incorrect username/password
        if (result.error.includes('username')) {
          setErrors(prev => ({ ...prev, username: 'Username does not exist' }));
        } else if (result.error.includes('password')) {
          setErrors(prev => ({ ...prev, password: 'Incorrect password' }));
        } else {
          toast.error(result.error); // Show general error
        }
      }
    } catch (error) {
      toast.error('Signin failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h2 className="text-3xl font-bold text-gray-100">Sign In</h2>
          <p className="text-gray-300 mt-2">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-100 mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-100 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none pr-10`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-100 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="text-center font-semibold">
            <Link to="/forgot-password" className="text-sm text-orange-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || Object.values(errors).some(err => err !== '')}
              className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${isSubmitting || Object.values(errors).some(err => err !== '')
                ? 'bg-orange-400 cursor-not-allowed'
                : 'bg-orange-400 hover:bg-orange-700 hover:shadow-lg'
                }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-100">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-400 hover:text-orange-500 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;