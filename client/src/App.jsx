import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useAuth } from './context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const initial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <aside className="w-80 h-screen bg-[#020617] border-r border-slate-800 flex flex-col p-8 transition-all duration-300">
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 via-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-black text-2xl tracking-tighter">T</span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Taskflow</h1>
            </div>

            <nav className="flex-grow flex flex-col gap-2">
                <NavItem to="/" icon={<DashboardIcon />} label="Dashboard" />
                <NavItem to="/projects" icon={<ProjectIcon />} label="Projects" />
                <NavItem to="/team" icon={<TeamIcon />} label="Team members" />
                <NavItem to="/profile" icon={<ProfileIcon />} label="Profile" />
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-800/80">
                <div 
                    onClick={logout}
                    title="Click to Logout"
                    className="flex items-center gap-4 p-2 transition-all duration-300 hover:bg-red-500/10 rounded-2xl cursor-pointer group"
                >
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-extrabold shadow-xl group-hover:scale-105 transition-transform">
                            {initial}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#020617] rounded-full group-hover:bg-red-500 group-hover:border-red-500/20 transition-colors"></div>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-slate-100 font-semibold truncate text-[15px] group-hover:text-red-400 transition-colors">{user?.name || 'User'}</span>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest truncate">Click to Logout</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};


const NavItem = ({ to, icon, label }) => (
    <NavLink 
        to={to}
        className={({ isActive }) => `flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 cursor-pointer group
            ${isActive 
                ? 'bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/20 font-bold' 
                : 'text-slate-400 hover:bg-slate-900/80 hover:text-white font-semibold'}`}
    >
        {({ isActive }) => (
            <>
                <span className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`}>
                    {icon}
                </span>
                <span className="text-[15px] tracking-wide">{label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>}
            </>
        )}
    </NavLink>
);

const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
);
const ProjectIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
);
const TeamIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ProfileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const Layout = ({ children }) => (
    <div className="flex h-screen bg-[#020617] overflow-hidden antialiased">
        <Sidebar />
        <main className="flex-1 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full transition-all"></div>
            <div className="h-full w-full bg-[#f8fafc] rounded-tl-[48px] shadow-[inset_0_4px_24px_rgba(0,0,0,0.06)] border-t border-l border-slate-200/50 p-1 overflow-y-auto">
                <div className="max-w-6xl mx-auto h-full">
                    {children}
                </div>
            </div>
        </main>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <Layout><Dashboard /></Layout>
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/projects" 
                        element={
                            <ProtectedRoute>
                                <Layout><Projects /></Layout>
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/team" 
                        element={
                            <ProtectedRoute>
                                <Layout><Team /></Layout>
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <ProtectedRoute>
                                <Layout><Profile /></Layout>
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;