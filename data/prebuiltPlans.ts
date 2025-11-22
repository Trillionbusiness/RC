
import { 
    AppState, GeneratedOffer, GeneratedDownsell, GeneratedKpiDashboard, 
    GeneratedMarketingModel, GeneratedMoneyModel, GeneratedMoneyModelAnalysis, 
    GeneratedMoneyModelMechanisms, GeneratedOperationsPlan, GeneratedProfitPath, 
    GeneratedSalesFunnel, GeneratedSalesSystem, GeneratedAdPlaybook, 
    GeneratedProductImprovementPlan, GeneratedMentalToughnessAnalysis
} from '../types';

const emptyOffer: GeneratedOffer = {
    name: "Placeholder Offer",
    promise: "This is a placeholder promise.",
    stack: [],
    strategyBehindStack: "Placeholder strategy.",
    totalValue: "$0",
    guarantee: "Placeholder guarantee.",
    price: "$0"
};

const emptyDownsell: GeneratedDownsell = {
    rationale: "Placeholder rationale.",
    offer: emptyOffer
};

const emptyKpiDashboard: GeneratedKpiDashboard = {
    title: "Placeholder KPI Dashboard",
    corePrinciple: "Placeholder core principle.",
    kpis: []
};

const emptyMarketingModel: GeneratedMarketingModel = {
    steps: []
};

const emptyMoneyModel: GeneratedMoneyModel = {
    title: "Placeholder Money Model",
    corePrinciple: "Placeholder core principle.",
    steps: [],
    summary: "Placeholder summary."
};

const emptyMoneyModelAnalysis: GeneratedMoneyModelAnalysis = {
    oldModel: { title: "", description: "", metrics: [] },
    newModel: { title: "", description: "", metrics: [] },
    ltvCacAnalysis: { automationLevel: "", targetRatio: "", explanation: "" },
    projectedEconomics: { estimatedCAC: "", targetLTV: "", projectedRatio: "", immediateProfit: "", explanation: "" }
};

const emptyMoneyModelMechanisms: GeneratedMoneyModelMechanisms = {
    title: "Placeholder Money Model Mechanisms",
    corePrinciple: "Placeholder core principle.",
    mechanisms: []
};

const emptyOperationsPlan: GeneratedOperationsPlan = {
    title: "Placeholder Operations Plan",
    corePrinciple: "Placeholder core principle.",
    outcomesAndActivities: [],
    bottleneckAnalysis: "Placeholder analysis.",
    proposedRoles: []
};

const emptyProfitPath: GeneratedProfitPath = {
    steps: []
};

const emptySalesFunnel: GeneratedSalesFunnel = {
    title: "Placeholder Sales Funnel",
    corePrinciple: "Placeholder core principle.",
    stages: []
};

const emptySalesSystem: GeneratedSalesSystem = {
    title: "Placeholder Sales System",
    corePrinciple: "Placeholder core principle.",
    strategies: []
};

const emptyAdPlaybook: GeneratedAdPlaybook = {
    title: "Placeholder Ad Playbook",
    corePrinciple: "Placeholder core principle.",
    frameworks: []
};

const emptyProductImprovementPlan: GeneratedProductImprovementPlan = {
  title: 'Placeholder Product Plan',
  corePrinciple: 'Placeholder principle.',
  problemAnalysis: 'Placeholder analysis.',
  improvementLevers: [],
  valueStackTransformation: {
    summary: 'Placeholder summary.',
    comparisons: [],
    newValue: '$0'
  },
  summary: 'Placeholder summary.'
};

const emptyMentalToughnessAnalysis: GeneratedMentalToughnessAnalysis = {
    title: "Placeholder Mental Toughness",
    corePrinciple: "Placeholder principle.",
    summary: "Placeholder summary.",
    components: [],
    scenarios: []
};


const gymPlan: AppState = {
  businessData: {
    country: 'United States',
    currency: 'USD',
    businessType: 'Gym / Fitness Center',
    location: 'Austin, Texas',
    monthlyRevenue: '25000',
    employees: '5',
    marketingMethods: 'Local SEO, Instagram, Word of Mouth',
    biggestChallenge: 'Getting new members in the door consistently.',
    coreOffer: 'Monthly gym membership for $150',
    targetClient: 'Young professionals aged 25-40 who want to stay fit.',
    offerTimeline: 'monthly',
    hasSalesTeam: 'yes',
    monthlyAdSpend: '2000',
    profitGoal: '40000',
    hasCertifications: 'yes',
    hasTestimonials: 'yes',
    physicalCapacity: '150 members at a time',
    ancillaryProducts: 'Protein shakes, branded apparel',
    perceivedMaxPrice: '5000',
    dailyTimeCommitment: '8',
    businessStage: 'existing',
    typicalDay: 'Morning: Open gym, train first clients. Mid-day: Paperwork, social media posts. Afternoon: Train more clients, clean up. Evening: Close up, plan for tomorrow. Feel like I\'m always busy but not growing fast enough.',
  },
  playbook: {
    diagnosis: {
      currentStage: "Struggle Street",
      yourRole: "You're the head coach, lead salesperson, and chief marketer.",
      constraints: ["Lead generation is inconsistent and unpredictable.", "Your main offer is a commodity (just like every other gym)."],
      actions: ["Create a 'Grand Slam Offer' to stand out.", "Implement a simple, predictable lead generation system."]
    },
    marketIndicatorAnalysis: {
      title: "Your Market Hunger Score",
      corePrinciple: "It's better to have a mediocre hot dog stand in front of a starving crowd than the best hot dogs in a desert.",
      overallScore: 7,
      summary: "Your local market is strong but competitive. You have clear purchasing power and targeting, but the market isn't rapidly expanding, meaning you have to fight for market share.",
      indicators: [
        { indicatorName: 'Massive Pain', score: 8, analysis: "People in Austin are highly motivated to stay fit, creating a strong demand.", suggestion: "Focus marketing on the 'pain' of being out of shape in a very active city." },
        { indicatorName: 'Purchasing Power', score: 8, analysis: "Young professionals in Austin generally have disposable income for gym memberships.", suggestion: "Offer premium add-on services like personal training to capture more value." },
        { indicatorName: 'Easy to Target', score: 9, analysis: "You can easily target this demographic with local SEO and geo-fenced social media ads.", suggestion: "Double down on 'gyms near me' and neighborhood-specific ad campaigns." },
        { indicatorName: 'Growing Market', score: 4, analysis: "The fitness market is mature and saturated, not rapidly growing. Growth comes from taking customers from competitors.", suggestion: "Create a unique offer that other gyms can't match to steal market share." },
      ],
      pivotSuggestion: "",
    },
    mentalToughnessAnalysis: emptyMentalToughnessAnalysis,
    productImprovementPlan: emptyProductImprovementPlan,
    offer1: {
      name: "The 6-Week Austin Fitness Transformation Challenge",
      promise: "Get in the best shape of your life in just 6 weeks, or your money back. Guaranteed.",
      stack: [
          { problem: "Not knowing what to do at the gym.", solution: "Personalized 6-Week Workout Plan", value: "$500", asset: { name: "Your 6-Week Workout Plan", type: "guide", content: "..." }},
          { problem: "Diet is confusing and hard.", solution: "Simple 'Eat This, Not That' Nutrition Guide", value: "$300", asset: { name: "Simple Nutrition Guide", type: "guide", content: "..." }},
          { problem: "Staying motivated alone.", solution: "Weekly Accountability Check-ins with a Coach", value: "$800", asset: { name: "Accountability Guide", type: "guide", content: "..." }},
      ],
      strategyBehindStack: "This offer de-risks the purchase, provides a clear timeline, and solves the three biggest problems new gym members face: lack of direction, poor diet, and no accountability.",
      totalValue: "$1600",
      guarantee: "If you follow the plan for 6 weeks and don't see a noticeable transformation, we'll refund every penny. No questions asked.",
      price: "$599"
    },
    offer2: emptyOffer, 
    downsell: emptyDownsell, 
    kpiDashboard: emptyKpiDashboard, 
    marketingModel: emptyMarketingModel, 
    moneyModel: emptyMoneyModel, 
    moneyModelAnalysis: emptyMoneyModelAnalysis, 
    moneyModelMechanisms: emptyMoneyModelMechanisms, 
    operationsPlan: emptyOperationsPlan, 
    profitPath: emptyProfitPath, 
    salesFunnel: emptySalesFunnel, 
    salesSystem: emptySalesSystem, 
    adPlaybook: emptyAdPlaybook,
  },
  kpiEntries: [],
  weeklyDebriefs: [],
};

const saasPlan: AppState = {
  businessData: {
    country: 'United States',
    currency: 'USD',
    businessType: 'SaaS for Agencies',
    location: 'Remote',
    monthlyRevenue: '10000',
    employees: '3',
    marketingMethods: 'Content Marketing, Cold Email',
    biggestChallenge: 'Long sales cycle and getting users to see the value during the trial.',
    coreOffer: 'Project management tool at $99/month',
    targetClient: 'Small marketing agencies (5-10 people)',
    offerTimeline: 'monthly',
    hasSalesTeam: 'no',
    monthlyAdSpend: '1000',
    profitGoal: '25000',
    hasCertifications: 'no',
    hasTestimonials: 'yes',
    physicalCapacity: '',
    ancillaryProducts: 'White-glove onboarding service',
    perceivedMaxPrice: '20000',
    dailyTimeCommitment: '8',
    businessStage: 'existing',
    typicalDay: 'Stand-up meeting with dev team. Analyzing ad spend and conversion metrics. Responding to high-level customer support tickets. Product roadmap planning. I spend most of my time on the product and ads, but our LTV isn\'t improving.',
  },
  playbook: {
    diagnosis: {
      currentStage: "The Grind",
      yourRole: "You need to be a product visionary and a sales machine.",
      constraints: ["Your free trial isn't converting because users don't experience the 'aha!' moment.", "Your pricing is simple, but doesn't capture the full value you provide."],
      actions: ["Re-engineer your onboarding to force user success.", "Create a high-ticket 'Done-With-You' offer to increase immediate cashflow."]
    },
    marketIndicatorAnalysis: {
        title: "Your SaaS Market Hunger Score",
        corePrinciple: "A great product in a bad market will fail. A mediocre product in a starving market will sell out.",
        overallScore: 8,
        summary: "Your market is excellent. Agencies have significant pain, the ability to pay, and are easy to target. The market is also growing as more businesses rely on agencies.",
        indicators: [
          { indicatorName: 'Massive Pain', score: 9, analysis: "Agencies constantly struggle with project management and client reporting. It's a huge operational headache.", suggestion: "Your messaging should focus on solving the pain of 'scope creep' and 'unhappy clients'." },
          { indicatorName: 'Purchasing Power', score: 8, analysis: "Agencies are businesses that spend money on tools to make them more efficient. $99/mo is a small price to pay for efficiency.", suggestion: "Frame the price against the cost of one wasted hour from a project manager." },
          { indicatorName: 'Easy to Target', score: 9, analysis: "Agencies can be easily targeted on LinkedIn, in marketing communities, and through content marketing for agency owners.", suggestion: "Create a lead magnet specifically titled 'The 5 PM Mistakes Killing Your Agency's Profit'." },
          { indicatorName: 'Growing Market', score: 7, analysis: "The agency world is competitive but constantly growing as new platforms emerge.", suggestion: "Position your tool as the solution for the 'modern' agency to ride the growth wave." },
        ],
        pivotSuggestion: "",
    },
    mentalToughnessAnalysis: emptyMentalToughnessAnalysis,
    productImprovementPlan: emptyProductImprovementPlan,
     offer1: {
      name: "The Agency OS: Full Suite + White-Glove Onboarding",
      promise: "We'll personally set up your entire agency's workflow in our system and train your team in 7 days.",
      stack: [
        { problem: "Setting up new software is a time-consuming nightmare.", solution: "Complete 'Done-For-You' Account Setup & Data Import", value: "$2,500", asset: { name: "Onboarding Checklist", type: "checklist", content: "..." }},
        { problem: "Team won't adopt new tools.", solution: "Live 2-Hour Team Training & Q&A Session", value: "$1,500", asset: { name: "Team Training Agenda", type: "template", content: "..." }},
        { problem: "Generic templates don't fit our workflow.", solution: "5 Custom Workflow Templates Built For Your Agency", value: "$3,000", asset: { name: "Workflow Design Guide", type: "guide", content: "..." }}
      ],
      strategyBehindStack: "This offer completely removes the biggest friction points for adoption: setup and training. It sells the dream outcome (a perfectly organized agency) without the usual work, justifying a premium price.",
      totalValue: "$7,000",
      guarantee: "If your team isn't using the system daily by day 30, we'll work with you for free until they are.",
      price: "$4,997"
    },
    offer2: emptyOffer, 
    downsell: emptyDownsell, 
    kpiDashboard: emptyKpiDashboard, 
    marketingModel: emptyMarketingModel, 
    moneyModel: emptyMoneyModel, 
    moneyModelAnalysis: emptyMoneyModelAnalysis, 
    moneyModelMechanisms: emptyMoneyModelMechanisms, 
    operationsPlan: emptyOperationsPlan, 
    profitPath: emptyProfitPath, 
    salesFunnel: emptySalesFunnel, 
    salesSystem: emptySalesSystem, 
    adPlaybook: emptyAdPlaybook,
  },
  kpiEntries: [],
  weeklyDebriefs: [],
};


export const prebuiltPlans = [
    { name: 'Local Gym Growth Plan', description: 'A complete plan for a local gym struggling with lead flow.', data: gymPlan },
    { name: 'SaaS for Agencies', description: 'A strategy for a B2B SaaS company to shorten their sales cycle and increase LTV.', data: saasPlan },
];
