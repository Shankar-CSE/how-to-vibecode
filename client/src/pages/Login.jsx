import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    // Redirect to home if already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name] || errors.general) {
            setErrors({ ...errors, [name]: '', general: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Check credentials as per instructions
            if (formData.email === 'user@gmail.com' && formData.password === '123456') {
                console.log('Login Successful:', formData);
                login({ email: formData.email, name: 'Sample User' });
                navigate('/');
            } else {
                setErrors({ general: 'Invalid email or password' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden antialiased">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/10 blur-[130px] rounded-full"></div>

            <div className="w-full max-w-md z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 via-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-4 animate-in fade-in zoom-in duration-700">
                        <span className="text-white font-black text-3xl tracking-tighter">T</span>
                    </div>
                    <h2 className="text-white text-3xl font-black tracking-tight mb-2">Welcome Back</h2>
                    <p className="text-slate-400 font-medium tracking-tight text-center">Log in to manage your workspace</p>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.general && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl text-sm font-bold text-center">
                                {errors.general}
                            </div>
                        )}
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`w-full bg-slate-950/50 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} text-white rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600`}
                                placeholder="user@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="mt-1.5 text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-slate-300 text-sm font-bold" htmlFor="password">Password</label>
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold transition-colors">Forgot Password?</a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`w-full bg-slate-950/50 border ${errors.password ? 'border-red-500/50' : 'border-slate-800'} text-white rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600`}
                                placeholder="123456"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="mt-1.5 text-red-500 text-xs font-bold ml-1">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 mt-2"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 font-medium">
                            Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1">Get Started</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

