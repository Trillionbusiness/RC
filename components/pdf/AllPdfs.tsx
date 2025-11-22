
import React from 'react';
import { GeneratedPlaybook, OfferStackItem, GeneratedOffer, BusinessData } from '../../types';
import KpiDashboardPdf from './KpiDashboardPdf';
import OfferPresentationPdf from './OfferPresentationPdf';
import DownsellPamphletPdf from './DownsellPamphletPdf';
import TripwireFollowupPdf from './TripwireFollowupPdf';
import CfaModelPdf from './CfaModelPdf';
import ValueStackAssetsPdf from './ValueStackAssetsPdf';
import AssetPdf from './AssetPdf';
import LandingPagePdf from './LandingPagePdf';
import ZipGuidePdf from './ZipGuidePdf';
import ConceptsGuidePdf from './ConceptsGuidePdf';
import MoneyModelsGuidePdf from './MoneyModelsGuidePdf';
import AdFrameworksGuidePdf from './AdFrameworksGuidePdf';
import AdKaleidoscopeGuidePdf from './AdKaleidoscopeGuidePdf';
import ProofChecklistPdf from './ProofChecklistPdf';
import SalesMindsetGuidePdf from './SalesMindsetGuidePdf';
import HuntModePlaybookPdf from './HuntModePlaybookPdf';
import KillModePlaybookPdf from './KillModePlaybookPdf';
import ObjectionHandlingCheatsheetPdf from './ObjectionHandlingCheatsheetPdf';
import CompleteScriptsPdf from './CompleteScriptsPdf';
import OneYearBlueprintPdf from './OneYearBlueprintPdf';
import ProductValueBlueprintPdf from './ProductValueBlueprintPdf';

interface AllPdfsProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
    type: string | null;
    assetBundle?: GeneratedOffer | null;
    singleAsset?: NonNullable<OfferStackItem['asset']> | null;
}

const AllPdfs: React.FC<AllPdfsProps> = ({ playbook, businessData, type, assetBundle, singleAsset }) => {
    const sanitizeName = (name: string) => name.replace(/[\\/:*?"<>|]/g, '').replace(/ /g, '_');

    if (type === 'all') {
        return (
            <div style={{ width: '800px', backgroundColor: 'white' }}>
                <div data-pdf-output data-pdf-path="00_The_One_Year_Blueprint.pdf"><OneYearBlueprintPdf businessData={businessData} playbook={playbook} /></div>
                <div data-pdf-output data-pdf-path="01_START_HERE_Guide.pdf"><ZipGuidePdf businessData={businessData} playbook={playbook} /></div>
                
                {/* 01 Core Plan */}
                <div data-pdf-output data-pdf-path="02_Core_Plan/Product_Value_Blueprint.pdf"><ProductValueBlueprintPdf plan={playbook.productImprovementPlan} /></div>
                <div data-pdf-output data-pdf-path="02_Core_Plan/Business_Concepts_Guide.pdf"><ConceptsGuidePdf playbook={playbook} businessData={businessData} /></div>
                <div data-pdf-output data-pdf-path="02_Core_Plan/Business_Scorecard_(KPIs).pdf"><KpiDashboardPdf kpiDashboard={playbook.kpiDashboard} /></div>
                <div data-pdf-output data-pdf-path="02_Core_Plan/Offer_Presentation_Slides.pdf"><OfferPresentationPdf playbook={playbook} /></div>

                {/* 03 Money Models */}
                <div data-pdf-output data-pdf-path="03_Money_Models/Your_Money_Making_Plan.pdf"><CfaModelPdf moneyModel={playbook.moneyModel} /></div>
                <div data-pdf-output data-pdf-path="03_Money_Models/The_4_Core_Money_Models.pdf"><MoneyModelsGuidePdf /></div>

                
                {/* 04 Marketing Materials */}
                <div data-pdf-output data-pdf-path="04_Marketing_Materials/High-Converting_Landing_Page.pdf"><LandingPagePdf playbook={playbook} businessData={businessData} /></div>
                <div data-pdf-output data-pdf-path="04_Marketing_Materials/Simple_Offer_Flyer.pdf"><DownsellPamphletPdf downsell={playbook.downsell} /></div>
                <div data-pdf-output data-pdf-path="04_Marketing_Materials/Customer_Follow-Up_Note.pdf"><TripwireFollowupPdf downsell={playbook.downsell} gso={playbook.offer1} /></div>

                {/* 05 Asset Library - Offer 1 */}
                <div data-pdf-output data-pdf-path={`05_Asset_Library/${sanitizeName(playbook.offer1.name)}/00_Full_Asset_Bundle.pdf`}><ValueStackAssetsPdf offer={playbook.offer1} /></div>
                {playbook.offer1.stack.map(item => item.asset && (
                     <div key={`o1-${item.asset.name}`} data-pdf-output data-pdf-path={`05_Asset_Library/${sanitizeName(playbook.offer1.name)}/${sanitizeName(item.asset.type)}_${sanitizeName(item.asset.name)}.pdf`}>
                        <AssetPdf asset={item.asset} />
                     </div>
                ))}
                
                {/* 05 Asset Library - Offer 2 */}
                <div data-pdf-output data-pdf-path={`05_Asset_Library/${sanitizeName(playbook.offer2.name)}/00_Full_Asset_Bundle.pdf`}><ValueStackAssetsPdf offer={playbook.offer2} /></div>
                {playbook.offer2.stack.map(item => item.asset && (
                     <div key={`o2-${item.asset.name}`} data-pdf-output data-pdf-path={`05_Asset_Library/${sanitizeName(playbook.offer2.name)}/${sanitizeName(item.asset.type)}_${sanitizeName(item.asset.name)}.pdf`}>
                        <AssetPdf asset={item.asset} />
                     </div>
                ))}
                 {/* 05 Asset Library - Downsell Offer */}
                <div data-pdf-output data-pdf-path={`05_Asset_Library/${sanitizeName(playbook.downsell.offer.name)}/00_Full_Asset_Bundle.pdf`}><ValueStackAssetsPdf offer={playbook.downsell.offer} /></div>
                {playbook.downsell.offer.stack.map(item => item.asset && (
                     <div key={`ds-${item.asset.name}`} data-pdf-output data-pdf-path={`05_Asset_Library/${sanitizeName(playbook.downsell.offer.name)}/${sanitizeName(item.asset.type)}_${sanitizeName(item.asset.name)}.pdf`}>
                        <AssetPdf asset={item.asset} />
                     </div>
                ))}

                {/* 06 Advertising Kit */}
                {playbook.adPlaybook && <div data-pdf-output data-pdf-path="06_Advertising_Kit/Your_Custom_Ad_Frameworks.pdf"><AdFrameworksGuidePdf adPlaybook={playbook.adPlaybook} /></div>}
                <div data-pdf-output data-pdf-path="06_Advertising_Kit/Ad_Kaleidoscope_Guide.pdf"><AdKaleidoscopeGuidePdf /></div>
                <div data-pdf-output data-pdf-path="06_Advertising_Kit/Proof_Checklist_Guide.pdf"><ProofChecklistPdf /></div>


                 {/* 07 Sales Team Training */}
                <div data-pdf-output data-pdf-path="07_Sales_Team_Training/Sales_Mindset_Guide.pdf"><SalesMindsetGuidePdf /></div>
                <div data-pdf-output data-pdf-path="07_Sales_Team_Training/Hunt_Mode_Playbook.pdf"><HuntModePlaybookPdf /></div>
                <div data-pdf-output data-pdf-path="07_Sales_Team_Training/Kill_Mode_Playbook.pdf"><KillModePlaybookPdf /></div>
                <div data-pdf-output data-pdf-path="07_Sales_Team_Training/Objection_Handling_Guide.pdf"><ObjectionHandlingCheatsheetPdf /></div>
                <div data-pdf-output data-pdf-path="07_Sales_Team_Training/Complete_Sales_Scripts.pdf"><CompleteScriptsPdf /></div>
            </div>
        );
    }
    
    if (type === 'asset-bundle' && assetBundle) {
        return <ValueStackAssetsPdf offer={assetBundle} />;
    }
    if (type === 'single-asset' && singleAsset) {
        return <AssetPdf asset={singleAsset} />;
    }

    switch (type) {
        case 'one-year-blueprint': return <OneYearBlueprintPdf businessData={businessData} playbook={playbook} />;
        case 'product-value-blueprint': return <ProductValueBlueprintPdf plan={playbook.productImprovementPlan} />;
        case 'money-models-guide': return <MoneyModelsGuidePdf />;
        case 'concepts-guide': return <ConceptsGuidePdf playbook={playbook} businessData={businessData} />;
        case 'ad-frameworks-guide': return playbook.adPlaybook ? <AdFrameworksGuidePdf adPlaybook={playbook.adPlaybook} /> : null;
        case 'ad-kaleidoscope-guide': return <AdKaleidoscopeGuidePdf />;
        case 'proof-checklist': return <ProofChecklistPdf />;
        case 'kpi-dashboard': return <KpiDashboardPdf kpiDashboard={playbook.kpiDashboard} />;
        case 'landing-page': return <LandingPagePdf playbook={playbook} businessData={businessData} />;
        case 'offer-presentation': return <OfferPresentationPdf playbook={playbook} />;
        case 'downsell-pamphlet': return <DownsellPamphletPdf downsell={playbook.downsell} />;
        case 'tripwire-followup': return <TripwireFollowupPdf downsell={playbook.downsell} gso={playbook.offer1} />;
        case 'cfa-model': return <CfaModelPdf moneyModel={playbook.moneyModel} />;
        case 'sales-mindset-guide': return <SalesMindsetGuidePdf />;
        case 'hunt-mode-playbook': return <HuntModePlaybookPdf />;
        case 'kill-mode-playbook': return <KillModePlaybookPdf />;
        case 'objection-handling-guide': return <ObjectionHandlingCheatsheetPdf />;
        case 'complete-scripts': return <CompleteScriptsPdf />;
        default: return (
            <div className="p-12 flex items-center justify-center h-full">
                <div className="text-center p-8 bg-red-50 border-2 border-red-200 rounded-lg">
                    <p className="text-xl font-bold text-red-800 mb-2">Document Not Found</p>
                    <p className="text-gray-600">Could not load document type: <span className="font-mono font-bold">{type}</span></p>
                </div>
            </div>
        );
    }
};

export default AllPdfs;
