import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const Step: React.FC<{ number: number, title: string, children: React.ReactNode, icon: string }> = ({ number, title, children, icon }) => (
    <div className="flex items-start mt-8">
        <div className="flex-shrink-0 flex flex-col items-center mr-6">
            <div className="bg-yellow-400 text-gray-900 font-black w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>{number}</div>
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-800 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                <span className="text-4xl mr-3">{icon}</span>{title}
            </h3>
            <div className="text-gray-600 mt-2">{children}</div>
        </div>
    </div>
);


interface ZipGuidePdfProps {
  businessData: BusinessData;
  playbook: GeneratedPlaybook;
}

const ZipGuidePdf: React.FC<ZipGuidePdfProps> = ({ businessData, playbook }) => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                 <div className="inline-block bg-yellow-400 text-gray-900 font-black text-5xl p-6 rounded-2xl transform -rotate-6 shadow-2xl mb-6" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                    START HERE!
                </div>
                <Title>Your Business Growth Kit</Title>
                <Subtitle>A quick guide to all the goodies for your <strong className="text-gray-800">{businessData.businessType}</strong>.</Subtitle>
            </header>

            <main>
                <P className="text-xl">Congrats! You now have a complete, AI-powered business plan. This isn't just a bunch of boring documents; it's a step-by-step treasure map to get more customers, make more money, and have more fun.</P>
                
                <SectionTitle>Your Simple 3-Step Mission</SectionTitle>
                
                <Step number={1} title="Unzip The Treasure Chest" icon="📦">
                    <P>First, make sure you "unzip" or "extract" this whole folder to a good spot on your computer. Don't lose the treasure!</P>
                </Step>
                
                 <Step number={2} title="Find The Secret Hub" icon="🖱️">
                    <P>Look for a file named <strong className="font-mono bg-gray-200 p-1 rounded">Trillion_Business_Interactive_Plan.html</strong>. Double-click it! This is your main dashboard where you can see everything.</P>
                </Step>

                <Step number={3} title="Explore Your New Empire" icon="🗺️">
                    <P>Use the dashboard to click through all your new documents. We've organized everything into folders for you. Go explore!</P>
                </Step>
                
                <div className="mt-16 text-center p-8 bg-gray-800 text-white rounded-lg">
                    <h3 className="text-4xl font-black text-yellow-400" style={{ fontFamily: "'Patrick Hand', cursive" }}>You have the plan. Now go do the work.</h3>
                    <P className="text-xl mt-2 text-gray-300">Good luck, you got this!</P>
                </div>
            </main>
        </div>
    );
};

export default ZipGuidePdf;
