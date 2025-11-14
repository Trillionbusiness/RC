
import { GoogleGenAI, Type, GenerateContentResponse, Content } from "@google/genai";
import { 
    BusinessData, GeneratedPlaybook, OfferStackItem, GeneratedDiagnosis, 
    GeneratedMoneyModelAnalysis, GeneratedMoneyModel, GeneratedMoneyModelMechanisms, 
    GeneratedOperationsPlan, GeneratedOffer, GeneratedDownsell, GeneratedProfitPath, 
    GeneratedMarketingModel, GeneratedSalesFunnel, GeneratedKpiDashboard, ChatMessage, GeneratedSalesSystem, KpiEntry, WeeklyDebrief, GeneratedAdPlaybook 
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

**0. Products vs. Services vs. Access**
- **Core Idea:** Business offerings fall into three categories, each with physical and digital versions. This allows for creative value-stacking.
- **Products (Stuff):** Physical (supplements) or Digital (Netflix subscription, media). These have value independent of the owner's time.
- **Services (Done for you):** Physical (massage) or Digital (marketing agency). Value is tied to labor. Harder to scale.
- **Access (Proximity):** Physical (concert tickets) or Digital (private Slack group, virtual event). The highest margin category. Sells proximity to expertise or a community.
- **Application:** The best businesses mix these. A physical product can be enhanced with a digital service. A service can be enhanced with access. A powerful, high-ticket offer often sells *access*—an individualized, high-touch version of your solution.

**1. Branding: How to Get Famous**
- **Core Idea:** Branding is pairing. You pair your business with things your ideal audience already likes (people, outcomes, values).
- **The Process:** 1) Find your ideal customer (growing, has money, easy to target, in pain). 2) Find out what they like. 3) Associate your brand with those things (content, partnerships). 4) Turn that association into a premium product people will pay more for, turning a generic item into a premium one through brand.

**2. Pricing & Lifetime Value (LTV): The "Crazy 8" & Instant Profit**
- **Core Idea:** Price to make the most *profit*, not the most sales. Raising prices is the most powerful lever for profit. The goal is LTV > 3x CAC.
- **The Crazy 8 to Increase LTV:**
  - 1. Increase Prices: The #1 profit driver.
  - 2. Decrease Costs: Offshore talent, productize services.
  - 3. Increase # of Purchases: Add recurring models, decrease churn.
  - 4. Cross-Sell: Sell something different (fries with the burger).
  - 5. Sell More (Quantity): Get them to buy more at once.
  - 6. Sell Better (Quality): Offer a premium version.
  - 7. Downsell Fewer (Quantity): Offer a smaller package to non-buyers.
  - 8. Downsell Worse (Quality): Offer a lower-quality version to non-buyers.
- **Instant Profit Plays:** Suggest these where applicable.
  - 1. Switch to 28-Day Billing Cycles (13 payments/year).
  - 2. Add Processing Fees & Get a 2nd Form of Payment (reduces churn).
  - 3. Pass on Sales Tax.
  - 4. Annual Price Increases in contracts.
  - 5. Offer Annual Billing (with a discount).
  - 6. Round Up Prices (e.g., $47 -> $49).
  - 7. Add an Annual Renewal Fee on top of monthly.
  - 8. Automatic Continuity (a low-cost subscription after a main purchase).
  - 9. Ultra High-Ticket Anchor (makes your main offer look cheap).
  - 10. Guarantee/Warranty Upsells.

**3. GOATed Ads & Hooks: How to Get Clicks**
- **Core Idea:** 90% of an ad's success is the hook (the first 3 seconds).
- **Ad Assembly Process:** Mass produce ads. 1) Write 50 Hooks. 2) Write 3-5 "Meats" (the body). 3) Record 1-3 CTAs. Combine them to make 150-750 ad variations.
- **Targeting Awareness:** Hooks must match the audience's awareness level (Unaware, Problem Aware, Solution Aware, Product Aware, Most Aware).

**4. Marketing Machine: Endless Ads from Your Customers**
- **Core Idea:** Your best marketing is the results of your customers. Turn their success into your ads.
- **System:** Create a checklist to systematically capture customer wins:
  - **Lifecycle Ads:** Record sales/onboarding/support calls to show before/during/after transformations.
  - **Social Media Scrape:** Capture every tag, mention, and positive comment.
  - **Events:** Record testimonials, get stage pictures.
  - **Reviews & Communities:** Screenshot positive reviews and comments.
  - **Competitions:** Run competitions for the best testimonial video.

**5. Lead Nurture: Getting People to Show Up**
- **Core Idea:** People who don't show, can't buy. Maximize appointment show rates.
- **The 4 Pillars:**
  - 1. **Availability:** Be open more. Offer more appointment slots.
  - 2. **Speed:** Contact leads in under 5 minutes. Schedule appointments within 3 days.
  - 3. **Personalization:** Use their name. Reference their problem. Make them feel seen.
  - 4. **Volume:** Follow up relentlessly. Double dial. Text. Email. It takes 7+ touches.

**6. Retention: How to Stop Churn**
- **Core Idea:** It's 5x cheaper to keep a customer than get a new one. Overwhelm is the #1 reason for churn, so make success simple and easy.
- **Key Actions:**
  - **Find Activation Point:** What's the one action successful customers take? Get ALL new users to do that thing ASAP.
  - **Onboard:** Your onboarding should be a tutorial on how to hit the activation point.
  - **Incentivize:** Reward them for hitting milestones, especially just after common churn points.
  - **Community:** Connect customers to each other. It's harder to leave a relationship than a membership.
  - **Exit Interviews:** Talk to people who want to cancel. You can save half of them.

**7. Leila Hormozi's Scaling SOPs:**
- **5 Star Service:** Focus on Concern, Courtesy, One & Done, Educate & Empower, Timeliness.
- **Gametape Review:** Marketing, Sales, and Success teams must review customer calls *together* weekly to stay aligned. This is a non-negotiable for operational excellence.
- **High Performance Communication:** Energy, Engagement, Exploration. Fast communication is a sign of a healthy team.

**8. Offer Creation: The Value Equation**
- **Formula:** Value = (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice).
- **Application:** To make an irresistible offer, maximize the top line and minimize the bottom line. Every part of your offer should do one of these four things.

**9. Proof: The Ultimate Differentiator**
- **Core Idea:** Your promise is not a differentiator. Your proof is. Anyone can make a claim, but only you have your results. The more compelling your proof, the less you have to "sell."
- **The Proof Hierarchy (More Compelling > Less Compelling):**
  - **In-Person > Virtual:** Seeing is believing.
  - **Live > Recorded:** Real-time proof is more powerful than a replay.
  - **Raw > Processed:** A raw iPhone video feels more real than a slick, edited one.
  - **Show > Tell:** Show the packed gym, don't just say you have lots of members.
  - **Other People > You:** A customer's words are 10x more powerful than yours.
  - **Identical to Them > Opposite of Them:** People believe testimonials from people who look and sound just like them.
  - **Personal > Generic:** "I couldn't wear anything because my thighs would chafe" is better than "I was overweight."
  - **Big Results > Small Results:** One huge, unbelievable result is better than 100 mediocre ones.
  - **Newer Proof > Older Proof:** A result from last week is better than one from last year.
  - **More Proof > Less Proof:** A "floor-to-ceiling" wall of 100s of testimonials is overwhelming...in a good way.
  - **Third Party Verification > Zero Verification:** A review on Google is more believable than one on your own site.
  - **Proof With Numbers > Proof Without Numbers:** "54.1% of users make money" is better than "lots of users make money."
  - **Metaphors > Technical Jargon:** "It's like an investment account for your business" is better than explaining SEO.
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
                        description: "A mandatory downloadable asset. CRITICAL: Based on the business's 'isDigital' status, generate one of two types of assets. (1) If 'isDigital: no', the asset is a guide FOR THE BUSINESS OWNER on how to create/deliver the service, including a '### How to Learn This' section with resources (books, courses, experts). The type MUST be 'guide'. (2) If 'isDigital: yes', the asset is a digital product FOR THE END CUSTOMER (template, checklist, script). Its content should be the full, ready-to-use text.",
                        properties: {
                            name: { type: Type.STRING, description: "The filename for the asset. For non-digital businesses, this should be like 'Guide: How to Create...'" },
                            type: { type: Type.STRING, description: "The type of asset. For non-digital businesses, this MUST be 'guide'. For digital, it can be 'template', 'framework', 'checklist', 'script', 'guide'." },
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

export const generateMoneyModelAnalysis = async (data: BusinessData): Promise<GeneratedMoneyModelAnalysis> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Analyze the business's current money model (or lack thereof) and propose a new, powerful one. Compare the 'Old Model' vs. 'New Model' using simple terms and metrics. Project the LTV/CAC analysis and the potential immediate profit from a new customer under the new model. The goal is a money-printing machine.`;
    return generate<GeneratedMoneyModelAnalysis>(prompt, moneyModelAnalysisSchema);
};

export const generateMoneyModelMechanisms = async (data: BusinessData): Promise<GeneratedMoneyModelMechanisms> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Generate a "Money Model Toolkit" using the "Crazy 8" LTV framework. Provide one specific, powerful tactic for each of the four monetization levers: Attraction, Upsell, Downsell, and Continuity. For each tactic, explain the strategy with a simple analogy, provide a concrete example tailored to this business, and give practical, funny implementation notes.`;
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
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a simple Operations Plan. Define the core operational principle. Identify high-leverage outcomes and activities. Propose 1-2 key team roles needed, but describe them in terms of 'superpowers' and 'missions', not boring responsibilities. Within the daily structure or responsibilities, you MUST include a weekly 'Gametape Review' session where sales, marketing, and success teams review a customer call together to ensure alignment.`;
    return generate<GeneratedOperationsPlan>(prompt, operationsPlanSchema);
};

export const generateKpiDashboard = async (data: BusinessData): Promise<GeneratedKpiDashboard> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a "Business Scorecard" with the 5-7 most critical KPIs. The main KPI must be LTV:CAC. Give it a title and core principle. For each KPI, explain its importance with a simple, funny analogy.`;
    return generate<GeneratedKpiDashboard>(prompt, kpiDashboardSchema);
};

export const generateSalesSystem = async (data: BusinessData): Promise<GeneratedSalesSystem> => {
    const prompt = `${createBusinessContextPrompt(data)}\nTASK: Create a complete 'Persuasion Engine' (Sales System). The strategies must embody the Four Pillars of Lead Nurture: Availability, Speed, Personalization, and Volume. For each of the 5 core outreach methods, provide the strategy, a high-impact copy-pasteable template, and specific, clever scripts to handle the absolute 'worst-case scenario' objections. The copy must be world-class.`;
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
