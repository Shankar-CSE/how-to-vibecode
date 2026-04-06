import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Signup Successful:', formData);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden antialiased">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/10 blur-[130px] rounded-full"></div>

            <div className="w-full max-w-md z-10">
                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 via-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-4 animate-in fade-in zoom-in duration-700">
                        <span className="text-white font-black text-3xl tracking-tighter">T</span>
                    </div>
                    <h2 className="text-white text-3xl font-black tracking-tight mb-2">Create Account</h2>
                    <p className="text-slate-400 font-medium">Join Taskflow and optimize your workflow</p>
                </div>

                {/* Signup Card */}
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="fullname">Full Name</label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                className={`w-full bg-slate-950/50 border ${errors.fullname ? 'border-red-500/50' : 'border-slate-800'} text-white rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600`}
                                placeholder="John Doe"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                            {errors.fullname && <p className="mt-1.5 text-red-500 text-xs font-bold ml-1">{errors.fullname}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`w-full bg-slate-950/50 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} text-white rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600`}
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="mt-1.5 text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`w-full bg-slate-950/50 border ${errors.password ? 'border-red-500/50' : 'border-slate-800'} text-white rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="mt-1.5 text-red-500 text-xs font-bold ml-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className={`w-full bg-slate-950/50 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-slate-800'} text-white rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600`}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="mt-1.5 text-red-500 text-xs font-bold ml-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 mt-2"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 font-medium">
                            Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
