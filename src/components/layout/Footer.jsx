import Logo from '../common/Logo';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800/60 py-16 mt-20 bg-white dark:bg-slate-950 transition-colors">
            <div className="max-w-[1400px] mx-auto px-8 sm:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Logo showMobile={true} />
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm font-medium leading-relaxed">
                            The definitive news source for the modern developer. Stay ahead of the curve with hand-picked technical articles and community discussions.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black dark:text-white mb-6 text-[10px] uppercase tracking-[0.2em] text-slate-400">Platform</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Open Source</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Advertise</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black dark:text-white mb-6 text-[10px] uppercase tracking-[0.2em] text-slate-400">Support</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        © 2024 DevNews Platform Inc. Built for storytellers.
                    </p>
                    <div className="flex items-center gap-6">
                        {/* Social Icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
