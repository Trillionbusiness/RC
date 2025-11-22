
import React from 'react';
import { GeneratedPlaybook, GeneratedOffer } from '../../types';

// --- Cashvertising Design System Components ---

const SlidePage: React.FC<{ children: React.ReactNode; themeColor?: string }> = ({ children, themeColor = '#000000' }) => (
    <div className="bg-white font-sans relative overflow-hidden flex flex-col" style={{ width: '800px', height: '600px', pageBreakAfter: 'always', border: `8px solid ${themeColor}` }}>
        {children}
    </div>
);

const SlideHeadline: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h1 className={`text-6xl font-bold uppercase leading-none tracking-tighter mb-4 ${className}`} style={{ fontFamily: "'Oswald', sans-serif" }}>
        {children}
    </h1>
);

const SlideSubhead: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h2 className={`text-2xl font-bold uppercase tracking-widest mb-2 ${className}`} style={{ fontFamily: "'Oswald', sans-serif" }}>
        {children}
    </h2>
);

const Highlight: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "#ffff00" }) => (
    <span style={{ background: `linear-gradient(120deg, ${color} 0%, ${color} 100%)`, backgroundRepeat: "no-repeat", backgroundSize: "100% 40%", backgroundPosition: "0 85%", padding: "0 4px" }}>
        {children}
    </span>
);

const HandwrittenNote: React.FC<{ children: React.ReactNode; className?: string; color?: string }> = ({ children, className, color = '#1e3a8a' }) => (
    <div className={`text-2xl transform -rotate-2 ${className}`} style={{ fontFamily: "'Caveat', cursive", color: color }}>
        {children}
    </div>
);

// --- Individual Slides ---

const TitleSlide: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <SlidePage themeColor="#000000">
        <div className="flex flex-col justify-center items-center h-full p-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Confidential Strategy Deck</p>
            <SlideHeadline>{title}</SlideHeadline>
            <div className="w-32 h-2 bg-yellow-400 my-6"></div>
            <p className="text-2xl font-serif italic text-gray-600 max-w-2xl">"{subtitle}"</p>
            <div className="mt-auto">
                <HandwrittenNote className="text-blue-800">Prepared For You</HandwrittenNote>
            </div>
        </div>
    </SlidePage>
);

const ProblemSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <SlidePage themeColor="#DC2626">
        <div className="h-full p-12 flex flex-col">
            <SlideSubhead className="text-red-600">The Core Problem</SlideSubhead>
            <SlideHeadline>Why You Are Stuck.</SlideHeadline>
            
            <div className="flex-grow flex flex-col justify-center space-y-6 mt-4">
                 {diagnosis.constraints.slice(0,2).map((constraint, i) => (
                    <div key={i} className="flex items-start">
                        <span className="text-5xl mr-6">❌</span>
                        <p className="text-3xl font-serif font-bold text-gray-800 leading-tight">"{constraint}"</p>
                    </div>
                ))}
            </div>
            
            <HandwrittenNote className="self-end text-red-600 mt-4 transform rotate-2">
                This is costing you money every day!
            </HandwrittenNote>
        </div>
    </SlidePage>
);

const VisionSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <SlidePage themeColor="#16A34A">
         <div className="h-full p-12 flex flex-col">
            <SlideSubhead className="text-green-600">The Goal</SlideSubhead>
            <SlideHeadline>The New Reality.</SlideHeadline>

            <div className="flex-grow bg-green-50 border-l-8 border-green-500 flex items-center p-12 mt-4 shadow-lg">
                 <p className="text-4xl font-serif font-bold text-green-900 leading-snug">
                    Imagine if you could simply <Highlight color="#bbf7d0">{diagnosis.actions[0]}</Highlight>... automatically?
                 </p>
            </div>
             <HandwrittenNote className="self-center text-green-700 mt-8">
                We built a map to get here. 👇
            </HandwrittenNote>
        </div>
    </SlidePage>
);

const OfferPromiseSlide: React.FC<{ offer: GeneratedOffer; type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const color = type === 'Grand Slam' ? '#000000' : '#2563EB';
    return (
        <SlidePage themeColor={color}>
             <div className="h-full p-12 flex flex-col text-center justify-center">
                <SlideSubhead className="text-gray-500">{type === 'Grand Slam' ? 'Introducing The Grand Slam Offer' : 'The Entry Point'}</SlideSubhead>
                <h1 className="text-7xl font-black uppercase leading-none mb-8" style={{fontFamily: "'Oswald', sans-serif", color: color}}>{offer.name}</h1>
                
                <div className="bg-yellow-100 p-8 transform -rotate-1 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-3xl font-serif font-bold italic text-gray-900">"{offer.promise}"</p>
                </div>
             </div>
        </SlidePage>
    );
};

const ValueStackSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <SlidePage themeColor="#000000">
         <div className="h-full p-12 flex flex-col">
            <SlideHeadline>Here is What You Get.</SlideHeadline>
            
            <div className="flex-grow mt-4 space-y-3">
                 {offer.stack.slice(0,4).map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
                        <div className="flex items-center">
                            <span className="text-green-600 text-2xl font-black mr-4">✓</span>
                            <p className="text-xl font-bold font-serif text-gray-800">{item.solution}</p>
                        </div>
                        <div className="text-xl font-black text-gray-400 font-sans">{item.value}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 text-right">
                <p className="text-sm font-bold uppercase text-red-600">Total Value</p>
                <p className="text-5xl font-black text-red-600 line-through font-sans decoration-4">{offer.totalValue}</p>
            </div>
         </div>
    </SlidePage>
);

const PriceRevealSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
     <SlidePage themeColor="#000000">
        <div className="h-full flex flex-col">
            <div className="h-1/2 bg-gray-100 flex flex-col justify-center items-center border-b-4 border-black">
                 <p className="text-2xl font-bold uppercase text-gray-500 mb-2">Regular Price</p>
                 <p className="text-8xl font-black text-gray-400 line-through font-sans">{offer.totalValue}</p>
            </div>
            <div className="h-1/2 bg-yellow-400 flex flex-col justify-center items-center relative">
                 <HandwrittenNote className="absolute top-4 right-12 text-black transform rotate-6">Only For You!</HandwrittenNote>
                 <p className="text-2xl font-bold uppercase text-yellow-900 mb-2">Your Investment</p>
                 <p className="text-9xl font-black text-black font-sans tracking-tighter">{offer.price}</p>
            </div>
        </div>
     </SlidePage>
);

const GuaranteeSlide: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <SlidePage themeColor="#000000">
        <div className="h-full p-12 flex flex-col justify-center items-center text-center bg-gray-50">
             <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-5xl mb-8">🛡️</div>
             <SlideHeadline>Risk Reversal</SlideHeadline>
             <p className="text-3xl font-serif font-bold text-gray-800 max-w-3xl leading-relaxed">
                 "{offer.guarantee}"
             </p>
             <HandwrittenNote className="mt-12 text-gray-500">
                 If we don't deliver, we don't deserve your money.
             </HandwrittenNote>
        </div>
    </SlidePage>
);

const OfferPresentationPdf: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const slides: React.ReactNode[] = [];

    slides.push(<TitleSlide title="Growth Blueprint" subtitle={playbook.diagnosis.yourRole} />);
    slides.push(<ProblemSlide diagnosis={playbook.diagnosis} />);
    slides.push(<VisionSlide diagnosis={playbook.diagnosis} />);

    // Offer 1
    slides.push(<OfferPromiseSlide offer={playbook.offer1} type="Grand Slam" />);
    slides.push(<ValueStackSlide offer={playbook.offer1} />);
    slides.push(<PriceRevealSlide offer={playbook.offer1} />);
    slides.push(<GuaranteeSlide offer={playbook.offer1} />);
    
    // Tripwire
    slides.push(<OfferPromiseSlide offer={playbook.downsell.offer} type="Tripwire" />);
    slides.push(<PriceRevealSlide offer={playbook.downsell.offer} />);

    return (
        <div>
            {slides.map((slide, index) => (
                <div key={index}>{slide}</div>
            ))}
        </div>
    );
};

export default OfferPresentationPdf;
