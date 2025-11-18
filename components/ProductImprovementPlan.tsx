
import React from 'react';
import { GeneratedProductImprovementPlan } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const LeverCard: React.FC<{ lever: GeneratedProductImprovementPlan['improvementLevers'][0] }> = ({ lever }) => {
    const styles = {
        'Dream Outcome': { icon: '🏆', color: 'green' },
        'Likelihood of Achievement': { icon: '✅', color: 'blue' },
        'Time Delay': { icon: '⏰', color: 'yellow' },
        'Effort & Sacrifice': { icon: '🥵', color: 'red' },
    };
    const style = styles[lever.leverName];
    const borderClass = `border-${style.color}-500`;
    const bgClass = `bg-${style.color}-50`;
    const textClass = `text-${style.color}-700`;

    return (
        <Card className={`!p-0 overflow-hidden shadow-lg border-t-4 ${borderClass}`}>
            <div className="p-6">
                <h4 className={`text-xl font-bold ${textClass} flex items-center`}>
                    <span className="text-3xl mr-3">{style.icon}</span>
                    {lever.leverName}
                </h4>
                <p className="italic mt-2 pl-10" style={{color: 'var(--text-light)'}}>{lever.strategy}</p>
            </div>
            <div className="px-6 pb-6 pl-16">
                <p className="font-semibold" style={{color: 'var(--text-light)'}}>Actionable Tactics:</p>
                <ul className="list-disc list-inside space-y-2 mt-2 font-mono text-sm" style={{color: 'var(--text-dark)'}}>
                    {lever.tactics.map((tactic, i) => <li key={i}>{tactic}</li>)}
                </ul>
            </div>
        </Card>
    );
};

const ProductImprovementPlan: React.FC<{ plan: GeneratedProductImprovementPlan }> = ({ plan }) => {
    if (!plan) return null;

    return (
        <Card>
            <SectionHeader>{plan.title}</SectionHeader>
            <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
                <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
                <p className="italic" style={{color: 'var(--text-light)'}}>"{plan.corePrinciple}"</p>
            </div>

            <div className="mb-8 p-4 rounded-lg border-l-4 border-red-500" style={{backgroundColor: 'var(--bg-muted)'}}>
                <h4 className="font-bold text-lg text-red-700">The Honest Truth:</h4>
                <p style={{color: 'var(--text-light)'}}>{plan.problemAnalysis}</p>
            </div>
            
            <h4 className="text-xl font-bold mb-4" style={{color: 'var(--text-dark)'}}>The 4 Value Levers</h4>
            <div className="grid md:grid-cols-2 gap-6">
                 {plan.improvementLevers.map((lever) => (
                    <LeverCard key={lever.leverName} lever={lever} />
                ))}
            </div>

            <div className="mt-8">
                <h4 className="text-xl font-bold mb-4" style={{color: 'var(--text-dark)'}}>Your Offer: Before vs. After</h4>
                 <p className="text-sm mb-4" style={{color: 'var(--text-light)'}}>{plan.valueStackTransformation.summary}</p>
                <div className="overflow-x-auto rounded-lg border" style={{borderColor: 'var(--border-color)'}}>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase" style={{backgroundColor: 'var(--bg-muted)'}}>
                            <tr>
                                <th className="px-4 py-3">Component</th>
                                <th className="px-4 py-3">Before (Vitamin)</th>
                                <th className="px-4 py-3">After (Painkiller)</th>
                                <th className="px-4 py-3 text-right">Value Boost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plan.valueStackTransformation.comparisons.map((item, i) => (
                                 <tr key={i} className="border-t" style={{borderColor: 'var(--border-color)'}}>
                                    <td className="px-4 py-3 font-semibold" style={{color: 'var(--text-dark)'}}>{item.itemName}</td>
                                    <td className="px-4 py-3 text-red-600 line-through">{item.before}</td>
                                    <td className="px-4 py-3 font-bold text-green-700">{item.after}</td>
                                    <td className="px-4 py-3 text-right font-bold text-green-600">{item.valueIncrease}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="font-bold border-t-2" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-muted)'}}>
                            <tr>
                                <td colSpan={3} className="px-4 py-3 text-right text-lg">New Total Value:</td>
                                <td className="px-4 py-3 text-right text-2xl" style={{color: 'var(--primary-color)'}}>{plan.valueStackTransformation.newValue}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-8 text-center p-6 rounded-lg" style={{backgroundColor: 'var(--bg-muted)'}}>
                <h4 className="text-xl font-bold" style={{color: 'var(--text-dark)'}}>Your New Mission</h4>
                <p className="mt-2" style={{color: 'var(--text-light)'}}>{plan.summary}</p>
            </div>
        </Card>
    );
};

export default ProductImprovementPlan;
