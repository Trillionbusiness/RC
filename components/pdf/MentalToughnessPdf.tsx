
import React from 'react';
import { GeneratedMentalToughnessAnalysis } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-4xl font-bold text-gray-800 pb-2 mb-4 mt-8 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-sm text-gray-700 leading-relaxed my-2 ${className || ''}`}>{children}</p>;

const MentalToughnessPdf: React.FC<{ analysis: GeneratedMentalToughnessAnalysis }> = ({ analysis }) => {
    if (!analysis) return null;

    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A', pageBreakAfter: 'always'}}>
            <header className="text-center mb-10">
                <Title>{analysis.title}</Title>
                <Subtitle>The Founder's Mindset Audit</Subtitle>
            </header>

            <div className="p-6 bg-gray-900 text-white rounded-xl text-center mb-8">
                <p className="font-bold text-yellow-400 uppercase tracking-widest mb-2 text-sm">Core Principle</p>
                <p className="text-2xl font-serif italic">"{analysis.corePrinciple}"</p>
            </div>

            <SectionTitle>Your Personal Audit</SectionTitle>
            <P className="text-lg">{analysis.summary}</P>

            <div className="grid grid-cols-2 gap-6 mt-6">
                {analysis.components.map((trait, i) => (
                    <div key={i} className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm break-inside-avoid">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-gray-800">{trait.name}</h3>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{trait.definition}</span>
                        </div>
                        <P className="text-xs text-gray-600 italic mb-3">{trait.businessContext}</P>
                        <div className="border-t border-gray-200 pt-2">
                            <p className="text-xs font-bold text-green-700 uppercase">Fix It:</p>
                            <P className="font-semibold">{trait.actionableStep}</P>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <SectionTitle>Emergency Protocols 🚨</SectionTitle>
                <P>When bad things happen (and they will), do not think. Follow the script.</P>
                <div className="mt-4 space-y-4">
                    {analysis.scenarios.map((scenario, i) => (
                        <div key={i} className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg break-inside-avoid">
                            <div className="w-1/3 pr-4 border-r border-red-200">
                                <p className="font-bold text-red-900 text-sm">{scenario.scenario}</p>
                            </div>
                            <div className="w-2/3 pl-4">
                                <p className="italic text-gray-700 text-sm font-serif">"{scenario.mentalProtocol}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentalToughnessPdf;
