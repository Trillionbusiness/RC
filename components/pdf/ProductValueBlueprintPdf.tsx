
import React from 'react';
import { GeneratedProductImprovementPlan } from '../../types';

// --- Cashvertising Design System Components ---

const CashPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-12 bg-white font-serif text-[#222222] relative overflow-hidden" style={{ width: '800px', minHeight: '1131px', border: '1px solid #e5e5e5' }}>
        <div className="relative z-10 h-full flex flex-col">
            {children}
        </div>
        {/* Subtle page texture or border could go here */}
        <div className="absolute bottom-4 right-6 text-[10px] font-sans text-gray-400 tracking-widest uppercase">CONFIDENTIAL STRATEGY DOCUMENT</div>
    </div>
);

const CashHeadline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h1 className="text-6xl font-bold text-black uppercase leading-[0.9] tracking-tight mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
        {children}
    </h1>
);

const CashSubhead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold text-[#222222] mb-4 border-b-4 border-black pb-2 inline-block" style={{ fontFamily: "'Oswald', sans-serif" }}>
        {children}
    </h2>
);

const CashBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={`text-[13px] leading-relaxed text-[#333] mb-3 ${className}`} style={{ fontFamily: "'Merriweather', serif" }}>
        {children}
    </p>
);

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span style={{ background: "linear-gradient(120deg, #ffff00 0%, #ffff00 100%)", backgroundRepeat: "no-repeat", backgroundSize: "100% 45%", backgroundPosition: "0 90%", padding: "0 2px" }}>
        {children}
    </span>
);

const HandwrittenNote: React.FC<{ children: React.ReactNode; className?: string; color?: string }> = ({ children, className, color = '#1e3a8a' }) => (
    <div className={`text-xl transform -rotate-2 ${className}`} style={{ fontFamily: "'Caveat', cursive", color: color }}>
        {children}
    </div>
);

const FearBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
        <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🛑</span>
            <h3 className="font-bold text-red-700 uppercase text-sm tracking-wider">{title}</h3>
        </div>
        <div className="text-xs text-red-900 font-serif leading-relaxed">
            {children}
        </div>
    </div>
);

const GreedBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-2 border-dashed border-green-600 bg-green-50 p-4 mb-6 relative">
        <div className="absolute -top-3 left-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            {title}
        </div>
        <div className="text-sm text-green-900 font-bold font-serif mt-2">
            {children}
        </div>
    </div>
);

const ProTipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-blue-50 border-t-4 border-blue-600 p-4 mb-6 shadow-sm">
        <h4 className="text-blue-800 font-bold uppercase text-xs mb-1 flex items-center">
            <span className="text-lg mr-2">💡</span> Pro Tip
        </h4>
        <p className="text-xs text-blue-900 font-serif italic">
            {children}
        </p>
    </div>
);

const ValueEquationDiagram: React.FC = () => (
    <div className="my-8 relative">
        {/* Main Equation Box */}
        <div className="border-4 border-black p-6 relative bg-white">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4">
                <span className="font-bold font-sans text-lg uppercase bg-yellow-300 px-2">The Value Equation</span>
            </div>
            
            {/* Top: Dream x Likelihood */}
            <div className="flex justify-between items-center mb-2 text-center">
                <div className="w-5/12">
                    <p className="font-bold text-sm uppercase text-green-700">Dream Outcome</p>
                    <p className="text-[40px] leading-none text-green-600">⬆️</p>
                </div>
                <div className="text-2xl font-black text-gray-400">×</div>
                <div className="w-5/12">
                    <p className="font-bold text-sm uppercase text-green-700">Perceived Likelihood</p>
                    <p className="text-[40px] leading-none text-green-600">⬆️</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-1 w-full bg-black my-2"></div>

            {/* Bottom: Time x Effort */}
            <div className="flex justify-between items-center mt-2 text-center">
                <div className="w-5/12">
                    <p className="text-[40px] leading-none text-red-600">⬇️</p>
                    <p className="font-bold text-sm uppercase text-red-700">Time Delay</p>
                </div>
                <div className="text-2xl font-black text-gray-400">×</div>
                <div className="w-5/12">
                     <p className="text-[40px] leading-none text-red-600">⬇️</p>
                    <p className="font-bold text-sm uppercase text-red-700">Effort & Sacrifice</p>
                </div>
            </div>
        </div>
        
        {/* Annotations */}
        <HandwrittenNote className="absolute top-10 -left-8 text-sm w-24 text-right text-blue-700">Max This Out! 🚀</HandwrittenNote>
        <HandwrittenNote className="absolute bottom-10 -right-8 text-sm w-24 text-left text-red-600">Drive This to Zero! 📉</HandwrittenNote>
    </div>
);

const ChecklistItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start mb-3">
        <div className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">✓</div>
        <CashBody className="!mb-0 font-bold">{children}</CashBody>
    </div>
);

const ProductValueBlueprintPdf: React.FC<{ plan: GeneratedProductImprovementPlan }> = ({ plan }) => {
    if (!plan) return null;

    return (
        <>
            {/* PAGE 1: Strategy Overview */}
            <CashPage>
                <div className="flex justify-between items-start border-b-2 border-gray-200 pb-6 mb-8">
                    <div className="w-3/4 pr-8">
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Strategic Asset #001</p>
                        <CashHeadline>{plan.title}</CashHeadline>
                        <CashBody className="text-lg text-gray-600 italic">"{plan.corePrinciple}"</CashBody>
                    </div>
                    <div className="w-1/4 border-l border-gray-200 pl-6 pt-2">
                         <div className="text-center">
                            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-2 font-sans">
                                $
                            </div>
                            <HandwrittenNote className="text-sm text-gray-500">Profit Multiplier</HandwrittenNote>
                         </div>
                    </div>
                </div>

                <div className="flex flex-row h-full gap-8">
                    {/* LEFT COLUMN (Main Content) */}
                    <div className="w-2/3 pr-4 border-r border-gray-200 border-dashed">
                        
                        <FearBox title="Why Your Current Offer Might Fail">
                            {plan.problemAnalysis}
                        </FearBox>

                        <CashSubhead>The Value Equation</CashSubhead>
                        <CashBody>
                            To charge premium prices, we must mathematically <Highlight>increase the value</Highlight> of your product. We do this by manipulating four specific variables.
                        </CashBody>

                        <ValueEquationDiagram />

                        <CashSubhead>Your 4 Levers of Growth</CashSubhead>
                        <div className="space-y-6 mt-4">
                            {(plan.improvementLevers || []).slice(0,2).map((lever, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-lg font-sans uppercase text-black mb-1">{i+1}. {lever.leverName}</h4>
                                    <CashBody className="italic text-gray-600 mb-2">{lever.strategy}</CashBody>
                                    <ul className="list-disc ml-4 space-y-1">
                                        {(lever.tactics || []).map((t, idx) => (
                                            <li key={idx} className="text-[12px] font-serif text-gray-800">{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="w-1/3">
                        <GreedBox title="THE PAYOFF">
                            <p className="text-2xl text-center mb-1 text-black font-sans">$$$</p>
                            By fixing these variables, you move from a commodity to a monopoly.
                        </GreedBox>

                        <div className="mb-8">
                            <HandwrittenNote className="text-blue-800 text-center mb-4">
                                "People buy with emotion, then justify with logic. Give them both."
                            </HandwrittenNote>
                            <div className="w-full h-px bg-gray-300 my-4"></div>
                        </div>

                        <ProTipBox>
                            <strong className="block mb-1">Don't sell the plane flight.</strong>
                            Sell the vacation. Most businesses talk about the 'Effort' (the flight). You need to talk about the 'Dream Outcome' (the beach).
                        </ProTipBox>

                        <div className="mt-8 p-4 bg-gray-100 rounded border border-gray-300 text-center">
                             <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">Projected Value Increase</p>
                             <p className="text-4xl font-black text-green-600 font-sans">{plan.valueStackTransformation.newValue}</p>
                             <HandwrittenNote className="text-xs mt-1 text-gray-400">Conservative Estimate</HandwrittenNote>
                        </div>
                    </div>
                </div>
            </CashPage>

            {/* PAGE 2: Execution Plan */}
            <CashPage>
                <div className="flex flex-row h-full gap-8 mt-4">
                     <div className="w-2/3 pr-4">
                        <CashSubhead>Levers Continued...</CashSubhead>
                        <div className="space-y-8 mb-8">
                            {(plan.improvementLevers || []).slice(2,4).map((lever, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-lg font-sans uppercase text-black mb-1">{i+3}. {lever.leverName}</h4>
                                    <CashBody className="italic text-gray-600 mb-2">{lever.strategy}</CashBody>
                                    <ul className="list-disc ml-4 space-y-1">
                                        {(lever.tactics || []).map((t, idx) => (
                                            <li key={idx} className="text-[12px] font-serif text-gray-800">{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t-4 border-black pt-6 mt-8">
                            <CashSubhead>Transformation: Before vs. After</CashSubhead>
                            <CashBody>{plan.valueStackTransformation.summary}</CashBody>
                            
                            <div className="mt-6">
                                {(plan.valueStackTransformation.comparisons || []).map((item, i) => (
                                    <div key={i} className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
                                        <p className="font-bold font-sans text-sm uppercase mb-2">{item.itemName}</p>
                                        <div className="flex justify-between items-center text-xs font-serif">
                                            <span className="text-red-500 line-through w-5/12">{item.before}</span>
                                            <span className="text-gray-400">➜</span>
                                            <span className="text-green-700 font-bold w-5/12 text-right">{item.after}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>

                     <div className="w-1/3 border-l border-gray-200 border-dashed pl-6">
                        <CashHeadline>Your New Reality</CashHeadline>
                        <CashBody>
                            Once you implement these changes, you stop competing on price. You become "Category of One."
                        </CashBody>
                        
                        <div className="my-8 space-y-2">
                            <ChecklistItem>Higher Prices</ChecklistItem>
                            <ChecklistItem>Better Clients</ChecklistItem>
                            <ChecklistItem>Faster Sales</ChecklistItem>
                            <ChecklistItem>Less Delivery Drag</ChecklistItem>
                        </div>

                        <div className="bg-yellow-300 p-6 text-center transform rotate-1 shadow-lg mt-12 border-2 border-black">
                            <p className="text-sm font-bold uppercase mb-2 font-sans">The Mission</p>
                            <p className="text-lg font-serif leading-tight">"{plan.summary}"</p>
                             <div className="mt-4 pt-4 border-t border-black border-opacity-20">
                                <p className="text-[10px] uppercase tracking-widest">Authorized By</p>
                                <HandwrittenNote className="text-xl mt-1">Trillion AI</HandwrittenNote>
                            </div>
                        </div>
                     </div>
                </div>
            </CashPage>
        </>
    );
};

export default ProductValueBlueprintPdf;
