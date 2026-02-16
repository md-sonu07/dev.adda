import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineCommandLine,
    HiArrowRight,
    HiArrowLeft,
    HiOutlineSparkles,
    HiOutlineCodeBracketSquare,
    HiOutlineRocketLaunch
} from 'react-icons/hi2';
import { RiGithubFill, RiGoogleFill } from 'react-icons/ri';

import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../redux/thunks/authThunk';
import { clearError } from '../../redux/slices/authSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Logo from '../../components/common/Logo';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            toast.success('Account created successfully!');
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            const message = typeof error === 'string' ? error : error.message || 'Registration failed';
            toast.error(message);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerAction(formData));
    };

    return (
        <div className="min-h-screen bg-background flex transition-colors duration-500">

            {/* Left Branding Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-primary via-primary/90 to-indigo-600 p-12 flex-col justify-between">
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Floating shapes */}
                <div className="absolute top-20 right-20 size-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
                <div className="absolute bottom-32 left-16 size-48 rounded-full bg-indigo-400/20 blur-2xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 right-1/3 size-32 rounded-full bg-white/5 blur-xl" />

                {/* Top logo */}
                <div className="relative z-10">
                    <Logo disableHover className="invert brightness-0" />
                </div>

                {/* Center content */}
                <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                            Start your<br />journey today.
                        </h2>
                        <p className="text-white/70 font-medium text-lg max-w-md leading-relaxed">
                            Join thousands of developers sharing knowledge, writing tutorials, and building in public.
                        </p>
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
                            <HiOutlineSparkles className="text-amber-300 text-lg" />
                            <span className="text-white/90 text-xs font-bold uppercase tracking-widest">AI Powered</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
                            <HiOutlineCodeBracketSquare className="text-emerald-300 text-lg" />
                            <span className="text-white/90 text-xs font-bold uppercase tracking-widest">Dev Focused</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
                            <HiOutlineRocketLaunch className="text-rose-300 text-lg" />
                            <span className="text-white/90 text-xs font-bold uppercase tracking-widest">Fast Reads</span>
                        </div>
                    </div>
                </div>

                {/* Bottom stats */}
                <div className="relative z-10 flex items-center gap-8">
                    <div>
                        <p className="text-2xl font-black text-white">10k+</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">Developers</p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div>
                        <p className="text-2xl font-black text-white">5k+</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">Articles</p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div>
                        <p className="text-2xl font-black text-white">99%</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">Uptime</p>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 flex items-center gap-2 text-muted hover:text-primary transition-all duration-300 group px-3 py-1.5 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/20"
                >
                    <HiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
                </button>

                <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Mobile logo */}
                    <div className="flex flex-col items-center mb-6 lg:items-start">
                        <Logo iconOnly />
                        <h1 className="text-2xl font-black tracking-tight uppercase lg:text-3xl mt-4">Create Account</h1>
                        <p className="text-muted text-sm font-bold mt-1">Join the developer community</p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <form className="space-y-4" onSubmit={handleSubmit}>

                            {/* Name & Username */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-0.5">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
                                            <HiOutlineUser className="text-lg" />
                                        </div>
                                        <input
                                            className="block w-full pl-11 pr-4 py-3.5 border border-default focus:border-primary/50 rounded-xl outline-none transition-all text-sm font-bold placeholder:text-muted/40 focus:shadow-lg focus:shadow-primary/5"
                                            placeholder="John Doe"
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-0.5">Username</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
                                            <span className="text-sm font-black">@</span>
                                        </div>
                                        <input
                                            className="block w-full pl-11 pr-4 py-3.5 border border-default focus:border-primary/50 rounded-xl outline-none transition-all text-sm font-bold placeholder:text-muted/40 focus:shadow-lg focus:shadow-primary/5"
                                            placeholder="johndoe"
                                            type="text"
                                            name="userName"
                                            value={formData.userName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-0.5">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
                                        <HiOutlineEnvelope className="text-lg" />
                                    </div>
                                    <input
                                        className="block w-full pl-11 pr-4 py-3.5 border border-default focus:border-primary/50 rounded-xl outline-none transition-all text-sm font-bold placeholder:text-muted/40 focus:shadow-lg focus:shadow-primary/5"
                                        placeholder="developer@email.com"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-0.5">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
                                        <HiOutlineLockClosed className="text-lg" />
                                    </div>
                                    <input
                                        className="block w-full pl-11 pr-12 py-3.5 border border-default focus:border-primary/50 rounded-xl outline-none transition-all text-sm font-bold placeholder:text-muted/40 focus:shadow-lg focus:shadow-primary/5"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <HiOutlineEyeSlash className="text-lg" /> : <HiOutlineEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 group shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 slant-glow overflow-hidden relative mt-2"
                            >
                                {loading ? (
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <div className="flex items-center justify-center gap-2.5 relative z-10 font-black">
                                        Create Account
                                        <HiArrowRight className="text-base group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="relative py-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-default"></div>
                            </div>
                            <div className="relative flex justify-center text-[9px] uppercase font-black tracking-widest">
                                <span className="bg-background px-4 text-muted">Or register with</span>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2.5 py-3.5 border border-default rounded-xl hover:bg-box/80 hover:border-primary/30 hover:shadow-md transition-all active:scale-95 group">
                                <RiGithubFill className="text-xl group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                                <span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
                            </button>
                            <button className="flex items-center justify-center gap-2.5 py-3.5 border border-default rounded-xl hover:bg-box/80 hover:border-primary/30 hover:shadow-md transition-all active:scale-95 group">
                                <RiGoogleFill className="text-xl text-red-500 group-hover:scale-110 transition-all duration-300" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
                            </button>
                        </div>

                        <p className="text-center text-sm font-bold text-muted pt-2">
                            Already registered? <Link to="/login" className="text-primary hover:underline ml-1 font-black">Sign in instead</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
