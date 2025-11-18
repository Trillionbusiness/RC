
import React from 'react';
import { GeneratedProductImprovementPlan } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const LeverCard: React.FC<{ lever: GeneratedProductImprovementPlan['improvementLevers'][0] }> = ({ lever }) => {
    const styles = {
        'Dream Outcome': { icon: '🏆', color: 'green' },
        'Likelihood of Achievement': { icon: '✅', color: 'blue' },
        'Time Delay': { icon: '⏰', color: 'yellow' },
        'Effort & Sacrifice': { icon: '🥵', color: 'red' },
    };
    const style = styles[lever.leverName];
    const borderClass = `border-${style.color}-400`;
    const bgClass = `bg-${style.color}-50`;
    const textClass = `text-${style.color}-800`;

    return (
        <div className={`p-6 bg-white rounded-lg border-t-8 ${borderClass} shadow-xl mb-6 break-inside-avoid`}>
            <h3 className={`text-3xl font-bold ${textClass} flex items-center`} style={{ fontFamily: "'Patrick Hand', cursive" }}>
                <span className="text-4xl mr-3">{style.icon}</span>
                {lever.leverName}
            </h3>
            <P className="italic text-gray-600 mt-2">{lever.strategy}</P>
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h4 className="font-bold text-sm text-gray-600">Actionable Tactics:</h4>
                <ul className="list-disc list-inside space-y-1 mt-2 font-mono text-sm">
                    {lever.tactics.map((tactic, i) => <li key={i}>{tactic}</li>)}
                </ul>
            </div>
        </div>
    );
};

const ProductValueBlueprintPdf: React.FC<{ plan: GeneratedProductImprovementPlan }> = ({ plan }) => {
  return (
    <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
        <header className="text-center mb-12">
            <Title>{plan.title}</Title>
            <Subtitle>How to turn your good idea into an irresistible, value-packed offer.</Subtitle>
        </header>
        <main>
            <div className="text-center p-6 bg-yellow-50 rounded-lg border-4 border-yellow-200 break-inside-avoid my-6">
                <h3 className="text-3xl font-bold text-yellow-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Big Idea</h3>
                <P className="italic text-xl">"{plan.corePrinciple}"</P>
            </div>
            
            <SectionTitle>The Honest Truth 🧐</SectionTitle>
            <div className="p-6 bg-red-50 border-l-8 border-red-400 shadow-lg">
                <P className="text-lg font-semibold text-red-800">"{plan.problemAnalysis}"</P>
            </div>

            <SectionTitle>The 4 Value Levers</SectionTitle>
            <P>We're going to systematically upgrade your offer by pulling these four levers. This is how you create a Grand Slam Offer from the ground up.</P>
            
            <div className="columns-2 gap-8 mt-6">
                {plan.improvementLevers.map((lever) => (
                    <LeverCard key={lever.leverName} lever={lever} />
                ))}
            </div>

            <SectionTitle>Before vs. After ✨</SectionTitle>
            <P>{plan.valueStackTransformation.summary}</P>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">Component</th>
                            <th className="px-4 py-3">Before (The Vitamin)</th>
                            <th className="px-4 py-3">After (The Painkiller)</th>
                            <th className="px-4 py-3 text-right">Value Boost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plan.valueStackTransformation.comparisons.map((item, i) => (
                             <tr key={i} className="border-b">
                                <td className="px-4 py-3 font-bold">{item.itemName}</td>
                                <td className="px-4 py-3 text-red-600 line-through">{item.before}</td>
                                <td className="px-4 py-3 font-semibold text-green-700">{item.after}</td>
                                <td className="px-4 py-3 text-right font-bold text-green-600">{item.valueIncrease}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-100 font-bold">
                        <tr>
                            <td colSpan={3} className="px-4 py-3 text-right">New Total Value:</td>
                            <td className="px-4 py-3 text-right text-2xl text-green-700">{plan.valueStackTransformation.newValue}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="mt-12 text-center p-8 bg-gray-800 text-white rounded-lg break-before-page">
                <h3 className="text-4xl font-black text-yellow-400" style={{ fontFamily: "'Patrick Hand', cursive" }}>Your New Mission</h3>
                <P className="text-xl mt-2 text-gray-300">"{plan.summary}"</P>
            </div>
        </main>
    </div>
  );
};

export default ProductValueBlueprintPdf;
