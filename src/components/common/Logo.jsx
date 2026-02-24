import { Link } from 'react-router-dom';
import { FiRss } from "react-icons/fi";

const Logo = ({ collapsed = false, className = "", showMobile = false, to = "/", iconOnly = false, disableHover = false, isSearchActive = false }) => {
    return (
        <Link to={to} className={`flex items-center gap-2 group shrink-0 ${className}`}>
            <div className={`p-1.5 bg-primary/10 rounded-lg transition-all duration-300 ${!disableHover ? 'group-hover:bg-primary group-hover:text-white' : ''}`}>
                <FiRss size={22} />
            </div>
            {!iconOnly && (
                <h2
                    className={`text-xl uppercase font-black leading-tight tracking-tighter transition-[opacity,transform,max-width] duration-500 ease-in-out overflow-hidden
                    ${isSearchActive ? 'max-sm:max-w-0 max-sm:opacity-0 max-sm:scale-95' : ''}
                    ${collapsed ? 'max-w-0 opacity-0 scale-95 mx-0' : 'max-w-[200px] opacity-100 scale-100'}`}
                >
                    Dev<span className="text-primary">.</span><span className="text-muted/60 lowercase font-medium">adda</span>
                </h2>
            )}
        </Link>
    );
};

export default Logo;
