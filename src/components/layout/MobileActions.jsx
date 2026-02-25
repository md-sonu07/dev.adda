import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    HiOutlineHome,
    HiOutlinePlus,
    HiOutlineUser,
    HiOutlineChevronLeft
} from 'react-icons/hi2';
import Modal from '../common/Modal';

const MobileActions = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);

    const isCreatePage = pathname === '/create-post';

    const baseIconBtn =
        'p-4 rounded-2xl transition-all duration-300 flex items-center justify-center';

    const inactiveIcon =
        'text-muted hover:bg-box';

    const activeIcon = 'text-primary bg-primary/10';

    const isActive = (path) => pathname === path;

    return (
        <>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden animate-in slide-in-from-bottom-10 duration-700">
                <div className="flex items-center gap-2 p-2 bg-card/80 backdrop-blur-2xl rounded-xl border border-default shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

                    {/* Home */}
                    <Link
                        to="/"
                        aria-label="Home"
                        className={`${baseIconBtn} ${isActive('/') ? activeIcon : inactiveIcon
                            }`}
                    >
                        <HiOutlineHome className="text-xl" />
                    </Link>

                    {/* Primary Action (Story or Go Back) */}
                    <div key={isCreatePage ? 'back' : 'story'} className="animate-in fade-in zoom-in duration-500">
                        {isCreatePage ? (
                            <button
                                onClick={() => setIsExitModalOpen(true)}
                                aria-label="Go back"
                                className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl shadow-xl active:scale-95 hover:scale-105 transition-all duration-300"
                            >
                                <HiOutlineChevronLeft className="text-xl" />
                                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                    Go Back
                                </span>
                            </button>
                        ) : (
                            <Link
                                to="/create-post"
                                aria-label="Create story"
                                className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 active:scale-95 hover:scale-105 transition-all duration-300"
                            >
                                <HiOutlinePlus className="text-xl" />
                                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                    Story
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Profile */}
                    <Link
                        to="/profile"
                        aria-label="Profile"
                        className={`${baseIconBtn} ${isActive('/profile') ? activeIcon : inactiveIcon
                            }`}
                    >
                        <HiOutlineUser className="text-xl" />
                    </Link>

                </div>
            </div>

            <Modal
                isOpen={isExitModalOpen}
                onClose={() => setIsExitModalOpen(false)}
                onConfirm={() => {
                    setIsExitModalOpen(false);
                    navigate(-1);
                }}
                title="Discard Post?"
                type="danger"
                confirmText="Go Back"
                cancelText="Keep Editing"
            >
                Are you sure you want to go back? Any unsaved changes will be lost.
            </Modal>
        </>
    );
};

export default MobileActions;
