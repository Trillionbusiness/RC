
import React from 'react';
import { GeneratedPlaybook, GeneratedOffer } from '../../types';

// --- Reusable PDF Page Wrapper ---
const PdfSlide: React.FC<{ children: React.ReactNode; pageNumber: number; totalPages: number; themeColor?: string }> = ({ children, pageNumber, totalPages, themeColor = '#147273' }) => (
    <div className="bg-[#FEFBF6] font-sans relative" style={{ width: '800px', height: '1131px', display: 'flex', flexDirection: 'column', pageBreakAfter: 'always', border: '8px solid #3A3A3A' }}>
        <div className="flex-grow p-16 flex flex-col relative z-10">
            {children}
        </div>
        <footer className={`p-4 text-xs flex justify-between items-center bg-gray-50 relative z-10 border-t`} style={{color: themeColor, borderColor: themeColor}}>
            <span className="font-bold">Trillion Business / Your Growth Plan</span>
            <span>Page {pageNumber} of {totalPages}</span>
        </footer>
    </div>
);


// --- Individual Slide Components ---

const TitleSlide: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center flex flex-col justify-center items-center h-full">
        <p className="font-bold uppercase tracking-widest text-[#147273]">Your Simple Plan to Win</p>
        <h1 className="text-8xl font-black tracking-tighter mt-4 text-gray-900" style={{ fontFamily: "'Patrick Hand', cursive" }}>{title}</h1>
        <p className="text-2xl text-gray-600 mt-6 max-w-2xl">{subtitle}</p>
        <div className="mt-auto border-t-8 border-[#147273] w-1/4"></div>
    </div>
);

const ProblemSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <>
        <h2 className="text-6xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Real Problem... 😫</h2>
        <p className="text-xl text-gray-600 mt-4">Every business gets stuck. For you, it's this:</p>
        <div className="mt-8 space-y-6 flex-grow flex flex-col justify-center">
            {diagnosis.constraints.map((constraint, i) => (
                <div key={i} className="p-8 bg-red-50 border-l-8 border-red-500 shadow-xl">
                    <p className="text-4xl text-gray-800 leading-relaxed font-semibold">"{constraint}"</p>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-8">
            <p className="text-gray-600 text-center text-xl">The good news? We have a simple plan to fix it, forever.</p>
        </div>
    </>
);

const VisionSlide: React.FC<{ diagnosis: GeneratedPlaybook['diagnosis'] }> = ({ diagnosis }) => (
    <>
        <h2 className="text-6xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>...And The Awesome Future ✨</h2>
        <p className="text-xl text-gray-600 mt-4">Imagine if, instead of that problem, you could just...</p>
        <div className="mt-8 p-8 bg-green-50 border-l-8 border-green-500 shadow-xl flex-grow flex flex-col justify-center">
            <p className="text-4xl text-gray-800 leading-relaxed font-semibold">...easily <strong className="text-green-700">{diagnosis.actions[0]}</strong>?</p>
        </div>
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-700 text-center">This is the goal. The next part is the treasure map to get you there.</h3>
        </div>
    </>
);

const OfferPromiseSlide: React.FC<{ offer: GeneratedOffer; type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const themeColor = type === 'Grand Slam' ? '#147273' : '#3B82F6';
    const offerTypeName = type === 'Grand Slam' ? "Your 'Grand Slam' Offer" : "Your 'Hello' Offer";
    return (
        <div className={`text-center flex flex-col justify-center items-center h-full bg-gray-50 rounded-lg p-8 border-8`} style={{borderColor: themeColor}}>
            <p className={`font-bold uppercase tracking-widest`} style={{color: themeColor}}>{offerTypeName}</p>
            <h2 className={`text-7xl font-black tracking-tighter mt-4 text-gray-900`} style={{ fontFamily: "'Patrick Hand', cursive" }}>{offer.name}</h2>
            <div className={`mt-12 border-t-4 w-1/4`} style={{borderColor: themeColor}}></div>
            <p className="text-3xl text-gray-700 mt-12 max-w-2xl italic leading-relaxed">"{offer.promise}"</p>
        </div>
    );
};

const ValueStackSlide: React.FC<{ offer: GeneratedOffer; }> = ({ offer }) => {
    return (
         <>
            <h2 className={`text-6xl font-bold text-gray-800 pb-2`} style={{ fontFamily: "'Patrick Hand', cursive" }}>Here's All The Goodies 🎁</h2>
            <p className="text-xl text-gray-600 mt-4">To make this a total no-brainer, we solved every problem for you:</p>
            <div className="mt-6 space-y-3">
                {offer.stack.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg border-l-8 border-green-400 shadow-sm flex items-center gap-4">
                      <span className="text-4xl text-green-500">✅</span>
                      <p className="font-bold text-gray-800 text-2xl flex-grow">{item.solution}</p>
                      <p className="font-black text-green-600 text-2xl whitespace-nowrap ml-auto">{item.value}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

const PriceRevealSlide: React.FC<{ offer: GeneratedOffer; type: 'Grand Slam' | 'Tripwire' }> = ({ offer, type }) => {
    const themeColor = type === 'Grand Slam' ? '#147273' : '#3B82F6';
     return (
        <div className="flex flex-col h-full text-center">
            <h2 className={`text-6xl font-bold text-gray-800`} style={{ fontFamily: "'Patrick Hand', cursive" }}>The Value vs. Your Price</h2>
            <div className="flex-grow flex flex-col items-center justify-center mt-8">
                <p className="text-3xl font-semibold text-gray-600">Total Value:</p>
                <p className="text-8xl font-bold text-red-500 line-through my-4">{offer.totalValue}</p>

                <p className="text-3xl font-semibold text-gray-800 mt-12">Your Price Today:</p>
                <div className={`my-4 p-8 rounded-lg shadow-2xl`} style={{backgroundColor: themeColor}}>
                    <p className={`text-8xl font-black text-white`}>{offer.price}</p>
                </div>
            </div>
        </div>
    );
};

const GuaranteeSlide: React.FC<{ offer: GeneratedOffer; }> = ({ offer }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center text-center">
            <h2 className={`text-6xl font-bold text-gray-800`} style={{ fontFamily: "'Patrick Hand', cursive" }}>And It's Completely Risk-Free 🛡️</h2>
            <div className={`mt-8 p-12 bg-yellow-50 rounded-lg border-4 border-dashed w-full max-w-3xl shadow-lg border-yellow-400`}>
                <p className="text-4xl text-gray-700 italic leading-relaxed">"{offer.guarantee}"</p>
            </div>
            <p className="mt-8 text-gray-600 max-w-2xl text-2xl">You literally can't lose. The only way you lose is by doing nothing.</p>
        </div>
    );
};

const OfferPresentationPdf: React.FC<{ playbook: GeneratedPlaybook }> = ({ playbook }) => {
    const slides: React.ReactNode[] = [];

    slides.push(<TitleSlide title="Your Growth Blueprint" subtitle={playbook.diagnosis.yourRole} />);
    slides.push(<ProblemSlide diagnosis={playbook.diagnosis} />);
    slides.push(<VisionSlide diagnosis={playbook.diagnosis} />);

    // Offer 1 Slides
    slides.push(<OfferPromiseSlide offer={playbook.offer1} type="Grand Slam" />);
    slides.push(<ValueStackSlide offer={playbook.offer1} />);
    slides.push(<PriceRevealSlide offer={playbook.offer1} type="Grand Slam" />);
    slides.push(<GuaranteeSlide offer={playbook.offer1} />);
    
    // Offer 2 Slides
    slides.push(<OfferPromiseSlide offer={playbook.offer2} type="Grand Slam" />);
    slides.push(<ValueStackSlide offer={playbook.offer2} />);
    slides.push(<PriceRevealSlide offer={playbook.offer2} type="Grand Slam" />);
    slides.push(<GuaranteeSlide offer={playbook.offer2} />);
    
    // Downsell/Tripwire Offer Slides
    slides.push(<OfferPromiseSlide offer={playbook.downsell.offer} type="Tripwire" />);
    slides.push(<ValueStackSlide offer={playbook.downsell.offer} />);
    slides.push(<PriceRevealSlide offer={playbook.downsell.offer} type="Tripwire" />);
    
    const totalPages = slides.length;

  return (
    <div>
        {slides.map((slide, index) => (
            <PdfSlide key={index} pageNumber={index + 1} totalPages={totalPages}>
                {slide}
            </PdfSlide>
        ))}
    </div>
  );
};

export default OfferPresentationPdf;
