export type SoilMetric = {
  label: string
  value: string
  detail: string
  icon: 'ph' | 'phosphorus' | 'slope' | 'deadline'
}

export type CropRecommendation = {
  name: string
  category: string
  timing: string
  image: string
  reason: string
  caveat: string
  milestones: string[]
}

import { getKnowledgeCrops, getKnowledgeScenario, knowledgeBaseInfo } from '@/lib/knowledge-base'

export const scenario = {
  eyebrow: 'TRIAL SCENARIO / VOLCANIC HIGHLANDS',
  title: 'Degraded volcanic soil, urgent nutrition needs.',
  summary:
    'A field assignment with high acidity, phosphorus locked by allophane, and severe slope erosion. The goal: protect the soil while planning for both near-term protein and a dependable starch crop.',
  metrics: [
    { label: 'Soil acidity', value: 'pH 4.6', detail: 'Strongly acidic', icon: 'ph' },
    { label: 'Available phosphorus', value: 'Low', detail: 'Allophane-bound', icon: 'phosphorus' },
    { label: 'Terrain risk', value: 'Severe', detail: 'Slope erosion', icon: 'slope' },
    { label: 'Nutrition window', value: '25 days', detail: 'Emergency protein', icon: 'deadline' },
  ] satisfies SoilMetric[],
  constraints: [
    { label: 'pH 4.6', detail: 'Acidic soil' },
    { label: 'Low P', detail: 'Allophane binding' },
    { label: 'Severe slope', detail: 'Erosion exposure' },
  ],
  crops: [
    {
      name: 'Fast legume pathway',
      category: 'Emergency protein',
      timing: '25-day window · milestone to validate',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
      reason: 'A fast-growing legume can contribute protein sooner than a root crop, while also offering a chance to add living cover. Variety, temperature, moisture, and whether “ready” means fresh pods or mature seed must be confirmed locally.',
      caveat: 'Illustrative recommendation — confirm a locally adapted, acid-tolerant variety and the harvest milestone with an agronomist.',
      milestones: ['Day 0–7 · establish cover', 'Day 8–25 · monitor fresh harvest potential', 'Mature seed · varies by variety'],
    },
    {
      name: 'Starch-root pathway',
      category: 'Long-term calories',
      timing: 'Longer horizon · not a Day 26 harvest promise',
      image: 'https://images.unsplash.com/photo-1596097635121-14b63e7e5f5f?auto=format&fit=crop&w=1200&q=85',
      reason: 'A locally proven root crop can build a more durable calorie base. The right choice depends on elevation, rainfall, planting material, disease pressure, and how well the crop fits the slope and soil-recovery plan.',
      caveat: 'Illustrative recommendation — actual maturity depends on crop, variety, climate, and field conditions.',
      milestones: ['Weeks 1–4 · establish and protect', 'Seasonal · build root mass', 'Maturity · confirm locally'],
    },
  ] satisfies CropRecommendation[],
  strategies: [
    { number: '01', title: 'Keep soil covered', icon: 'cover', short: 'Use residue, mulch, and living cover to slow raindrop impact and keep moisture in the profile.', detail: 'Prioritize materials already available on the farm. Keep the soil surface covered while avoiding competition with the establishment crop.' },
    { number: '02', title: 'Slow the slope', icon: 'slope', short: 'Contour planting, grass strips, and small barriers can interrupt runoff before it carries soil downhill.', detail: 'Walk the field with a local technician to mark safe contours. Never place structures without accounting for concentrated water flow.' },
    { number: '03', title: 'Unlock nutrients', icon: 'nutrients', short: 'Treat phosphorus availability as a soil chemistry challenge, not simply a missing-input problem.', detail: 'Use soil-test results and local recommendations to choose amendments, placement, and timing. No fixed quantities are prescribed here.' },
    { number: '04', title: 'Build living fertility', icon: 'living', short: 'Rotate crops, return organic matter, and keep roots in the soil to rebuild structure over time.', detail: 'Pair a short-term food goal with a longer recovery horizon. Track crop response, erosion, pH, and available nutrients across seasons.' },
  ],
  stages: [
    { number: '01', title: 'Observe', text: 'Map slope, runoff paths, current cover, and the most exposed soil.', detail: 'Record field position, aspect, recent rainfall, and any visible rills before choosing an intervention.' },
    { number: '02', title: 'Stabilize', text: 'Cover the soil and interrupt runoff before planting into the field.', detail: 'Use contour-aligned measures and available plant material. Keep emergency work focused on reducing soil loss.' },
    { number: '03', title: 'Establish', text: 'Plant a locally suitable protein pathway and protect its first weeks.', detail: 'Confirm seed quality, variety, planting window, moisture, and what harvest milestone the 25-day target describes.' },
    { number: '04', title: 'Recover', text: 'Measure response and build a multi-season starch and fertility plan.', detail: 'Re-test where appropriate and adjust with local guidance. A root crop is a long-term plan, not a guaranteed Day 26 outcome.' },
  ],
}

// Integration boundary: the UI consumes this adapter, not raw knowledge.json fields.
export async function getScenarioData() {
  return scenario
}

export const recommendationSource = knowledgeBaseInfo

// Keep the initial editorial shell, while replacing recommendation records with repository data.
const repositoryCrops = getKnowledgeScenario()
if (repositoryCrops.length > 0) {
  scenario.crops = repositoryCrops as typeof scenario.crops
}

export function analyzeScenario() {
  const summary = getKnowledgeScenario()
  const knowledgeCrops = getKnowledgeCrops()
  return {
    ...getScenarioData,
    summary,
    matchedRule: knowledgeCrops.length > 0 ? 'ACID_LOW_BASE + P_FIXATION_ALLOPHANE + EROSION_SEVERE' : 'No exact rule match',
    source: recommendationSource,
  }
}

export type ScenarioData = typeof scenario
export type Strategy = ScenarioData['strategies'][number]
export type Stage = ScenarioData['stages'][number]

export const knowledgeBaseBoundary = {
  getScenario: getScenarioData,
  getCropRecommendations: async () => scenario.crops,
  getRecoveryPlan: async () => ({ strategies: scenario.strategies, stages: scenario.stages }),
}
