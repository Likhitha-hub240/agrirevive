import knowledge from '@/knowledge.json'

export type KnowledgeCrop = {
  rank?: number
  crop?: string
  scientific_name?: string
  role?: string
  ph_tolerance?: string
  days_to_first_harvest?: string
  erosion_control_rating?: string
  p_strategy?: string
  score?: number
  notes?: string
}

type KnowledgeDocument = typeof knowledge & {
  crop_recommendations?: Record<string, KnowledgeCrop[]>
  scenario_input?: { measured?: { ph?: number }; constraints?: { emergency_protein_days_max?: number } }
  metadata?: { knowledge_base_id?: string; version?: string }
}

const kb = knowledge as KnowledgeDocument
const volcanicKey = 'ACID_LOW_BASE+P_FIXATION_ALLOPHANE+EROSION_SEVERE'

export const knowledgeBaseInfo = {
  id: kb.metadata?.knowledge_base_id ?? 'Repository knowledge base',
  version: kb.metadata?.version ?? 'unversioned',
  source: 'knowledge.json',
}

export function getKnowledgeCrops(conditionKey = volcanicKey): KnowledgeCrop[] {
  return kb.crop_recommendations?.[conditionKey] ?? []
}

export function getKnowledgeScenario() {
  const crops = getKnowledgeCrops()
  return crops.map((crop) => ({
    name: crop.crop ?? 'Unnamed crop',
    category: crop.role?.includes('protein') ? 'Emergency protein' : 'Long-term crop pathway',
    timing: crop.days_to_first_harvest ? `${crop.days_to_first_harvest} · knowledge-base window` : 'Timing unavailable in knowledge base',
    image: crop.crop === 'Cassava'
      ? 'https://images.unsplash.com/photo-1596097635121-14b63e7e5f5f?auto=format&fit=crop&w=1200&q=85'
      : crop.crop === 'Sweet potato'
        ? 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=85'
        : 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
    reason: `${crop.scientific_name ? `${crop.scientific_name}. ` : ''}${crop.notes ?? 'The repository provides no explanatory note for this crop.'}`,
    caveat: `Provisional ranking from ${knowledgeBaseInfo.source}. Verify variety, climate, soil tests, food safety, and the meaning of “harvest” locally.`,
    milestones: [
      crop.ph_tolerance ? `pH compatibility: ${crop.ph_tolerance}` : 'pH compatibility: Insufficient data',
      crop.erosion_control_rating ? `Erosion fit: ${crop.erosion_control_rating}` : 'Erosion fit: Insufficient data',
      typeof crop.score === 'number' ? `Knowledge-base score: ${crop.score}/100` : 'Suitability score: Insufficient data',
    ],
  }))
}

export function getKnowledgeSummary() {
  const measured = kb.scenario_input?.measured
  return {
    ph: measured?.ph ?? 4.6,
    emergencyDays: kb.scenario_input?.constraints?.emergency_protein_days_max ?? 25,
    crops: getKnowledgeCrops().length,
    source: knowledgeBaseInfo,
  }
}

export function getKnowledgeBase() {
  return kb
}

export const knowledgeBaseBoundary = {
  getCrops: getKnowledgeCrops,
  getScenario: getKnowledgeSummary,
  getDocument: getKnowledgeBase,
}
