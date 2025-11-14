
import React from 'react';
import { GeneratedKpiDashboard, Kpi } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed ${className || ''}`}>{children}</p>;

// --- PDF Specific Components ---

const KpiCard: React.FC<{ kpi: Kpi }> = ({ kpi }) => {
    const perspectiveStyles = {
        Financial: { color: 'green', icon: '💰' },
        Customer: { color: 'blue', icon: '❤️' },
        Operational: { color: 'purple', icon: '⚙️' },
        Marketing: { color: 'pink', icon: '📢' },
    };
    const style = perspectiveStyles[kpi.perspective] || { color: 'gray', icon: '📊' };
    const borderColor = `border-${style.color}-400`;
    const bgColor = `bg-${style.color}-50`;
    const textColor = `text-${style.color}-800`;

    return (
        <div className={`p-6 bg-white rounded-lg border-t-8 ${borderColor} shadow-xl mb-6 break-inside-avoid flex flex-col`}>
            <div className="flex justify-between items-start">
                <div>
                     <p className={`font-bold text-sm uppercase ${textColor}`}>{kpi.perspective}</p>
                     <h4 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>{kpi.name}</h4>
                </div>
                <span className="text-5xl">{style.icon}</span>
            </div>
            
            <P className="mt-2 text-sm flex-grow">{kpi.description}</P>
            
            <div className={`mt-4 p-3 ${bgColor} rounded-md`}>
                 <p className={`font-bold text-sm ${textColor}`}>Why it's a cheat code:</p>
                 <P className="italic text-sm">{kpi.importance}</P>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="font-bold text-sm text-gray-600">How to score:</p>
                <P className="font-mono text-sm">{kpi.formula}</P>
            </div>
            
        </div>
    );
};

const KpiDashboardPdf: React.FC<{ kpiDashboard: GeneratedKpiDashboard }> = ({ kpiDashboard }) => {
  return (
    <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{ pageBreakAfter: 'always', border: '8px solid #3A3A3A' }}>
        <header className="text-center mb-10">
            <Title>Your Business Scorecard!</Title>
            <Subtitle>"{kpiDashboard.corePrinciple}"</Subtitle>
        </header>

        <main className="columns-2 gap-8">
            {kpiDashboard.kpis.map((kpi, index) => (
                <KpiCard key={index} kpi={kpi} />
            ))}
        </main>
         <footer className="mt-12 pt-6 border-t-2 border-gray-200 text-sm text-gray-500 text-center">
            <p className="font-bold">Track these numbers every week. You can't win the game if you don't know the score.</p>
        </footer>
    </div>
  );
};

export default KpiDashboardPdf;
