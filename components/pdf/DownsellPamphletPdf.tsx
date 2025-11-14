
import React from 'react';
import { GeneratedDownsell } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const DownsellPamphletPdf: React.FC<{ downsell: GeneratedDownsell }> = ({ downsell }) => {
    if (!downsell?.offer) {
        return <div className="p-8 bg-white font-sans">Could not load offer information.</div>;
    }

    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{ pageBreakAfter: 'always', border: '8px solid #3A3A3A' }}>
            <div className="grid grid-cols-3 gap-10">
                {/* Left Column */}
                <div className="col-span-1 pr-6 border-r-4 border-dotted border-gray-300">
                    <p className="text-blue-500 font-bold uppercase tracking-widest">A Special Invitation</p>
                    <Title>{downsell.offer.name}</Title>
                    <div className="mt-8 text-right">
                        <p className="text-md text-gray-600">This is worth:</p>
                        <p className="text-3xl font-bold text-red-500 line-through">{downsell.offer.totalValue}</p>
                        <p className="text-lg text-gray-800 mt-4">You Pay Only:</p>
                        <p className="text-7xl font-black text-blue-600" style={{ fontFamily: "'Patrick Hand', cursive" }}>{downsell.offer.price}</p>
                    </div>

                    <div className="mt-10 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <h4 className="text-2xl font-bold text-blue-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>Our Pinky Promise</h4>
                        <p className="italic text-gray-700 mt-2 text-sm">"{downsell.offer.guarantee}"</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-2">
                    <Subtitle>"{downsell.offer.promise}"</Subtitle>

                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold text-gray-800 text-2xl" style={{ fontFamily: "'Patrick Hand', cursive" }}>Why We Made This For You:</h3>
                        <P className="text-sm">{downsell.rationale}</P>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-800 mt-8 mb-4" style={{ fontFamily: "'Patrick Hand', cursive" }}>Here's What You Get:</h3>
                    <div className="space-y-3">
                        {downsell.offer.stack.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-3xl text-green-500 mr-3">✅</span>
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">{item.solution}</p>
                                    <p className="text-gray-600 text-xs">
                                        <strong className="font-semibold">Solves this annoying problem:</strong> {item.problem}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center p-6 bg-green-500 text-white rounded-lg shadow-lg">
                         <h3 className="text-3xl font-black" style={{ fontFamily: "'Patrick Hand', cursive" }}>Ready to Get Your First Win?</h3>
                         <p className="mt-2">This is the easiest 'yes' you'll make all day!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownsellPamphletPdf;
