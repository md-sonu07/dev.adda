import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiArrowRight, HiClock, HiUser } from 'react-icons/hi2';

import bgImage from '../../../public/bg/bgImage.webp';

const HomeThumbnail = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <section className="relative w-full h-dvh overflow-hidden group">
            {/* PARALLAX IMAGE CONTAINER */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <div className="sticky top-0 h-full w-full overflow-hidden">
                    <img
                        alt="The Future of LLMs"
                        className="absolute inset-0 w-full h-full object-cover blur-[1px] brightness-70 scale-105"
                        src={bgImage}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                    {/* Optimized Composite Mask for Depth (Single Div) */}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent mix-blend-multiply opacity-60"></div>
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40"></div>
                </div>
            </div>

            {/* CONTENT OVERLAY - Fixed stability and alignment */}
            <div className="relative z-10 w-full h-full px-10 sm:pl-14 md:pl-24 flex flex-col justify-center transition-all duration-500">
                <div className="max-w-5xl space-y-8 md:space-y-10 mt-10 md:mt-20">
                    {/* Headline Architecture */}
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-5xl md:text-7xl font-black text-white/80 leading-[0.9] tracking-tighter drop-shadow-2xl">
                            The Revolution <br />
                            <span className="text-primary-light italic">of Neural Flux</span>
                        </h1>
                        <p className="text-slate-300 text-base sm:text-lg md:text-2xl max-w-3xl font-medium leading-relaxed opacity-95 drop-shadow-xl">
                            Architecting high-scale autonomous systems using a new generation of low-latency enterprise LLM frameworks.
                        </p>
                    </div>

                    {/* Action Hub - Responsive stacking and stability */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                        <Link to="/create-post" className="w-max px-8 sm:px-10 py-3.5 sm:py-4 cursor-pointer bg-primary text-white rounded-xl font-black uppercase text-[10px] sm:text-[11px] tracking-[0.2em] shadow-[0_15px_40px_rgba(19,91,236,0.3)] hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all slant-glow flex items-center justify-center sm:justify-start gap-4 group/btn">
                            Write Your Own Story
                            <HiArrowRight className="text-xl group-hover/btn:translate-x-2 transition-transform duration-500" />
                        </Link>

                        <div className="flex flex-row items-center gap-4 py-3 px-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-x-auto no-scrollbar">
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <HiClock className="text-primary text-lg" />
                                </div>
                                <span className="text-white/90 text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                                    {user?.createdAt ? `Joined ${user.createdAt.slice(0, 10)}` : 'Joined Recently'}
                                </span>
                            </div>
                            <div className="w-px h-6 bg-white/10 shrink-0"></div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <HiUser className="text-primary text-lg" />
                                </div>
                                <span className="text-white/90 text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                                    {user?.fullName || 'Guest User'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeThumbnail;