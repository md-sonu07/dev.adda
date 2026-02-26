import { useNavigate } from 'react-router-dom';
import { HiCheck, HiShieldCheck, HiSparkles, HiFire } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const PricingCard = ({
    name,
    price,
    period,
    features,
    isPopular,
    icon: Icon,
    colorClass,
    bgClass,
    buttonClass
}) => {
    return (
        <div className={`relative flex flex-col p-8 rounded-[1.5rem] border border-default transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${isPopular ? 'sm:scale-105 z-10' : ''}`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary/30 flex items-center gap-1.5 animate-pulse">
                    <HiSparkles className="text-sm" />
                    Most Popular
                </div>
            )}

            <div className={`size-14 rounded-2xl ${bgClass} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-inner`}>
                <Icon className={`text-2xl ${colorClass}`} />
            </div>

            <h3 className="text-xl font-black text-text-heading mb-2 tracking-tight">{name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-text-heading">${price}</span>
                <span className="text-muted font-medium text-sm">/{period}</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-text-body/80">
                        <div className="size-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <HiCheck className="text-emerald-500 text-sm" />
                        </div>
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                onClick={() => toast.success(`Redirecting to ${name} checkout...`)}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 active:scale-[0.98] ${buttonClass}`}
            >
                Get Started Now
            </button>
        </div>
    );
};

const Payment = () => {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Basic Access",
            price: "2",
            period: "month",
            icon: HiShieldCheck,
            bgClass: "bg-blue-500/10",
            colorClass: "text-blue-500",
            buttonClass: "bg-box hover:bg-box/80 text-text-heading border border-default",
            features: [
                "Ad-free feed experience",
                "Advanced search filters",
                "Standard support",
                "Bookmark up to 50 posts"
            ]
        },
        {
            name: "Pro Creator",
            price: "5",
            period: "year",
            isPopular: true,
            icon: HiFire,
            bgClass: "bg-primary/10",
            colorClass: "text-primary",
            buttonClass: "bg-primary text-white hover:shadow-xl hover:shadow-primary/30",
            features: [
                "Everything in Basic plan",
                "Unlimited bookmarks",
                "Early access to new features",
                "Exclusive badges on profile",
                "Priority 24/7 support"
            ]
        },
        {
            name: "Elite Life",
            price: "10",
            period: "one-time",
            icon: HiSparkles,
            bgClass: "bg-amber-500/10",
            colorClass: "text-amber-500",
            buttonClass: "bg-text-heading text-background hover:bg-text-heading/90 shadow-xl shadow-black/10",
            features: [
                "Lifetime ad-free access",
                "Unlimited storage for posts",
                "Personalized reading feed",
                "Premium API access",
                "Beta tester membership"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-10 pb-24 px-6 sm:px-14">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-6 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-text-heading tracking-tight">
                        Power Up Your <span className="text-primary italic">Reading.</span>
                    </h1>
                    <p className="text-muted max-w-xl mx-auto font-medium text-lg leading-relaxed">
                        Say goodbye to interruptions. Choose a plan that fits your lifestyle and enjoy a premium ad-free experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                    {plans.map((plan, idx) => (
                        <PricingCard key={idx} {...plan} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-muted hover:text-text-heading transition-colors font-bold text-sm underline underline-offset-4 decoration-primary/30"
                    >
                        Maybe later, take me back
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale pointer-events-none">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Visa_Logo.png" alt="Visa" className="h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
