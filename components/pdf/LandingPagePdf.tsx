
import React from 'react';
import { GeneratedPlaybook, BusinessData } from '../../types';

// Reusable PDF Components
const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <h2 className={`text-3xl font-bold text-gray-800 mt-8 mb-4 ${className}`} style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-sm text-gray-600 leading-relaxed ${className || ''}`}>{children}</p>;
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start mt-2">
        <span className="text-xl text-green-500 mr-3">✅</span>
        <P className="flex-grow">{children}</P>
    </div>
);
const DoodledPlaceholder: React.FC<{ text: string, className?: string }> = ({ text, className }) => (
    <div className={`w-full bg-gray-50 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center p-4 ${className || 'h-48'}`}>
        <p className="text-gray-500 font-semibold text-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>{text}</p>
    </div>
);
const Annotation: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`absolute p-2 bg-yellow-200 text-yellow-900 text-xs font-bold rounded-lg shadow-lg border border-yellow-400 ${className}`} style={{ fontFamily: "'Patrick Hand', cursive" }}>
        {children}
    </div>
);

interface LandingPagePdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
}

const LandingPagePdf: React.FC<LandingPagePdfProps> = ({ playbook, businessData }) => {
    const offer = playbook.offer1; // Use the first Grand Slam Offer as the basis

    return (
        <div className="p-12 bg-gray-100 font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            {/* Browser Frame */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gray-200 p-2 flex items-center border-b border-gray-300">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-grow text-center text-xs text-gray-500 bg-white rounded-full mx-4 py-1">
                        your-awesome-site.com
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-10 relative">
                    {/* Header */}
                    <header className="text-center relative">
                        <Annotation className="-top-4 left-4 -rotate-12">Target your ideal customer by name!</Annotation>
                        <p className="text-sm font-bold uppercase tracking-wider text-yellow-500">A special message for {businessData.targetClient}</p>
                        
                        <Annotation className="-top-8 right-12 rotate-6">Promise the dream outcome.</Annotation>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight mt-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>{offer.promise}</h1>
                        
                        <Annotation className="top-28 right-0 rotate-12">State the pain you're solving.</Annotation>
                        <P className="text-lg mt-3 max-w-3xl mx-auto">Stop being annoyed by <span className="font-semibold text-red-600">{playbook.diagnosis.constraints[0]}</span> and FINALLY get the result you actually want.</P>

                        <div className="mt-6 relative">
                            <Annotation className="-left-4 top-1/2 -translate-y-1/2 -rotate-12">Show, don't tell!</Annotation>
                            <DoodledPlaceholder text="< Your awesome video or picture goes here! >" className="h-64" />
                        </div>
                        <div className="mt-6 p-4 bg-green-500 text-white font-bold text-2xl rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform">
                            I WANT THIS NOW!
                        </div>
                        <p className="text-xs text-gray-500 mt-2">100% Risk-Free, No-Brainer Guarantee</p>
                    </header>

                    {/* Problem Section */}
                    <SectionTitle>Does This Sound Like You? 😫</SectionTitle>
                    <div className="grid grid-cols-3 gap-4 relative">
                        <Annotation className="-top-4 right-1/2 translate-x-1/2 rotate-3">Twist the knife. Remind them of their pain.</Annotation>
                        {playbook.diagnosis.constraints.map((c, i) => (
                             <div key={i} className="p-4 bg-red-50 border-t-4 border-red-400 rounded-b-lg">
                                <p className="font-semibold text-red-800 text-center">"{c}"</p>
                             </div>
                        ))}
                    </div>
                     <P className="mt-4 text-center">It's not your fault. You're just missing a few secret ingredients...</P>
                    
                     {/* Solution Section */}
                    <SectionTitle>Introducing: "{offer.name}" ✨</SectionTitle>
                    <div className="flex gap-8 items-center">
                        <div className="w-2/3">
                             <P>This is the simple, all-in-one system for helping {businessData.targetClient} win. We've thought of everything so you don't have to.</P>
                             <CheckListItem>{offer.stack[0]?.solution || "Get your main goal super fast."}</CheckListItem>
                             <CheckListItem>{offer.stack[1]?.solution || "Get help from people who actually care."}</CheckListItem>
                             <CheckListItem>{offer.stack[2]?.solution || "Stop guessing with our proven plans."}</CheckListItem>
                        </div>
                        <div className="w-1/3 relative">
                             <Annotation className="-top-4 -right-4 rotate-12">Show the product!</Annotation>
                            <DoodledPlaceholder text="< Picture of your awesome stuff >" className="h-48"/>
                        </div>
                    </div>

                    {/* Value Stack */}
                    <SectionTitle>Here's All The Goodies You Get:</SectionTitle>
                     <div className="space-y-2">
                        {offer.stack.map((item, index) => (
                            <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                                <p className="font-semibold text-gray-800">✅ {item.solution}</p>
                                <p className="font-bold text-green-600 text-sm whitespace-nowrap">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pricing & Guarantee */}
                     <div className="mt-10 text-center p-8 bg-gray-800 text-white rounded-lg">
                        <h3 className="text-2xl font-bold">Total Value: <span className="text-red-400 line-through">{offer.totalValue}</span></h3>
                        <h3 className="text-5xl font-black mt-4" style={{ fontFamily: "'Patrick Hand', cursive" }}>Get It All For Just: <span className="text-yellow-400">{offer.price}</span></h3>
                         <div className="mt-6 p-4 bg-green-500 text-white font-bold text-2xl rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform">
                            GIMME GIMME!
                         </div>
                    </div>
                     <div className="mt-8 p-6 border-4 border-dashed border-yellow-400 bg-yellow-50 rounded-lg text-center">
                        <h3 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>Our "You Can't Lose" Guarantee</h3>
                        <P className="italic text-lg mt-2">"{offer.guarantee}"</P>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPagePdf;
