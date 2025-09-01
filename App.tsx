
import React, { useState, useCallback, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { BusinessData, GeneratedPlaybook, OfferStackItem, GeneratedOffer, PreviewConfig, AppState, KpiEntry, WeeklyDebrief } from './types';
import { 
    generateDiagnosis, generateMoneyModelAnalysis, generateMoneyModel, 
    generateMoneyModelMechanisms, generateOperationsPlan, generateOffer1, 
    generateOffer2, generateDownsell, generateProfitPath, 
    generateMarketingModel, generateSalesFunnel, generateKpiDashboard,
    generateSalesSystem, generateWeeklyDebrief
} from './services/hormoziAiService';
import Step1Form from './components/Step1Form';
import ProgressBar from './components/common/ProgressBar';
import FullPlaybook from './FullPlaybook';
import DropdownButton from './components/common/DropdownButton';
import AllPdfs from './components/pdf/AllPdfs';
import PdfPreviewModal from './components/pdf/PdfPreviewModal';
import FullPlaybookHtml from './components/html/FullPlaybookHtml';


declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const getAppStateKey = (user: string) => `trillionBusinessAppState_${user}`;
const APP_STATE_CURRENT_USER_KEY = 'trillionBusinessCurrentUser';


const AuthScreen: React.FC<{
  onLogin: (username: string) => void;
  onSignup: (username: string) => void;
}> = ({ onLogin, onSignup }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [existingUsers, setExistingUsers] = useState<string[]>([]);

  useEffect(() => {
    try {
      const users = Object.keys(localStorage)
        .filter(key => key.startsWith('trillionBusinessAppState_'))
        .map(key => key.replace('trillionBusinessAppState_', ''));
      setExistingUsers(users);
      if (users.length === 0) {
        setMode('signup');
      }
    } catch (e) {
      console.error("Could not scan for existing users", e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedUsername = username.trim().toLowerCase();
    if (!trimmedUsername) {
      setError('Username cannot be empty.');
      return;
    }
    if (mode === 'signup') {
      if (existingUsers.includes(trimmedUsername)) {
        setError('Username already exists. Please try logging in.');
        return;
      }
      onSignup(trimmedUsername);
    } else {
      if (!existingUsers.includes(trimmedUsername)) {
        setError('Username not found. Please sign up first.');
        return;
      }
      onLogin(trimmedUsername);
    }
  };

  const handleQuickLogin = (user: string) => {
    onLogin(user);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center" style={{color: 'var(--primary-color)'}}>Trillion Business Plan</h1>
      <p className="text-center text-gray-500 mt-2">Welcome! Please sign in or create an account.</p>
      
      <div className="mt-6 flex border border-gray-300 rounded-lg p-1">
        <button 
          onClick={() => setMode('login')}
          className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${mode === 'login' ? 'text-white' : 'text-gray-600'}`}
          style={{backgroundColor: mode === 'login' ? 'var(--primary-color)' : 'transparent'}}
        >
          Login
        </button>
        <button 
          onClick={() => setMode('signup')}
          className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${mode === 'signup' ? 'text-white' : 'text-gray-600'}`}
          style={{backgroundColor: mode === 'signup' ? 'var(--primary-color)' : 'transparent'}}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 focus:ring-2"
            style={{'--tw-ring-color': 'var(--primary-color)'} as React.CSSProperties}
            autoFocus
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300"
          style={{backgroundColor: 'var(--primary-color)'}}
        >
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>
      
      {existingUsers.length > 0 && (
        <div className="mt-8">
          <p className="text-center text-sm text-gray-500">Or quickly log in as:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {existingUsers.map(user => (
              <button
                key={user}
                onClick={() => handleQuickLogin(user)}
                className="px-4 py-2 bg-gray-200 font-semibold rounded-md hover:bg-gray-300 transition-colors text-sm capitalize"
                style={{color: 'var(--primary-color)', backgroundColor: 'rgba(20, 114, 115, 0.1)'}}
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem(APP_STATE_CURRENT_USER_KEY);
    } catch (e) {
      console.error("Could not read from localStorage", e);
      return null;
    }
  });

  const [appState, setAppState] = useState<AppState>({
    playbook: null,
    businessData: null,
    kpiEntries: [],
    weeklyDebriefs: []
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Starting...');

  const [pdfProgress, setPdfProgress] = useState(0);
  const [zipProgress, setZipProgress] = useState(0);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  
  const [pdfConfig, setPdfConfig] = useState<any>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [generatingAsset, setGeneratingAsset] = useState<OfferStackItem | null>(null);
  const [generatingAssetBundleFor, setGeneratingAssetBundleFor] = useState<string | null>(null);

  const [showAllPdfsForZip, setShowAllPdfsForZip] = useState(false);
  const [previewConfig, setPreviewConfig] = useState<PreviewConfig | null>(null);
  const [isGeneratingOfflineApp, setIsGeneratingOfflineApp] = useState(false);
  const [isGeneratingDebrief, setIsGeneratingDebrief] = useState(false);
  
  const pdfSingleRenderRef = useRef<HTMLDivElement>(null);
  const pdfZipRenderRef = useRef<HTMLDivElement>(null);
  
  // Load user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      try {
        const savedState = localStorage.getItem(getAppStateKey(currentUser));
        if (savedState) {
          const parsed = JSON.parse(savedState);
          if (parsed.playbook && parsed.businessData) {
            setAppState(parsed);
          } else {
            setAppState({ playbook: null, businessData: null, kpiEntries: [], weeklyDebriefs: [] });
          }
        } else {
          setAppState({ playbook: null, businessData: null, kpiEntries: [], weeklyDebriefs: [] });
        }
      } catch (error) {
        console.error("Failed to load state from localStorage", error);
        setAppState({ playbook: null, businessData: null, kpiEntries: [], weeklyDebriefs: [] });
      }
    }
  }, [currentUser]);
  
  // Save app state when it changes
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(getAppStateKey(currentUser), JSON.stringify(appState));
      } catch (error) {
        console.error("Failed to save state to localStorage", error);
      }
    }
  }, [appState, currentUser]);

  const handleLogin = (username: string) => {
    localStorage.setItem(APP_STATE_CURRENT_USER_KEY, username);
    setCurrentUser(username);
  };

  const handleSignup = (username: string) => {
    localStorage.setItem(getAppStateKey(username), JSON.stringify({
      playbook: null,
      businessData: null,
      kpiEntries: [],
      weeklyDebriefs: []
    }));
    handleLogin(username);
  };
  
  const handleLogout = () => {
    localStorage.removeItem(APP_STATE_CURRENT_USER_KEY);
    setCurrentUser(null);
  };
  
  const handleStartNewPlan = () => {
    if (window.confirm("Are you sure you want to start a new plan for this user? All current progress will be deleted.")) {
        if(currentUser) {
            localStorage.removeItem(getAppStateKey(currentUser));
        }
        setAppState({ playbook: null, businessData: null, kpiEntries: [], weeklyDebriefs: [] });
    }
  };

  const handleFormSubmit = useCallback(async (data: BusinessData) => {
    setIsLoading(true);
    setError(null);

    setAppState({
        playbook: null,
        businessData: data,
        kpiEntries: [],
        weeklyDebriefs: [],
    });
    
    const totalSteps = 13;
    let completedSteps = 0;

    const updateProgress = (taskName: string) => {
      completedSteps++;
      setLoadingText(taskName);
      setLoadingProgress((completedSteps / totalSteps) * 100);
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      updateProgress('Diagnosing your business...');
      const diagnosis = await generateDiagnosis(data);
      await delay(1500);
      
      updateProgress('Analyzing your money model...');
      const moneyModelAnalysis = await generateMoneyModelAnalysis(data);
      await delay(1500);
      
      updateProgress('Designing your new money model...');
      const moneyModel = await generateMoneyModel(data);
      await delay(1500);
      
      updateProgress('Building your monetization toolkit...');
      const moneyModelMechanisms = await generateMoneyModelMechanisms(data);
      await delay(1500);
      
      updateProgress('Crafting your operations plan...');
      const operationsPlan = await generateOperationsPlan(data);
      await delay(1500);
      
      updateProgress('Creating your first Grand Slam Offer...');
      const offer1 = await generateOffer1(data);
      await delay(1500);
      
      updateProgress('Creating a second offer option...');
      const offer2 = await generateOffer2(data);
      await delay(1500);
      
      updateProgress('Building your Profit Path...');
      const profitPath = await generateProfitPath(data);
      await delay(1500);
      
      updateProgress('Designing your "Hello" Offer...');
      const downsell = await generateDownsell(data);
      await delay(1500);
      
      updateProgress('Mapping your marketing model...');
      const marketingModel = await generateMarketingModel(data);
      await delay(1500);
      
      updateProgress('Constructing your sales funnel...');
      const salesFunnel = await generateSalesFunnel(data);
      await delay(1500);

      updateProgress('Building your Persuasion Engine...');
      const salesSystem = await generateSalesSystem(data);
      await delay(1500);
      
      updateProgress('Finalizing your KPI dashboard...');
      const kpiDashboard = await generateKpiDashboard(data);

      const newPlaybook = {
        diagnosis,
        moneyModelAnalysis,
        moneyModel,
        moneyModelMechanisms,
        operationsPlan,
        offer1,
        offer2,
        profitPath,
        downsell,
        marketingModel,
        salesFunnel,
        kpiDashboard,
        salesSystem,
      };

      setAppState(prev => ({...prev, playbook: newPlaybook}));

    } catch (err) {
      console.error(err);
      let errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = 'The AI is a bit overwhelmed right now. Please wait a moment and try again. This can happen during peak usage.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handlePreviewPdf = (config: PreviewConfig) => {
    setPreviewConfig(config);
  };
  
  const handleDownloadOfflineApp = async () => {
    if (!appState.playbook) return;
    setIsGeneratingOfflineApp(true);
    
    try {
        const { renderToStaticMarkup } = await import('react-dom/server');
        const staticHtml = renderToStaticMarkup(<FullPlaybookHtml playbook={appState.playbook} />);
        
        const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Trillion Business Plan - Offline Interactive Plan</title><script src="https://cdn.tailwindcss.com"></script><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');:root {--bg-light: #ffffff; --bg-muted: #f8f9fa; --text-dark: #212121; --text-light: #5f5f5f;--border-color: #dee2e6; --primary-color: #147273; --accent-color: #82D5E3;}body { margin: 0; background-color: var(--bg-muted); color: var(--text-dark); font-family: 'Inter', sans-serif; }.playbook-step-content { transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out; }.strategy-content { transition: max-height 0.3s ease-in-out; }.strategy-toggle-icon { transition: transform 0.3s; }</style></head><body class="p-4 md:p-8"><div class="max-w-7xl mx-auto">${staticHtml}</div><script>document.addEventListener('DOMContentLoaded', () => {document.querySelectorAll('.playbook-step button').forEach(button => {button.addEventListener('click', () => {const content = button.nextElementSibling; const icon = button.querySelector('.playbook-step-toggle-icon'); if (content.style.maxHeight && content.style.maxHeight !== '0px') {content.style.maxHeight = '0px'; content.style.opacity = '0'; icon.style.transform = '';} else {content.style.maxHeight = content.scrollHeight + 'px'; content.style.opacity = '1'; icon.style.transform = 'rotate(180deg)';}});});document.querySelectorAll('.strategy-accordion button').forEach(button => {button.addEventListener('click', () => {const content = button.nextElementSibling; const icon = button.querySelector('.strategy-toggle-icon'); if (content.style.maxHeight && content.style.maxHeight !== '0px') {content.style.maxHeight = '0px'; icon.style.transform = '';} else {content.style.maxHeight = content.scrollHeight + 'px'; icon.style.transform = 'rotate(180deg)';}});});});<\/script></body></html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Trillion_Business_Interactive_Plan.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.error("Error generating offline app", e);
        setError("Could not generate the interactive offline plan.");
    } finally {
        setIsGeneratingOfflineApp(false);
    }
  };

  const generateSinglePdf = async (element: HTMLElement, fileName: string) => {
      const canvas = await window.html2canvas(element, { scale: 1.5, useCORS: true, allowTaint: true });
      setPdfProgress(50);
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const pdf = new window.jspdf.jsPDF({
          orientation: 'p',
          unit: 'px',
          format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
      setPdfProgress(80);
      pdf.save(fileName);
      setPdfProgress(100);
  };

  const handleDownloadPdf = (type: string, asset?: OfferStackItem, offer?: GeneratedOffer) => {
    if (isGeneratingPdf || isZipping) return;
    setIsGeneratingPdf(true);
    setPdfProgress(0);
    if (asset) setGeneratingAsset(asset);
    if (offer && type === 'asset-bundle') setGeneratingAssetBundleFor(offer.name);
    setPdfConfig({ type, singleAsset: asset?.asset, assetBundle: offer });
  };
  
  useEffect(() => {
    if (pdfConfig && pdfSingleRenderRef.current) {
        const generate = async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            const element = pdfSingleRenderRef.current?.children[0] as HTMLElement;
            if (element) {
                try {
                    let fileName = 'Trillion_Business_Plan.pdf';
                    if (pdfConfig.type === 'single-asset' && pdfConfig.singleAsset) {
                        fileName = `${pdfConfig.singleAsset.name}.pdf`;
                    } else if (pdfConfig.type === 'asset-bundle' && pdfConfig.assetBundle) {
                        fileName = `${pdfConfig.assetBundle.name}_Asset_Bundle.pdf`;
                    } else {
                        fileName = `${pdfConfig.type.replace('-', '_')}.pdf`;
                    }
                    await generateSinglePdf(element, fileName);
                } catch(e) {
                    console.error("PDF generation failed", e);
                    setError("Sorry, there was an error creating your PDF.");
                }
            }
            setIsGeneratingPdf(false);
            setPdfConfig(null);
            setGeneratingAsset(null);
            setGeneratingAssetBundleFor(null);
        };
        generate();
    }
  }, [pdfConfig]);

  const handleDownloadZip = () => {
    if (!appState.playbook || !appState.businessData || isZipping || isGeneratingPdf) return;
    setIsZipping(true);
    setZipProgress(0);
    setShowAllPdfsForZip(true);
  };

  useEffect(() => {
    if (showAllPdfsForZip && pdfZipRenderRef.current) {
        const zipAndDownload = async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); 
            const zip = new JSZip();
            const pdfElements = pdfZipRenderRef.current!.querySelectorAll('[data-pdf-output]');
            const totalFiles = pdfElements.length;

            for (let i = 0; i < totalFiles; i++) {
                const element = pdfElements[i] as HTMLElement;
                const path = element.dataset.pdfPath || `document_${i + 1}.pdf`;
                try {
                    const canvas = await window.html2canvas(element, { scale: 1.5, useCORS: true, allowTaint: true });
                    const imgData = canvas.toDataURL('image/jpeg', 0.9);
                    const pdf = new window.jspdf.jsPDF({
                        orientation: 'p',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });
                    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
                    const pdfBlob = pdf.output('blob');
                    zip.file(path, pdfBlob);
                } catch (e) {
                    console.error("Error generating PDF for path:", path, e);
                    setError(`PDF generation failed\n${e instanceof Error ? e.message : 'Unknown error'}`);
                }
                // Allocate 95% of progress to PDF generation
                setZipProgress(((i + 1) / totalFiles) * 95);
            }
            
            // Allocate final 5% to zipping process for better UX
            const content = await zip.generateAsync(
              { type: 'blob' },
              (metadata) => {
                const finalProgress = 95 + (metadata.percent * 0.05);
                setZipProgress(finalProgress);
              }
            );

            setZipProgress(100);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'Trillion_Business_Plan_Kit.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setShowAllPdfsForZip(false);
            setIsZipping(false);
        };
        zipAndDownload();
    }
  }, [showAllPdfsForZip, appState.playbook, appState.businessData]);

  const handleSaveKpiEntry = (entry: KpiEntry) => {
    setAppState(prev => {
        const existingIndex = prev.kpiEntries.findIndex(e => e.date === entry.date);
        const newEntries = [...prev.kpiEntries];
        if (existingIndex > -1) {
            newEntries[existingIndex] = entry;
        } else {
            newEntries.push(entry);
        }
        newEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return {...prev, kpiEntries: newEntries };
    });
  };

  const handleGenerateDebrief = async () => {
    if (!appState.businessData || !appState.playbook || isGeneratingDebrief) return;
    setIsGeneratingDebrief(true);
    setError(null);
    try {
        const debriefData = await generateWeeklyDebrief(appState.businessData, appState.playbook, appState.kpiEntries);
        const newDebrief: WeeklyDebrief = {
            ...debriefData,
            date: new Date().toISOString().split('T')[0],
        };
        setAppState(prev => {
            const newDebriefs = [newDebrief, ...prev.weeklyDebriefs];
            return {...prev, weeklyDebriefs: newDebriefs};
        });
    } catch (err) {
        console.error("Failed to generate weekly debrief:", err);
        setError(err instanceof Error ? err.message : "Could not generate AI debrief.");
    } finally {
        setIsGeneratingDebrief(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen py-10 px-4">
        <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />
      </div>
    );
  }

  if (!appState.playbook) {
    return (
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading ? 
            <ProgressBar progress={loadingProgress} loadingText={loadingText} /> :
            <Step1Form onSubmit={handleFormSubmit} />
          }
          {error && <div className="mt-4 text-red-500 text-center p-4 bg-red-100 rounded-lg">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
       <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl font-bold" style={{color: 'var(--primary-color)'}}>Trillion Business Plan</h1>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                  <div className="text-sm text-gray-600">
                    Welcome, <span className="font-bold capitalize">{currentUser}</span>
                  </div>
                   <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors text-xs"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleStartNewPlan}
                    className="px-4 py-2 bg-gray-200 font-semibold rounded-md hover:bg-gray-300 transition-colors text-sm"
                    style={{color: 'var(--primary-color)', backgroundColor: 'rgba(20, 114, 115, 0.1)'}}
                  >
                    Start New Plan
                  </button>
                  <DropdownButton 
                      label="Download Options" 
                      isLoading={isGeneratingPdf || isZipping}
                      progress={isZipping ? zipProgress : pdfProgress}
                      options={[
                          { label: 'Full Playbook (PDF)', onClick: () => handleDownloadPdf('full'), onPreview: () => handlePreviewPdf({type: 'full'}) },
                          { label: 'Business Scorecard (KPIs)', onClick: () => handleDownloadPdf('kpi-dashboard'), onPreview: () => handlePreviewPdf({type: 'kpi-dashboard'}) },
                          { label: 'Offer Presentation Slides', onClick: () => handleDownloadPdf('offer-presentation'), onPreview: () => handlePreviewPdf({type: 'offer-presentation'}) },
                          { label: 'Money Model Plan', onClick: () => handleDownloadPdf('cfa-model'), onPreview: () => handlePreviewPdf({type: 'cfa-model'}) },
                          { separator: true },
                          { label: 'Offline Interactive Plan (HTML)', onClick: handleDownloadOfflineApp, onPreview: null },
                          { separator: true },
                          { label: 'Buy Complete Plan Kit ($99 .zip)', onClick: handleDownloadZip, onPreview: null, special: true },
                      ]}
                  />
              </div>
          </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {error && <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">{error}</div>}
        <FullPlaybook 
            playbook={appState.playbook}
            onDownloadAsset={(asset) => handleDownloadPdf('single-asset', asset)}
            onPreviewAsset={(asset) => handlePreviewPdf({type: 'single-asset', asset: asset.asset})}
            onPreviewPdf={handlePreviewPdf}
            isAnyPdfGenerating={isGeneratingPdf || isZipping}
            generatingAsset={generatingAsset}
            onDownloadAllAssets={(offer) => handleDownloadPdf('asset-bundle', undefined, offer)}
            generatingAssetBundleFor={generatingAssetBundleFor}
            pdfProgress={pdfProgress}
            kpiEntries={appState.kpiEntries}
            weeklyDebriefs={appState.weeklyDebriefs}
            onSaveKpiEntry={handleSaveKpiEntry}
            onGenerateDebrief={handleGenerateDebrief}
            isGeneratingDebrief={isGeneratingDebrief}
            onDownloadZip={handleDownloadZip}
            isZipping={isZipping}
            zipProgress={zipProgress}
          />
      </main>
      
      {previewConfig && appState.playbook && appState.businessData && (
          <PdfPreviewModal
              playbook={appState.playbook}
              businessData={appState.businessData}
              type={previewConfig.type}
              singleAsset={previewConfig.asset}
              assetBundle={previewConfig.offer}
              onClose={() => setPreviewConfig(null)}
          />
      )}
      
      {/* Off-screen container for rendering PDFs */}
      <div style={{ position: 'absolute', top: '200vh', left: 0, zIndex: -100, opacity: 1, width: '800px' }}>
          {pdfConfig && appState.playbook && appState.businessData && (
              <div ref={pdfSingleRenderRef}>
                  <div data-pdf-output-single>
                      <AllPdfs playbook={appState.playbook} businessData={appState.businessData} type={pdfConfig.type} singleAsset={pdfConfig.singleAsset} assetBundle={pdfConfig.assetBundle} />
                  </div>
              </div>
          )}
          {showAllPdfsForZip && appState.playbook && appState.businessData && (
            <div ref={pdfZipRenderRef}>
              <AllPdfs playbook={appState.playbook} businessData={appState.businessData} type="all" />
            </div>
          )}
      </div>
    </div>
  );
};

export default App;
