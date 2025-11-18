
import React from 'react';
import { GeneratedMarketIndicatorAnalysis, MarketIndicator } from '../types';
import Card from './common/Card';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-black tracking-tight border-b-2 pb-2 mb-6" style={{color: 'var(--primary-color)', borderColor: 'var(--accent-color)'}}>{children}</h3>
);

const IndicatorScoreCircle: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = (s: number) => {
        if (s >= 8) return 'text-green-500';
        if (s >= 5) return 'text-yellow-500';
        return 'text-red-500';
    };
    const color = getScoreColor(score);
    const circumference = 2 * Math.PI * 20; // radius = 20
    const offset = circumference - (score / 10) * circumference;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 44 44">
                <circle className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="transparent" r="20" cx="22" cy="22" />
                <circle
                    className={`${color} transition-all duration-500 ease-in-out`}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="22"
                    cy="22"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <span className={`absolute text-xl font-black ${color}`}>{score}<span className="text-xs">/10</span></span>
        </div>
    );
};

const IndicatorCard: React.FC<{ indicator: MarketIndicator }> = ({ indicator }) => {
    const icons = {
        'Massive Pain': '🔥',
        'Purchasing Power': '💰',
        'Easy to Target': '🎯',
        'Growing Market': '📈'
    };
    const iconKey = indicator.indicatorName as keyof typeof icons;

    return (
        <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-muted)'}}>
            <div className="flex items-center gap-4">
                <IndicatorScoreCircle score={indicator.score} />
                <div>
                    <h4 className="text-lg font-bold flex items-center" style={{color: 'var(--text-dark)'}}>
                        <span className="text-2xl mr-2">{icons[iconKey]}</span>
                        {indicator.indicatorName}
                    </h4>
                </div>
            </div>
            <div className="mt-3 pl-4 border-l-2" style={{borderColor: 'var(--border-color)'}}>
                <p className="text-sm" style={{color: 'var(--text-light)'}}><strong className="font-semibold" style={{color: 'var(--text-dark)'}}>Analysis:</strong> {indicator.analysis}</p>
                <p className="text-sm mt-2" style={{color: 'var(--text-light)'}}><strong className="font-semibold text-green-600">Suggestion:</strong> {indicator.suggestion}</p>
            </div>
        </div>
    );
};

const MarketIndicatorAnalysis: React.FC<{ analysis: GeneratedMarketIndicatorAnalysis }> = ({ analysis }) => {
    if (!analysis) return null;

    return (
        <Card>
            <SectionHeader>{analysis.title}</SectionHeader>
            <div className="text-center mb-8 p-4 rounded-lg border" style={{backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)'}}>
                <p className="text-lg font-bold" style={{color: 'var(--primary-color)'}}>The Big Idea</p>
                <p className="italic" style={{color: 'var(--text-light)'}}>"{analysis.corePrinciple}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.indicators.map(indicator => (
                    <IndicatorCard key={indicator.indicatorName} indicator={indicator} />
                ))}
            </div>

            <div className="mt-8">
                <h4 className="text-xl font-bold text-center" style={{color: 'var(--text-dark)'}}>Overall Market Strength</h4>
                <div className="p-4 rounded-lg mt-2" style={{backgroundColor: 'var(--bg-muted)'}}>
                    <p className="text-center font-semibold" style={{color: 'var(--text-light)'}}>{analysis.summary}</p>
                </div>
            </div>

            {analysis.pivotSuggestion && (
                 <div className="mt-8 p-6 rounded-lg border-4 border-dashed border-yellow-400" style={{backgroundColor: 'var(--bg-light)'}}>
                    <h4 className="text-xl font-bold text-yellow-800 text-center flex items-center justify-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                        Pivot Suggestion
                    </h4>
                    <p className="text-center mt-2" style={{color: 'var(--text-light)'}}>Your current market is tough. Here's an idea for a "hungrier crowd" you could target instead:</p>
                    <p className="text-center font-bold text-lg mt-3 p-3 rounded bg-yellow-100" style={{color: 'var(--text-dark)'}}>{analysis.pivotSuggestion}</p>
                </div>
            )}
        </Card>
    );
};

export default MarketIndicatorAnalysis;
