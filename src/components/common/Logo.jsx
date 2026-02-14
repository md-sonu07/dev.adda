import { Link } from 'react-router-dom';
import { FiRss } from "react-icons/fi";

const Logo = ({ collapsed = false, className = "", showMobile = false }) => {
    return (
        <Link to="/" className={`flex items-center gap-2 group shrink-0 ${className}`}>
            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FiRss size={22} />
            </div>
            <h2
                className={`text-xl uppercase font-black leading-tight tracking-tighter transition-all duration-500 ease-in-out overflow-hidden
                ${showMobile ? 'block' : 'hidden sm:block'}
                ${collapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[200px] opacity-100'}`}
            >
                Dev<span className="text-primary">.</span><span className="text-muted/60 lowercase font-medium">adda</span>
            </h2>
        </Link>
    );
};

export default Logo;
