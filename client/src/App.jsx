import React from 'react';

const Sidebar = () => {
    // User data - could be fetched from context or API
    const user = {
        name: "Shankar CSE",
        role: "Project Manager",
    };

    // Get the first letter of the name for the avatar
    const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <aside className="w-80 h-screen bg-[#020617] border-r border-slate-800 flex flex-col p-8 transition-all duration-300">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 via-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-black text-2xl tracking-tighter">T</span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Taskflow
                </h1>
            </div>

            {/* Navigation Modules */}
            <nav className="flex-grow flex flex-col gap-2">
                <NavItem icon={<DashboardIcon />} label="Dashboard" active />
                <NavItem icon={<ProjectIcon />} label="Projects" />
                <NavItem icon={<TeamIcon />} label="Team members" />
            </nav>

            {/* User Profile Section (Bottom) */}
            <div className="mt-auto pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-4 p-2 transition-all duration-300 hover:bg-slate-900/50 rounded-2xl cursor-pointer group">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-extrabold shadow-xl group-hover:scale-105 transition-transform">
                            {initial}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#020617] rounded-full"></div>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-slate-100 font-semibold truncate text-[15px]">{user.name}</span>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest truncate">{user.role}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ icon, label, active }) => (
    <div 
        className={`flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 cursor-pointer group
            ${active 
                ? 'bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/20 font-bold' 
                : 'text-slate-400 hover:bg-slate-900/80 hover:text-white font-semibold'}`}
    >
        <span className={`w-5 h-5 transition-colors duration-300 ${active ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`}>
            {icon}
        </span>
        <span className="text-[15px] tracking-wide">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>}
    </div>
);

// Icons
const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
);
const ProjectIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
);
const TeamIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

function App() {
    return (
        <div className="flex h-screen bg-[#020617] overflow-hidden antialiased">
            {/* Sidenav Section */}
            <Sidebar />

            {/* Container Section (Main Content) */}
            <main className="flex-1 overflow-hidden relative">
                {/* Modern Blur Effect */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full transition-all"></div>
                
                <div className="h-full w-full bg-[#f8fafc] rounded-tl-[48px] shadow-[inset_0_4px_24px_rgba(0,0,0,0.06)] border-t border-l border-slate-200/50 p-10 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <header className="flex justify-between items-center mb-12">
                            <div>
                                <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">Workspace</span>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tight mt-1">Overview</h2>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
                                    Filters
                                </button>
                                <button className="bg-[#020617] text-white px-6 py-3 rounded-2xl font-bold shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                                    New Task
                                </button>
                            </div>
                        </header>
                        
                        {/* Placeholder Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="group bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500">
                                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 group-hover:rotate-6 transition-all duration-500">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            {i === 1 ? '📈' : i === 2 ? '🔥' : '💎'}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                                        {i === 1 ? 'Activity' : i === 2 ? 'Projects' : 'Analytics'}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Everything you need to stay on top of your workflow and accelerate your team performance.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;