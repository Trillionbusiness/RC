
import React from 'react';
import { GeneratedMentalToughnessAnalysis, MentalToughnessComponent } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const TraitCard: React.FC<{ trait: MentalToughnessComponent }> = ({ trait }) => {
    const styles = {
        'Tolerance': { icon: '💣', color: 'bg-red-100 text-red-800' },
        'Fortitude': { icon: '📉', color: 'bg-blue-100 text-blue-800' },
        'Resilience': { icon: '🏀', color: 'bg-green-100 text-green-800' },
        'Adaptability': { icon: '🧬', color: 'bg-purple-100 text-purple-800' },
    };
    const style = styles[trait.name];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{style.icon}</span>
                <div>
                    <h4 className="font-bold text-lg text-gray-900">{trait.name}</h4>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${style.color}`}>{trait.definition}</span>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{trait.businessContext}</p>
            <div className="mt-auto p-3 bg-gray-50 rounded-lg border-l-4 border-gray-800">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Action Step</p>
                <p className="text-sm font-medium text-gray-900">{trait.actionableStep}</p>
            </div>
        </div>
    );
};

const MentalToughnessAnalysis: React.FC<{ analysis: GeneratedMentalToughnessAnalysis }> = ({ analysis }) => {
    if (!analysis) return null;

    return (
        <Card>
            <SectionHeader>{analysis.title}</SectionHeader>
            <div className="text-center mb-8 p-6 bg-gray-900 rounded-lg text-white">
                <p className="text-lg font-bold text-yellow-400 uppercase tracking-widest mb-2">Core Principle</p>
                <p className="italic text-xl font-serif">"{analysis.corePrinciple}"</p>
                <p className="mt-4 text-gray-400 text-sm">{analysis.summary}</p>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-4">The 4 Pillars of Your Armor</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {analysis.components.map((trait) => (
                    <TraitCard key={trait.name} trait={trait} />
                ))}
            </div>

            <div className="border-t-2 border-dashed border-gray-200 pt-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">🛡️</span> Likely Bad Scenarios & Protocols
                </h4>
                <div className="space-y-4">
                    {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="md:w-1/3">
                                <p className="text-xs font-bold uppercase text-red-600 mb-1">If This Happens:</p>
                                <p className="font-bold text-gray-900">{scenario.scenario}</p>
                            </div>
                            <div className="md:w-2/3 border-l-2 border-gray-300 pl-4">
                                <p className="text-xs font-bold uppercase text-green-600 mb-1">Mental Protocol:</p>
                                <p className="text-sm text-gray-700 italic">"{scenario.mentalProtocol}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default MentalToughnessAnalysis;
