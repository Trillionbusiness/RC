
import { GoogleGenAI, Type, GenerateContentResponse, Content } from "@google/genai";
import { 
    BusinessData, GeneratedPlaybook, OfferStackItem, GeneratedDiagnosis, 
    GeneratedMoneyModelAnalysis, GeneratedMoneyModel, GeneratedMoneyModelMechanisms, 
    GeneratedOperationsPlan, GeneratedOffer, GeneratedDownsell, GeneratedProfitPath, 
    GeneratedMarketingModel, GeneratedSalesFunnel, GeneratedKpiDashboard, ChatMessage, 
    GeneratedSalesSystem, KpiEntry, WeeklyDebrief, GeneratedAdPlaybook, GeneratedMarketIndicatorAnalysis,
    GeneratedProductImprovementPlan
} from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const escapeStringForJson = (str: string | undefined | null): string => {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
};

const systemInstruction = `
--- You are Alex Hormozi AI ---

Your persona is a blend of a world-class business strategist, a master of logical sales, and a slightly irreverent, funny mentor who's been through it all. You slept on a gym floor, and now you run a massive enterprise, so you know what it takes. Your goal isn't just to give a plan; it's to empower the user to make ONE decision that can change their life forever.

**Core Philosophy: Power through Rational Decision-Making**
1.  **One Decision Away:** Frame everything around this idea. The user is one good decision from a new life. Your job is to give them the logical framework to make that decision.
2.  **Volume Negates Luck:** This is a core tenet. The more high-quality actions taken, the less luck is a factor. Your strategies should promote intelligent volume.
3.  **Logical Selling:** You sell with logic, not just emotion. An emotional 'yes' fades. A logical 'yes' sticks. Your frameworks help their logical brain justify the decision their gut already wants to make. You have a high moral responsibility to be rational.
4.  **Embrace the "Gasp":** If the price doesn't make them gasp, you didn't go high enough. Anchor high so the real price feels like a rounding error.
5.  **Help them help themselves:** You're not helping them. You're helping them help themselves. You are empowering them to own their decisions.

**Voice and Tone: Direct, Humorous, and Real**
1.  **Humor & Self-Deprecation:** Be funny. Use humor to disarm and teach. Refer to yourself sleeping on a gym floor or working in a closet in your penthouse. Be relatable.
2.  **Brutal Honesty (with a wink):** Be direct. The pain of staying the same must be greater than the pain of change.
3.  **Use Stories & Analogies:** Explain everything with simple stories and analogies a 10-year-old could get. The Sephora story for new identity, the bad 8th-grade boyfriend for not letting past failures burn you twice, the three-legged stool for business pillars.
4.  **Simple Language:** No jargon. Use short, punchy sentences. Explain complex ideas like you're talking to a friend at a bar.

--- Your Expanded Knowledge Base - The $100M Playbooks ---
You must use the following frameworks and concepts in your responses.

**1. Finding a Hungry Crowd: The 4 Market Indicators**
- The market is the single most important variable. A great product in a bad market will fail. A mediocre product in a starving market will sell out.
- **1. Massive Pain:** The customer doesn't just *want* your solution, they *must have* it. It solves a desperate, urgent problem that keeps them up at night.
- **2. Purchasing Power:** The customer can actually afford your solution without it being a major financial hardship. (Example: Don't sell resume-fixing services to unemployed people who have no money).
- **3. Easy to Target:** You can find these customers easily and affordably in a specific place. (Example: 'Nurses' are easy to target on LinkedIn. 'Psychedelic Aztecs in Croatia' are not).
- **4. Growing Market:** The entire market is expanding. This gives you a natural tailwind that makes growth easier. Selling to a shrinking market (like newspapers) is like swimming upstream.

**2. The Four Core Money Models & Offer Creation**
- **Value Equation:** Value = (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice). Every offer must maximize the top and minimize the bottom.
- **Attraction Offers (Get Customers):** These are front-end, often free or low-cost, designed to acquire a customer profitably.
    - *Win Your Money Back:* Customer pays, and gets a refund if they achieve a specific, action-based result (e.g., "Lose 20lbs in 6 weeks").
    - *Giveaways:* Offer a huge "Grand Prize" to generate leads, then offer a discount/smaller prize to all non-winners.
    - *Decoy Offer:* Advertise a basic/free offer to attract leads, then present a vastly superior premium offer side-by-side to make the premium option a no-brainer.
    - *Buy X Get Y Free:* Frame discounts as free items (e.g., "Buy 1 Get 2 Free" is better than "3 for the price of 1").
    - *Pay Less Now or Pay More Later:* A free trial that requires a credit card, which bills later. The "Pay Now" option is a discounted price with extra bonuses.
- **Upsell Offers (Get More Cash, Faster):** Offer these immediately after the initial purchase.
    - *Classic "Fries with that" Upsell:* Sell a logical, complementary item (e.g., buy a bike, offer a helmet).
    - *Menu Upsell:* Give customers a menu of options, tell them what they *don't* need (unselling) to build trust, then prescribe what they *do* need.
    - *Anchor Upsell:* Present the hyper-premium, expensive option first. When they balk, the main offer seems like a fantastic deal.
    - *Rollover Upsell:* Credit a customer's past purchase towards a new, more expensive one.
- **Downsell Offers (Save the 'No'):** When a customer says no to an offer, provide an alternative.
    - *Payment Plans:* Offer to split the cost over time. The product and total price remain the same.
    - *Trial with Penalty:* A free trial, but they get charged a "penalty" if they don't complete certain actions (e.g., attend onboarding calls). This ensures engagement.
    - *Feature Downsell:* Lower the price by removing a feature (e.g., "Okay, you can have it for less, but without the 1-on-1 coaching").
- **Continuity Offers (Keep Them Paying):** The key to long-term recurring revenue.
    - *Continuity Bonus:* Give a high-value bonus for free if they sign up for a subscription today.
    - *Continuity Discount:* Offer a period of free service if they commit to a longer-term contract (e.g., "First 3 months free on an annual plan").
    - *Waived Fee:* Charge a large setup fee for month-to-month service, but waive the fee entirely if they commit to a year.

**3. GOATed Ads & The Ad Kaleidoscope**
- **Core Idea:** 90% of an ad's success is the hook (first 3 seconds). Find one winning ad, then multiply it.
- **Ad Kaleidoscope - Remixing (Post-Production):** Easy tweaks to a winning ad video.
    - New Speed (1.1x), New Filters (B&W), New Background/Border, New Fonts/Captions, New Headline, New Format (square vs vertical).
- **Ad Kaleidoscope - Remaking (Re-Recording):** Re-shoot the winning script with minor changes.
    - New Clone (just re-film it), New Props, New Examples (change a number), New Setting, New Talent (someone else reads the script).
- **Ad Frameworks:**
    - *Personal Testimonial/Origin Story:* Tell a "rags to riches" story, building mystery and overcoming objections.
    - *Prop Comedy:* Use a physical object to create a pattern interrupt and demonstrate value (e.g., Dollar Shave Club).
    - *Emotional Avatar Testimonial:* A customer tells their emotional story, focusing on the pain before and the dream outcome after.
    - *Show, Don't Tell:* Use raw, behind-the-scenes footage with no narration to prove your claims (e.g., a packed gym, a full calendar).
    - *Long-Term Result:* Contrast small, short-term results with massive, long-term transformations to attract higher-quality buyers.

**4. Sales & Closing: The ACQ Handbooks**
- **Mindset:** Volume negates luck. Don't be cute, be direct. Breathe the script until it's natural. The goal is to get a "yes" or a "no", not a "maybe".
- **Hunt vs. Kill Mode:** *Hunt Mode* is everything you do to get prospects on the phone. *Kill Mode* is everything you do on the phone to close the sale.
- **The 9 Kill Skills:** Breathe Script, Tone, Intro, Discovery, Offer, Objections, Looping, BAMFAM (Book-A-Meeting-From-A-Meeting), Referrals.
- **The 5 Core Objections:** Time, Money, Decision-Maker, Preference, Stall.
- **Objection Looping:** The core framework for handling any objection.
    - 1. **Acknowledge/Agree:** "Totally get it. And..." (NEVER use "but").
    - 2. **Address:** Reframe their concern as a reason to buy now.
    - 3. **Ask Again:** Immediately ask for the sale.
- **Proof Hierarchy:** Your proof is your differentiator. A raw customer testimonial is more powerful than you talking. A specific number is better than a vague claim. (e.g., Show > Tell, Other People > You, With Numbers > Without Numbers).
`;

// --- SCHEMAS ---

const offerSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        promise: { type: Type.STRING },
        stack: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    problem: { type: Type.STRING },
                    solution: { type: Type.STRING },
                    value: { type: Type.STRING, description: "The specific monetary value of this solution, e.g., '$2,000'." },
                    asset: {
                        type: Type.OBJECT,
                        description: "A mandatory downloadable asset. CRITICAL: The asset must always be a valuable digital product (template, framework, checklist, script, guide, blueprint) intended FOR THE END CUSTOMER. It should serve as a powerful lead magnet or a core component of the value stack. The content should be the full, ready-to-use text for that digital product. In rare cases where creating the full asset content is too complex (e.g., a 50-page ebook), you may instead generate a detailed 'Blueprint Guide' FOR THE BUSINESS OWNER on exactly how to create this high-value asset, including chapter outlines, key talking points, and resource suggestions. If you do this, the asset name MUST start with 'Blueprint Guide:'.",
                        properties: {
                            name: { type: Type.STRING, description: "The filename for the asset. If generating a guide for the business owner on how to create the asset, the name must start with 'Blueprint Guide:'." },
                            type: { type: Type.STRING, description: "The type of asset: 'template', 'framework', 'checklist', 'script', 'guide'." },
                            content: { type: Type.STRING, description: "The full, ready-to-use text content of the asset, formatted in simple Markdown." }
                        },
                        required: ["name", "type", "content"]
                    }
                },
                required: ["problem", "solution", "value", "asset"]
            }
        },
        strategyBehindStack: { type: Type.STRING, description: "The strategic rationale behind the composition of the value stack. Explain why these specific elements were chosen to solve the client's problem and create an irresistible offer." },
        totalValue: { type: Type.STRING, description: "The sum total monetary value of all items in the stack, e.g., '$20,000'." },
        guarantee: { type: Type.STRING },
        price: { type: Type.STRING }
    },
    required: ["name", "promise", "stack", "strategyBehindStack", "totalValue", "guarantee", "price"]
};

const diagnosisSchema = {
    type: Type.OBJECT,
    properties: {
        currentStage: { type: Type.STRING },
        yourRole: { type: Type.STRING },
        constraints: { type: Type.ARRAY, items: { type: Type.STRING } },
        actions: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["currentStage", "yourRole", "constraints", "actions"]
};

const marketIndicatorAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title, e.g., 'Your Market Hunger Score'." },
        corePrinciple: { type: Type.STRING, description: "The core idea, e.g., 'It's better to have a mediocre hot dog stand in front of a starving crowd than the best hot dogs in a desert.'" },
        overallScore: { type: Type.INTEGER, description: "The average score of all indicators, from 1 to 10." },
        summary: { type: Type.STRING, description: "A brutally honest but encouraging summary of the market's strength." },
        indicators: {
            type: Type.ARRAY,
            description: "An array of exactly 4 indicators, one for each type.",
            items: {
                type: Type.OBJECT,
                properties: {
                    indicatorName: { type: Type.STRING, description: "'Massive Pain', 'Purchasing Power', 'Easy to Target', or 'Growing Market'." },
                    score: { type: Type.INTEGER, description: "A score from 1 to 10 evaluating this indicator for the user's market." },
                    analysis: { type: Type.STRING, description: "A concise analysis explaining the score." },
                    suggestion: { type: Type.STRING, description: "A single, actionable suggestion to improve this score." }
                },
                required: ["indicatorName", "score", "analysis", "suggestion"]
            }
        },
        pivotSuggestion: { type: Type.STRING, description: "If the overall score is low (e.g., below 6), provide a specific, alternative target market idea that would score higher. Otherwise, leave as an empty string." }
    },
    required: ["title", "corePrinciple", "overallScore", "summary", "indicators", "pivotSuggestion"]
};

const productImprovementPlanSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title, e.g., 'Your Product Value Multiplier Blueprint'." },
        corePrinciple: { type: Type.STRING, description: "The core Hormozi principle about product quality being paramount." },
        problemAnalysis: { type: Type.STRING, description: "A brutally honest analysis of why the user's current offer is not valuable enough, linking it to their biggest challenge." },
        improvementLevers: {
            type: Type.ARRAY,
            description: "An array of exactly 4 levers, one for each component of the Value Equation.",
            items: {
                type: Type.OBJECT,
                properties: {
                    leverName: { type: Type.STRING, description: "'Dream Outcome', 'Likelihood of Achievement', 'Time Delay', or 'Effort & Sacrifice'." },
                    strategy: { type: Type.STRING, description: "A high-level strategy for improving this lever for the user's specific business." },
                    tactics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 concrete, actionable tactics to implement the strategy." }
                },
                required: ["leverName", "strategy", "tactics"]
            }
        },
        valueStackTransformation: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of how these changes transform the offer's value." },
                comparisons: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            itemName: { type: Type.STRING, description: "The name of the feature or component being improved." },
                            before: { type: Type.STRING, description: "What it was before." },
                            after: { type: Type.STRING, description: "What it becomes after the improvement." },
                            valueIncrease: { type: Type.STRING, description: "The estimated increase in perceived value, e.g., '+$1,000'." }
                        },
                        required: ["itemName", "before", "after", "valueIncrease"]
                    }
                },
                newValue: { type: Type.STRING, description: "The new total perceived value of the transformed offer." }
            },
            required: ["summary", "comparisons", "newValue"]
        },
        summary: { type: Type.STRING, description: "A concluding, motivational summary about focusing on delivering insane value." }
    },
    required: ["title", "corePrinciple", "problemAnalysis", "improvementLevers", "valueStackTransformation", "summary"]
};

const modelComparisonSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        metrics: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING }
                },
                required: ["label", "value"]
            }
        }
    },
    required: ["title", "description", "metrics"]
};


const moneyModelAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        oldModel: modelComparisonSchema,
        newModel: modelComparisonSchema,
        ltvCacAnalysis: {
            type: Type.OBJECT,
            properties: {
                automationLevel: { type: Type.STRING },
                targetRatio: { type: Type.STRING },
                explanation: { type: Type.STRING }
            },
            required: ["automationLevel", "targetRatio", "explanation"]
        },
        projectedEconomics: {
            type: Type.OBJECT,
            properties: {
                estimatedCAC: { type: Type.STRING },
                targetLTV: { type: Type.STRING },
                projectedRatio: { type: Type.STRING },
                immediateProfit: { type: Type.STRING },
                explanation: { type: Type.STRING }
            },
            required: ["estimatedCAC", "targetLTV", "projectedRatio", "immediateProfit", "explanation"]
        }
    },
    required: ["oldModel", "newModel", "ltvCacAnalysis", "projectedEconomics"]
};

const moneyModelStepSchema = {
    type: Type.OBJECT,
    properties: {
        stepNumber: { type: Type.INTEGER, description: "The sequential number of the step, starting at 1." },
        title: { type: Type.STRING, description: "The title of the step, e.g., 'Step 1: The Attraction Offer'." },
        offerName: { type: Type.STRING, description: "The specific name of the offer in this step." },
        price: { type: Type.STRING, description: "The price point for this offer, e.g., '$499 Upfront'." },
        rationale: { type: Type.STRING, description: "The strategic reason for this step in the sequence." },
        hormoziTactic: { type: Type.STRING, description: "The specific Hormozi tactic being used, e.g., 'Win Your Money Back Challenge'." },
        details: { type: Type.STRING, description: "A detailed breakdown of what this step entails and how to execute it." }
    },
    required: ["stepNumber", "title", "offerName", "price", "rationale", "hormoziTactic", "details"]
};

const moneyModelSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title for the entire money model, e.g., 'The Client-Financed Acquisition Model'." },
        corePrinciple: { type: Type.STRING, description: "The core financial objective of the model, e.g., 'Generate >2x (CAC + COGS) in Gross Profit within 30 days'." },
        steps: {
            type: Type.ARRAY,
            items: moneyModelStepSchema
        },
        summary: { type: Type.STRING, description: "A concluding summary of why this model is powerful for the business." }
    },
    required: ["title", "corePrinciple", "steps", "summary"]
};

const moneyModelMechanismSchema = {
    type: Type.OBJECT,
    properties: {
        mechanismType: { type: Type.STRING, description: "The type of mechanism: 'Attraction', 'Upsell', 'Downsell', or 'Continuity'." },
        tacticName: { type: Type.STRING, description: "The name of the specific tactic, e.g., 'Win Your Money Back Challenge'." },
        strategy: { type: Type.STRING, description: "A detailed explanation of how this tactic applies to the user's business." },
        example: { type: Type.STRING, description: "A concrete example of an offer using this tactic for this business." },
        implementationNotes: { type: Type.STRING, description: "Practical, step-by-step advice on how to implement this tactic." }
    },
    required: ["mechanismType", "tacticName", "strategy", "example", "implementationNotes"]
};

const moneyModelMechanismsSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        mechanisms: {
            type: Type.ARRAY,
            description: "An array of exactly 4 mechanisms, one for each type: Attraction, Upsell, Downsell, Continuity.",
            items: moneyModelMechanismSchema
        }
    },
    required: ["title", "corePrinciple", "mechanisms"]
};

const operationsPlanSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        outcomesAndActivities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    outcome: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    timeAllocation: { type: Type.STRING },
                    frequency: { type: Type.STRING }
                },
                required: ["outcome", "activity", "timeAllocation", "frequency"]
            }
        },
        bottleneckAnalysis: { type: Type.STRING },
        proposedRoles: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    roleTitle: { type: Type.STRING },
                    responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                    dailyStructure: { type: Type.STRING },
                    keyMetric: { type: Type.STRING }
                },
                required: ["roleTitle", "responsibilities", "dailyStructure", "keyMetric"]
            }
        }
    },
    required: ["title", "corePrinciple", "outcomesAndActivities", "bottleneckAnalysis", "proposedRoles"]
};

const profitPathSchema = {
    type: Type.OBJECT,
    properties: {
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    action: { type: Type.STRING },
                    example: { type: Type.STRING },
                    script: { type: Type.STRING, description: "Optional script. Provide if applicable." }
                },
                required: ["title", "action", "example"]
            }
        }
    },
    required: ["steps"]
};

const marketingModelSchema = {
    type: Type.OBJECT,
    properties: {
        steps: {
            type: Type.ARRAY,
            description: "Exactly 4 marketing model steps.",
            items: {
                type: Type.OBJECT,
                properties: {
                    method: { type: Type.STRING },
                    strategy: { type: Type.STRING },
                    example: { type: Type.STRING },
                    template: { type: Type.STRING, description: "Optional template. Provide if applicable." }
                },
                required: ["method", "strategy", "example"]
            }
        }
    },
    required: ["steps"]
};

const salesFunnelSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        stages: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    stageName: { type: Type.STRING },
                    goal: { type: Type.STRING },
                    adCopy: {
                        type: Type.OBJECT,
                        properties: {
                            headline: { type: Type.STRING },
                            body: { type: Type.STRING },
                            cta: { type: Type.STRING }
                        },
                        required: ["headline", "body", "cta"]
                    },
                    landingPage: {
                        type: Type.OBJECT,
                        properties: {
                            headline: { type: Type.STRING },
                            elements: { type: Type.ARRAY, items: { type: Type.STRING } },
                            keyFocus: { type: Type.STRING }
                        },
                        required: ["headline", "elements", "keyFocus"]
                    },
                    salesProcess: {
                        type: Type.OBJECT,
                        properties: {
                            step: { type: Type.STRING },
                            scriptFocus: { type: Type.STRING }
                        },
                        required: ["step", "scriptFocus"]
                    },
                    keyMetric: { type: Type.STRING }
                },
                required: ["stageName", "goal", "adCopy", "landingPage", "salesProcess", "keyMetric"]
            }
        }
    },
    required: ["title", "corePrinciple", "stages"]
};

const kpiDashboardSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        corePrinciple: { type: Type.STRING },
        kpis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    perspective: { type: Type.STRING, description: "'Financial', 'Customer', 'Operational', or 'Marketing'" },
                    description: { type: Type.STRING },
                    formula: { type: Type.STRING },
                    howToMeasure: { type: Type.STRING },
                    example: { type: Type.STRING },
                    importance: { type: Type.STRING }
                },
                required: ["name", "perspective", "description", "formula", "howToMeasure", "example", "importance"]
            }
        }
    },
    required: ["title", "corePrinciple", "kpis"]
};

const downsellSchema = {
    type: Type.OBJECT,
    properties: {
        rationale: { type: Type.STRING },
        offer: offerSchema
    },
    required: ["rationale", "offer"]
};

const salesSystemSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title for the sales system, e.g., 'The Unstoppable Persuasion Engine'." },
        corePrinciple: { type: Type.STRING, description: "The core philosophy behind the sales strategies." },
        strategies: {
            type: Type.ARRAY,
            description: "An array of detailed strategies for different outreach methods.",
            items: {
                type: Type.OBJECT,
                properties: {
                    method: { type: Type.STRING, description: "'Cold Outreach', 'Warm Outreach', 'Paid Ads', 'Content Marketing', or 'Affiliate Marketing'." },
                    strategy: { type: Type.STRING, description: "The psychological strategy behind this method, explained simply." },
                    template: { type: Type.STRING, description: "A complete, ready-to-use, copy-pasteable script or ad template written with elite direct-response copywriting." },
                    worstCaseObjections: {
                        type: Type.ARRAY,
                        description: "2-3 common or 'worst-case' objections for this method and how to handle them.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                objection: { type: Type.STRING, description: "The customer's objection, phrased cynically." },
                                psychologicalPrinciple: { type: Type.STRING, description: "The specific 'BrainScripts' or 'Cashvertising' principle used in the response (e.g., 'Inoculation', 'Message Sidedness')." },
                                response: { type: Type.STRING, description: "A word-for-word script on how to respond persuasively." }
                            },
                            required: ["objection", "psychologicalPrinciple", "response"]
                        }
                    }
                },
                required: ["method", "strategy", "template", "worstCaseObjections"]
            }
        }
    },
    required: ["title", "corePrinciple", "strategies"]
};

const weeklyDebriefSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A concise, encouraging summary of the week's performance based on the KPI data, written in the Dale Carnegie persona. Highlight one key win and one area for focus." },
        focus: { type: Type.STRING, description: "The single most important, actionable task from the playbook's action plan that the user should focus on for the next week to address the biggest bottleneck revealed by the data." }
    },
    required: ["summary", "focus"]
};

const adFrameworkSchema = {
    type: Type.OBJECT,
    properties: {
        frameworkName: { type: Type.STRING },
        whyItWorks: { type: Type.STRING, description: "Explain why this specific ad framework is perfect for the user's business, based on their data." },
        visualHook: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Describe 2-3 visual ideas for the first 3 seconds of the ad." },
        adCopy: {
            type: Type.OBJECT,
            properties: {
                hook: { type: Type.STRING, description: "Write a powerful, direct-response hook for the ad copy." },
                meatOrOffer: { type: Type.STRING, description: "Write the main body of the ad copy, presenting the offer and the logic behind it." }
            },
            required: ["hook", "meatOrOffer"]
        },
        howToApply: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Provide 3-5 simple, actionable steps on how the user can film and create this ad." }
    },
    required: ["frameworkName", "whyItWorks", "visualHook", "adCopy", "howToApply"]
};

const adPlaybookSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A compelling title for the ad playbook, e.g., 'Your 5-Minute Ad Machine'."},
        corePrinciple: { type: Type.STRING, description: "The core philosophy from the ACQ Advertising Handbook about iterating on winners."},
        frameworks: {
            type: Type.ARRAY,
            description: "An array of 3-5 ad frameworks tailored to the user's business.",
            items: adFrameworkSchema
        }
    },
    required: ["title", "corePrinciple", "frameworks"]
};


// --- HELPER FUNCTIONS ---

const generate = async <T>(contents: string, schema: any): Promise<T> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (e) {
        console.error("AI Generation Error:", e, "Prompt (contents):", contents);
        if (e instanceof Error) {
          throw new Error(`Failed to generate valid JSON for the requested content: ${e.message}`);
        }
        throw new Error("An unknown error occurred during AI generation.");
    }
};

const createBusinessContextPrompt = (data: BusinessData): string => {
    const escapedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, escapeStringForJson(value)])
    ) as Record<keyof BusinessData, string>;
    
    let businessStageContext = '';
    if (escapedData.businessStage === 'new') {
        businessStageContext = `
This is a brand new business idea. The user is starting from scratch.
Funding Status: ${escapedData.fundingStatus === 'bootstrapped' ? 'Bootstrapping (no money)' : 'Has funding/capital'}.
IMPORTANT: Tailor your advice for someone at the very beginning of their journey.
- For 'bootstrapped' businesses, focus on sweat equity, low-cost client acquisition (e.g., cold outreach, organic content), and getting to cash flow positive as fast as possible. Your advice should be scrappy and action-oriented.
- For 'funded' businesses, advise on how to intelligently deploy capital for faster growth, testing paid channels, and building systems early. Your advice should focus on leverage and speed.
`;
    } else {
        businessStageContext = `This is an existing business looking to improve and grow.`;
    }

    return `
Analyze the following business and generate the requested output in the specified JSON format. Do not include any explanatory text before or after the JSON.

Business Situation:
${businessStageContext}

Business Data:
- Country for cultural adaptation of copy: ${escapedData.country}
- Currency: ${escapedData.currency}
- Business Type: ${escapedData.businessType}
- Is Primary Offer Digital?: ${escapedData.isDigital || 'no'}
- Location: ${escapedData.location}
- Monthly Revenue: ${escapedData.monthlyRevenue} ${escapedData.currency}
- Employees: ${escapedData.employees}
- Marketing Methods: ${escapedData.marketingMethods}
- Biggest Challenge: ${escapedData.biggestChallenge}
- Core Offer: ${escapedData.coreOffer}
- Target Client: ${escapedData.targetClient}
- Offer Timeline: ${escapedData.offerTimeline}
- Has Sales Team: ${escapedData.hasSalesTeam}
- Monthly Ad Spend: ${escapedData.monthlyAdSpend} ${escapedData.currency}
- Profit Goal: ${escapedData.profitGoal} ${escapedData.currency}
- Has Certifications: ${escapedData.hasCertifications}
- Has Testimonials: ${escapedData.hasTestimonials}
- Physical Capacity: ${escapedData.physicalCapacity}
- Ancillary Products: ${escapedData.ancillaryProducts}
- Perceived Max Price (value of perfect result): ${escapedData.perceivedMaxPrice} ${escapedData.currency}
- Daily Time Commitment for Growth: ${escapedData.dailyTimeCommitment} hours
- Typical Day: ${escapedData.typicalDay}
`;
};

// --- EXPORTED GENERATION FUNCTIONS ---

export const generateDiagnosis = async (data: BusinessData): Promise<GeneratedDiagnosis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Based on the business data, provide a diagnosis. Be brutally honest but funny and encouraging. Identify their primary constraint using the 'kink in the hose' framework (Leads, Sales, Delivery, or Profit). Determine their current stage, their primary role, and the top simple actions they must take to fix their main problem.`;
    return generate<GeneratedDiagnosis>(prompt, diagnosisSchema);
};

export const generateMarketIndicatorAnalysis = async (data: BusinessData): Promise<GeneratedMarketIndicatorAnalysis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Critically analyze the user's business and target market against the '4 Market Indicators' framework. Be brutally honest. For each indicator, provide a score from 1-10 (1=terrible, 10=perfect), a concise analysis justifying the score, and one actionable suggestion for improvement. If the overall market is weak (average score below 6), provide a specific, creative pivot suggestion to a stronger market.`;
    return generate<GeneratedMarketIndicatorAnalysis>(prompt, marketIndicatorAnalysisSchema);
};

export const generateProductImprovementPlan = async (data: BusinessData): Promise<GeneratedProductImprovementPlan> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: The user's current product/offer needs to be transformed from a 'nice-to-have' into a 'must-have painkiller'. Your job is to create a Product Improvement Blueprint. Analyze their core offer and biggest challenge, then use the Value Equation (Dream Outcome, Likelihood of Achievement, Time Delay, Effort & Sacrifice) as a framework to devise concrete, tactical improvements. Generate a 'Before & After' value stack comparison to quantify the transformation. Make it brutally honest and incredibly actionable.`;
    return generate<GeneratedProductImprovementPlan>(prompt, productImprovementPlanSchema);
};

export const generateMoneyModelAnalysis = async (data: BusinessData): Promise<GeneratedMoneyModelAnalysis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Analyze the business's current money model (or lack thereof) and propose a new, powerful one. Compare the 'Old Model' vs. 'New Model' using simple terms and metrics. Project the LTV/CAC analysis and the potential immediate profit from a new customer under the new model. The goal is a money-printing machine.`;
    return generate<GeneratedMoneyModelAnalysis>(prompt, moneyModelAnalysisSchema);
};

export const generateMoneyModelMechanisms = async (data: BusinessData): Promise<GeneratedMoneyModelMechanisms> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Generate a "Money Model Toolkit" using the core four money models. Provide one specific, powerful tactic for each of the four monetization levers: Attraction, Upsell, Downsell, and Continuity. For each tactic, explain the strategy with a simple analogy, provide a concrete example tailored to this business, and give practical, funny implementation notes.`;
    return generate<GeneratedMoneyModelMechanisms>(prompt, moneyModelMechanismsSchema);
};

export const generateMoneyModel = async (data: BusinessData): Promise<GeneratedMoneyModel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Design a complete Money Model (the fuel system) for this business. The main goal is Client-Financed Acquisition. Give it a cool title and a simple core principle. Detail 3-5 sequential steps. Where appropriate, integrate one or two of the "Instant Profit" pricing plays (e.g., 28-day billing, processing fees, annual options) into the steps to maximize immediate cash flow.`;
    return generate<GeneratedMoneyModel>(prompt, moneyModelSchema);
};

export const generateOffer1 = async (data: BusinessData): Promise<GeneratedOffer> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a compelling "Grand Slam Offer" (GSO). The offer must be built using the Value Equation (Dream Outcome x Perceived Likelihood / Time Delay x Effort & Sacrifice). Maximize the top, minimize the bottom. The copy must be electric.
- **Name & Promise:** Make it huge, specific, and desirable. So good it makes them gasp.
- **Stack Items:** Use simple, powerful language. Explain the strategy behind the stack using a simple analogy a 10-year-old would get.
- **Assets:** Provide the FULL, ready-to-use text content in simple Markdown for each of the 5-8 stack items. Make it sound like a priceless secret they're getting for a steal.`;
    return generate<GeneratedOffer>(prompt, offerSchema);
};

export const generateOffer2 = async (data: BusinessData): Promise<GeneratedOffer> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a SECOND, alternative "Grand Slam Offer". It must solve the same core problem but from a different, clever angle. Follow all the rules from the first offer: make it irresistible, give it a great name and promise, build a killer value stack, and provide complete, simple assets.`;
    return generate<GeneratedOffer>(prompt, offerSchema);
};

export const generateDownsell = async (data: BusinessData): Promise<GeneratedDownsell> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a simple "Hello Offer" as a downsell/tripwire. It must be a low-cost, high-value, easy "yes" that solves one tiny, painful problem. Explain the rationale like you're letting them in on a secret. The stack should be 2-4 items, each with a full, simple Markdown asset.`;
    return generate<GeneratedDownsell>(prompt, downsellSchema);
};

export const generateMarketingModel = async (data: BusinessData): Promise<GeneratedMarketingModel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a 4-step lead generation plan. Incorporate the "Marketing Machine" philosophy by including at least one strategy for systematically capturing and using customer results (testimonials, case studies, social media content) as marketing assets. The copy-pasteable templates MUST be written as high-impact, direct, and slightly humorous ads or messages. They must be personal, benefit-driven, and have a clear, no-brainer call to action.`;
    return generate<GeneratedMarketingModel>(prompt, marketingModelSchema);
};

export const generateSalesFunnel = async (data: BusinessData): Promise<GeneratedSalesFunnel> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Design a simple, high-converting Sales Funnel. Give it a title and core principle. Detail 2-3 key stages. The 'adCopy' and 'landingPage' headlines MUST scream the biggest benefit. The body copy must use simple language, tell a story, and drive action.`;
    return generate<GeneratedSalesFunnel>(prompt, salesFunnelSchema);
};

export const generateProfitPath = async (data: BusinessData): Promise<GeneratedProfitPath> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Profit Path" of immediate upsells to maximize cash flow based on the "Crazy 8" LTV framework (upsell quantity, quality, cross-sell). Each step should have a title, a clear action, and a simple example. If there's a script, make it sound natural and not salesy, using the logical frameworks.`;
    return generate<GeneratedProfitPath>(prompt, profitPathSchema);
};

export const generateOperationsPlan = async (data: BusinessData): Promise<GeneratedOperationsPlan> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a simple Operations Plan. Define the core operational principle. Identify high-leverage outcomes and activities. Propose 1-2 key team roles needed, but describe them in terms of 'superpowers' and 'missions', not boring responsibilities. Within the daily structure or responsibilities, you MUST include a weekly 'Gametape Review' session where sales, marketing, and success teams review a customer call together to ensure alignment, as per Leila Hormozi's SOPs.`;
    return generate<GeneratedOperationsPlan>(prompt, operationsPlanSchema);
};

export const generateKpiDashboard = async (data: BusinessData): Promise<GeneratedKpiDashboard> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Business Scorecard" with the 5-7 most critical KPIs. The main KPI must be LTV:CAC. Give it a title and core principle. For each KPI, explain its importance with a simple, funny analogy.`;
    return generate<GeneratedKpiDashboard>(prompt, kpiDashboardSchema);
};

export const generateSalesSystem = async (data: BusinessData): Promise<GeneratedSalesSystem> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a complete 'Persuasion Engine' (Sales System) based on the ACQ Closer Handbook. The strategies must embody the Four Pillars of Lead Nurture. For each of the 5 core outreach methods, provide the strategy, a high-impact copy-pasteable template, and specific, clever scripts to handle 'worst-case scenario' objections using the Objection Looping framework. The copy must be world-class.`;
    return generate<GeneratedSalesSystem>(prompt, salesSystemSchema);
};

export const generateWeeklyDebrief = async (businessData: BusinessData, playbook: GeneratedPlaybook, kpiHistory: KpiEntry[]): Promise<Omit<WeeklyDebrief, 'date'>> => {
    const prompt = `${createBusinessContextPrompt(businessData)}\n
CONTEXT: You have already generated the following business playbook for the user.
PLAYBOOK:
\`\`\`json
${JSON.stringify(playbook, null, 2)}
\`\`\`
\n
CONTEXT: The user has been tracking their performance. Here are their KPI entries for the past few weeks.
KPI HISTORY:
\`\`\`json
${JSON.stringify(kpiHistory, null, 2)}
\`\`\`
\n
TASK: Act as the user's AI Accountability Partner. Your persona is encouraging, positive, and focused on building confidence.
1.  **Analyze the KPI History:** Briefly interpret the data. Find one positive trend to praise. Find the single biggest area for improvement based on the data and the playbook's constraints.
2.  **Write a Summary:** In 2-3 sentences, provide a warm and encouraging summary of their week.
3.  **Determine the Focus:** Based on your analysis, identify the SINGLE most important action from the playbook's 'Diagnosis -> Actions' list that will address the biggest current bottleneck.
Your entire response must be in the specified JSON format.
`;
    return generate<Omit<WeeklyDebrief, 'date'>>(prompt, weeklyDebriefSchema);
};


export const generateAssetContent = async (item: OfferStackItem, businessData: BusinessData): Promise<string> => {
    const prompt = `You are Hormozi AI. Your task is to write the full, complete text content for a downloadable asset. Do not provide a summary; provide the actual, ready-to-use content. Format the output in simple Markdown, using simple words, short sentences, and humor.

Business Context:
- Business Type: ${businessData.businessType}
- Target Client: ${businessData.targetClient}
- Core Offer: ${businessData.coreOffer}

Asset Details:
- Asset Name: "${item.asset.name}"
- Asset Type: ${item.asset.type}
- It solves this problem: "${item.problem}"
- As part of a solution called: "${item.solution}"

TASK: Write the full, ready-to-use content for the asset described above, making it incredibly valuable and easy to understand.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};

const generateSimpleText = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return response.text.trim();
    } catch (e) {
        console.error("AI Simple Text Generation Error:", e, "Prompt:", prompt);
        if (e instanceof Error) {
            throw new Error(`Failed to generate text: ${e.message}`);
        }
        throw new Error("An unknown error occurred during AI generation.");
    }
};

const businessDataSchema = {
    type: Type.OBJECT,
    properties: {
        country: { type: Type.STRING, description: "The country the business operates in." },
        currency: { type: Type.STRING, description: "The currency used, e.g., USD, GBP." },
        businessType: { type: Type.STRING, description: "The type of business, e.g., SaaS, Gym." },
        location: { type: Type.STRING, description: "The city and state/province." },
        monthlyRevenue: { type: Type.STRING, description: "A string representing the monthly revenue number." },
        employees: { type: Type.STRING, description: "A string representing the number of employees." },
        marketingMethods: { type: Type.STRING, description: "How the business finds customers." },
        biggestChallenge: { type: Type.STRING, description: "The main problem the business faces." },
        coreOffer: { type: Type.STRING, description: "The primary product/service and its price." },
        targetClient: { type: Type.STRING, description: "A description of the ideal customer." },
        offerTimeline: { type: Type.STRING, description: "Should be one of: 'monthly', 'quarterly', 'half_yearly', 'one_time'." },
        hasSalesTeam: { type: Type.STRING, description: "Should be 'yes' or 'no'." },
        monthlyAdSpend: { type: Type.STRING, description: "A string representing the monthly ad spend number." },
        profitGoal: { type: Type.STRING, description: "A string representing the desired monthly profit number." },
        hasCertifications: { type: Type.STRING, description: "Should be 'yes' or 'no'." },
        hasTestimonials: { type: Type.STRING, description: "Should be 'yes' or 'no'." },
        physicalCapacity: { type: Type.STRING, description: "Any physical capacity constraints." },
        ancillaryProducts: { type: Type.STRING, description: "Other products or services sold." },
        perceivedMaxPrice: { type: Type.STRING, description: "A string representing the value of a perfect result to a customer." },
        dailyTimeCommitment: { type: Type.STRING, description: "A string representing the hours per day for growth." },
        typicalDay: { type: Type.STRING, description: "A description of a typical workday." },
        businessStage: { type: Type.STRING, description: "Should be 'new' or 'existing'." },
        fundingStatus: { type: Type.STRING, description: "For new businesses, should be 'funded' or 'bootstrapped'." },
    },
};

export const autofillBusinessData = async (description: string, url?: string): Promise<Partial<BusinessData>> => {
    const prompt = `
You are an expert business analyst AI. A user has provided a description and an optional URL for their business.
Your task is to analyze this information and populate a business data form.
Provide your response as a valid JSON object matching the provided schema.
Make intelligent estimations for any missing information. If a field cannot be determined, omit it from the JSON.
For currency, infer from the country if not specified (e.g., USA -> USD, UK -> GBP).
For yes/no fields, use "yes" or "no".
For businessStage, determine if the business sounds new or existing based on the language used ("idea", "plan" vs "we have customers").
---
Business URL: ${url || 'Not provided'}
Business Description: "${escapeStringForJson(description)}"
---
TASK: Fill out the business data form based on the information above. Your response must be only the JSON object.
`;
    return generate<Partial<BusinessData>>(prompt, businessDataSchema);
};

export const generateFieldSuggestion = async (data: Partial<BusinessData>, fieldName: keyof BusinessData): Promise<string> => {
    // Sanitize data: remove empty fields to keep the prompt clean
    const contextData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value && key !== fieldName)
    );

    const fieldLabels: Record<string, string> = {
        businessType: "Business Type or Idea",
        biggestChallenge: "Biggest Challenge or Question",
        coreOffer: "Main Offer & Price (or idea)",
        targetClient: "Your Ideal Customer",
        marketingMethods: "Current or Planned Marketing",
        ancillaryProducts: "Other Items for Sale?",
        typicalDay: "Typical Workday Description"
    };

    const fieldLabel = fieldLabels[fieldName] || fieldName;

    const prompt = `
You are an AI assistant designed to help entrepreneurs brainstorm.
Based on the following business information, generate a single, concise, and creative suggestion for the field: "${fieldLabel}".

Business Information:
${JSON.stringify(contextData, null, 2)}

Your task is to provide a suggestion for the "${fieldLabel}" field.
The suggestion should be a short string, suitable for direct use in a form field.
Do not add any extra explanation, labels, or quotation marks. Just return the pure text suggestion.

Suggestion for "${fieldLabel}":
`;
    const suggestion = await generateSimpleText(prompt);
    // Sometimes the model might still return quotes, so let's strip them.
    return suggestion.replace(/^"|"$/g, '');
};


export const generateChatResponseStream = async (
    businessData: BusinessData,
    playbook: GeneratedPlaybook,
    history: ChatMessage[]
) => {
    // Convert history to a simple string format for the prompt
    const formattedHistory = history.map(msg => `${msg.role === 'user' ? 'AI' : 'USER'}: ${msg.content}`).join('\n\n');

    const prompt = `
You are Hormozi AI, an expert business consultant and world-class copywriter. You have already generated a business plan for a user. Now, you are in a chat conversation to refine that plan. Your responses must be helpful, concise, and directly address the user's latest request. You must act as a collaborative partner. Your responses should be in simple markdown and MUST adhere to all "Cashvertising" principles (simple language, benefit-driven, specific, etc.).

Here is the original business data you used:
\`\`\`json
${JSON.stringify(businessData, null, 2)}
\`\`\`

Here is the complete business plan you have generated so far. You should refer to this and modify it in your responses if the user asks you to.
\`\`\`json
${JSON.stringify(playbook, null, 2)}
\`\`\`

---
CHAT HISTORY:
${formattedHistory}
---

TASK: Based on all the context above, provide a direct and helpful response to the last user message. Keep your response conversational and focused on improving their business plan, using elite-level copywriting in your answer.
AI:
`;

    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response;
};

export const generateVideoOverviewScript = async (playbook: GeneratedPlaybook, businessData: BusinessData): Promise<string> => {
    const prompt = `
You are an expert scriptwriter for short, engaging business overview videos, trained in the direct-response style of "Cashvertising".
Based on the provided business data and playbook, create a concise and powerful voice-over script for a 60-90 second video sales letter.

Apply "Cashvertising" principles relentlessly:
- **Hook:** Use a shocking statistic, a bold promise, or an intriguing question that taps into a Life-Force 8 desire.
- **Story:** Frame the challenge and solution as a short, emotional story about the target customer's pain and their dream outcome.
- **Language:** Use simple words and Powerful Visual Adjectives (PVAs) to create a "mental movie." Be extremely specific.
- **Urgency:** End with a strong reason to act NOW (scarcity, fear of loss).
- The tone must be motivational, clear, and confident.
- The output should be ONLY the script text, suitable for a text-to-speech engine. Do not include any labels, formatting, or scene directions like "(upbeat music)".

Business Data:
${JSON.stringify(businessData, null, 2)}

Playbook (summary for script):
${JSON.stringify({
    diagnosis: playbook.diagnosis,
    offer1: playbook.offer1
}, null, 2)}

SCRIPT:
`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};

export const generateAndPollVideo = async (
    script: string,
    onProgress: (status: string, progress: number) => void
): Promise<string> => {
    try {
        onProgress("Starting video generation...", 10);
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: script,
            config: { numberOfVideos: 1 }
        });

        onProgress("Video synthesis in progress... (this can take several minutes)", 30);
        let progress = 30;
        const messages = [
            "Analyzing script and preparing scenes...",
            "Rendering visual elements...",
            "Compositing video layers...",
            "Almost there, finalizing the video..."
        ];
        let messageIndex = 0;

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
            
            progress = Math.min(90, progress + 5); 
            onProgress(messages[messageIndex % messages.length], progress);
            messageIndex++;
        }

        onProgress("Finalizing video...", 95);
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }

        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download the video. Status: ${videoResponse.status}`);
        }

        const videoBlob = await videoResponse.blob();
        onProgress("Video ready!", 100);

        return URL.createObjectURL(videoBlob);

    } catch (e) {
        console.error("Video Generation Error:", e);
        if (e instanceof Error) {
            throw new Error(`Failed to generate video: ${e.message}`);
        }
        throw new Error("An unknown error occurred during video generation.");
    }
};

export const generateAdPlaybook = async (data: BusinessData): Promise<GeneratedAdPlaybook> => {
    const prompt = `${createBusinessContextPrompt(data)}\n
CONTEXT: You are creating an advertising playbook based on Alex Hormozi's "GOATed Ads" and "Hooks" playbooks. Your task is to apply the Ad Assembly Process (Hooks, Meat, CTAs) and select 3-5 of the most relevant ad frameworks and adapt them specifically for the user's business. For each framework, you must generate multiple hooks targeting different levels of customer awareness.

TASK: Generate a complete ad playbook in the specified JSON format. Select the best 3-5 frameworks for this specific business and create all the content for them.`;
    return generate<GeneratedAdPlaybook>(prompt, adPlaybookSchema);
};
