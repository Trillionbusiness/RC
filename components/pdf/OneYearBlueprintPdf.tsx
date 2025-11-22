
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Cashvertising Design System Components ---

const CashPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-12 bg-white font-serif text-[#222222] relative overflow-hidden break-after-page" style={{ width: '800px', minHeight: '1131px', border: '1px solid #e5e5e5' }}>
        <div className="relative z-10 h-full flex flex-col">
            {children}
        </div>
         <div className="absolute bottom-4 right-6 text-[10px] font-sans text-gray-400 tracking-widest uppercase">CONFIDENTIAL BLUEPRINT</div>
    </div>
);

const CashHeadline: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h1 className={`text-6xl font-bold text-black uppercase leading-[0.9] tracking-tight mb-2 ${className}`} style={{ fontFamily: "'Oswald', sans-serif" }}>
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

const StatBox: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
    <div className={`border-2 border-black p-3 text-center ${className}`}>
        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{label}</p>
        <p className="text-2xl font-black text-black font-sans leading-none mt-1">{value}</p>
    </div>
);

const FocusSection: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="mb-6">
        <h3 className="flex items-center font-bold font-sans uppercase text-lg mb-2">
            <span className="text-2xl mr-2">{icon}</span> {title}
        </h3>
        <div className="pl-8 border-l-2 border-gray-200 ml-3">
            {children}
        </div>
    </div>
);

const GoalItem: React.FC<{ type: string; children: React.ReactNode }> = ({ type, children }) => (
    <div className="mb-3 bg-gray-50 p-2 rounded border-l-4 border-black">
        <span className="text-[10px] font-bold uppercase bg-black text-white px-1 py-0.5 rounded-sm mr-2">{type}</span>
        <span className="text-xs font-serif">{children}</span>
    </div>
);


// Helper to determine goals based on revenue
const getFinancialGoals = (monthlyRevenue: string) => {
    const numericString = monthlyRevenue.replace(/[^0-9.]/g, '');
    const revenue = parseFloat(numericString) || 0;
    
    const format = (num: number) => {
        return `$${Math.round(num).toLocaleString()}/mo`;
    }

    if (revenue < 5000) {
        return {
            q1: "$10,000/mo",
            q2_3: "$25,000/mo",
            q4: "$40,000/mo",
            scalingTrigger: "$20,000/mo"
        };
    } else if (revenue < 50000) {
         return {
            q1: format(revenue * 1.5),
            q2_3: format(revenue * 2.5),
            q4: format(revenue * 3.5),
            scalingTrigger: format(revenue * 2)
        };
    } else {
         return {
            q1: format(revenue * 1.2),
            q2_3: format(revenue * 1.5),
            q4: format(revenue * 2),
            scalingTrigger: format(revenue * 1.4)
        };
    }
};

const OneYearBlueprintPdf: React.FC<{ businessData: BusinessData, playbook: GeneratedPlaybook }> = ({ businessData, playbook }) => {
    const goals = getFinancialGoals(businessData.monthlyRevenue);

    return (
      <>
        {/* COVER PAGE */}
        <CashPage>
            <div className="flex flex-col h-full justify-center border-8 border-double border-black p-8 text-center">
                 <p className="font-serif italic text-gray-500 mb-4">The Official Strategy For:</p>
                 <h2 className="text-3xl font-bold font-sans uppercase mb-12">{businessData.businessType}</h2>
                 
                 <CashHeadline>Zero To</CashHeadline>
                 <CashHeadline className="text-[#147273]">One Million</CashHeadline>
                 
                 <div className="w-24 h-1 bg-yellow-400 mx-auto my-8"></div>
                 
                 <p className="text-xl font-serif max-w-lg mx-auto text-gray-700">
                     A 12-Month Direct Response Execution Plan designed to maximize cash flow and enterprise value.
                 </p>
                 
                 <div className="mt-auto">
                     <div className="inline-block border-2 border-black p-4 transform -rotate-3">
                         <p className="text-xs font-bold uppercase tracking-widest">Confidential</p>
                         <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                     </div>
                 </div>
            </div>
        </CashPage>

        {/* Q1 */}
        <CashPage>
            <div className="flex flex-row h-full gap-8">
                <div className="w-2/3 pr-4 border-r border-gray-200 border-dashed">
                     <div className="flex items-baseline mb-6">
                        <h1 className="text-8xl font-bold font-sans text-gray-200 mr-4">Q1</h1>
                        <div>
                            <CashSubhead>The Foundation</CashSubhead>
                            <p className="text-sm font-serif italic text-gray-500">Months 1-3</p>
                        </div>
                     </div>
                     
                     <CashBody className="text-lg">
                         <Highlight>You cannot fire a cannon from a canoe.</Highlight> This quarter is about building the concrete slab your business will stand on.
                     </CashBody>

                     <FocusSection icon="👤" title="YOU Are The Asset">
                        <CashBody>Your business grows as fast as you do. We need to upgrade your operating system.</CashBody>
                        <GoalItem type="Learning">Read '$100M Offers' by Alex Hormozi. Memorize the Value Equation.</GoalItem>
                        <GoalItem type="Personal">Execute a "Season of No." Cut 3 time-wasting habits.</GoalItem>
                     </FocusSection>

                     <FocusSection icon="⚔️" title="The Weapon (Offer)">
                        <CashBody>Refine your offer until strangers feel stupid saying no.</CashBody>
                        <div className="p-4 bg-gray-100 border-l-4 border-[#147273] my-2">
                            <p className="font-serif italic text-sm">"{playbook.offer1.name}"</p>
                        </div>
                        <GoalItem type="System">Conduct 20 sales calls to test and refine this offer.</GoalItem>
                     </FocusSection>

                </div>
                <div className="w-1/3 pl-2">
                    <StatBox label="Revenue Target" value={goals.q1} className="bg-green-50 border-green-600 mb-6 text-green-900" />
                    <StatBox label="Activity Goal" value="100 Outreach/mo" className="mb-6" />
                    
                    <HandwrittenNote className="mb-6 text-center text-red-600 transform rotate-2">
                        Volume Negates Luck. <br/> Do the work.
                    </HandwrittenNote>

                    <div className="bg-yellow-100 p-4 border border-yellow-400 shadow-md">
                        <p className="font-bold text-xs uppercase mb-2">⚠️ Warning</p>
                        <p className="font-serif text-xs">
                            Do not try to automate yet. You must do things that don't scale to learn what works.
                        </p>
                    </div>
                </div>
            </div>
        </CashPage>

        {/* Q2-Q3 */}
        <CashPage>
             <div className="flex flex-row h-full gap-8">
                <div className="w-2/3 pr-4 border-r border-gray-200 border-dashed">
                     <div className="flex items-baseline mb-6">
                        <h1 className="text-8xl font-bold font-sans text-gray-200 mr-4">Q2-3</h1>
                        <div>
                            <CashSubhead>The Machine</CashSubhead>
                            <p className="text-sm font-serif italic text-gray-500">Months 4-9</p>
                        </div>
                     </div>

                     <CashBody className="text-lg">
                         Now we turn on the faucet. We are building a predictable system for getting customers.
                     </CashBody>

                     <FocusSection icon="📢" title="Lead Generation">
                        <CashBody>Focus on ONE channel. Master it. Do not get distracted.</CashBody>
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-600 my-2">
                            <p className="font-bold text-xs uppercase text-blue-800">Primary Weapon</p>
                            <p className="font-serif text-sm text-blue-900">{playbook.marketingModel.steps[0].method}</p>
                        </div>
                        <GoalItem type="Marketing">Generate 50 qualified leads/mo consistently.</GoalItem>
                     </FocusSection>

                     <FocusSection icon="📈" title="Maximize LTV">
                        <CashBody>Get paid to acquire customers. Increase cash flow immediately.</CashBody>
                        <GoalItem type="Activity">Add an upsell to every single closed deal.</GoalItem>
                     </FocusSection>

                </div>
                <div className="w-1/3 pl-2">
                     <StatBox label="Revenue Target" value={goals.q2_3} className="bg-green-50 border-green-600 mb-6 text-green-900" />
                     
                     <div className="border-2 border-dashed border-red-500 p-4 bg-red-50 mb-6 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-1 font-bold uppercase">
                            Scaling Trigger
                        </div>
                        <p className="text-center text-2xl font-black text-red-700 font-sans">{goals.scalingTrigger}</p>
                        <p className="text-center text-[10px] font-serif mt-1">Hit this for 2 months before hiring.</p>
                     </div>

                     <HandwrittenNote className="text-center text-blue-800">
                        "You don't need more ideas. You need more volume."
                    </HandwrittenNote>
                </div>
            </div>
        </CashPage>

        {/* Q4 */}
        <CashPage>
             <div className="flex flex-row h-full gap-8">
                <div className="w-2/3 pr-4 border-r border-gray-200 border-dashed">
                     <div className="flex items-baseline mb-6">
                        <h1 className="text-8xl font-bold font-sans text-gray-200 mr-4">Q4</h1>
                        <div>
                            <CashSubhead>The Fortress</CashSubhead>
                            <p className="text-sm font-serif italic text-gray-500">Months 10-12</p>
                        </div>
                     </div>

                     <CashBody className="text-lg">
                         Solidify your gains. Remove yourself from the low-value work. Prepare for scale.
                     </CashBody>

                     <FocusSection icon="🤝" title="Leverage (Hiring)">
                        <CashBody>Buy back your time. The goal is not to do more, but to achieve more.</CashBody>
                         <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 my-2">
                            <p className="font-bold text-xs uppercase text-yellow-800">First Hire</p>
                            <p className="font-serif text-sm text-yellow-900">{playbook.operationsPlan.proposedRoles[0]?.roleTitle || 'Virtual Assistant'}</p>
                        </div>
                        <GoalItem type="System">Delegate 10hrs/week of admin work.</GoalItem>
                     </FocusSection>

                     <FocusSection icon="🧠" title="Focus">
                        <CashBody>Don't get "shiny object syndrome." The boring work is what makes you rich.</CashBody>
                        <GoalItem type="Learning">Analyze top 10% of customers. Clone them.</GoalItem>
                     </FocusSection>

                </div>
                <div className="w-1/3 pl-2">
                     <StatBox label="Revenue Target" value={goals.q4} className="bg-green-50 border-green-600 mb-6 text-green-900" />
                     
                     <div className="mt-12 text-center">
                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-4xl mx-auto mb-4">🏁</div>
                        <CashHeadline className="text-3xl">Keep Playing</CashHeadline>
                        <CashBody className="text-center italic">
                            The goal isn't to win. The goal is to keep playing.
                        </CashBody>
                     </div>
                </div>
            </div>
        </CashPage>
      </>
    );
};

export default OneYearBlueprintPdf;
