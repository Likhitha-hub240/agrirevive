import rawKnowledge from '../knowledge.json'

export interface SoilInputParams {
  ph: number
  soilType: string
  phosphorusStatus: 'P_VERY_LOW' | 'P_LOW' | 'P_ADEQUATE' | 'P_HIGH'
  slopeSeverity: 'EROSION_LOW' | 'EROSION_MODERATE' | 'EROSION_SEVERE'
  nitrogenStatus: 'not_measured' | 'low' | 'adequate' | 'high'
  salinityEc: number | null // null means "not measured", or dS/m
  bufferPh?: number | null
  groundCoverPct: number
  exchangeableMg?: number // cmol(c)/kg, default ~0.8 in leached pumice
  exchangeableAl?: number // cmol(c)/kg, default ~1.8 in degraded ash
}

export interface DiagnosticResult {
  baseConditionCode: string
  baseConditionName: string
  baseConditionDefinition: string
  baseSeverity: string
  modifierCodes: string[]
  modifierNames: string[]
  matchedRuleIds: string[]
  activeSafetyGuards: Array<{
    id: string
    if: string
    then: string
    severity: string
  }>
  phClassification: {
    code: string
    label: string
    min: number
    max: number
    lime_required: boolean | string
    risk: string
    note?: string
  }
  erosionClassification: {
    code: string
    label: string
    usdaClass: string
    action: string
  }
  phosphorusClassification: {
    code: string
    label: string
    action: string
    targetDps: string
  }
  recommendedCrops: Array<{
    rank: number
    crop: string
    scientificName: string
    role: string
    phTolerance: string
    daysToFirstHarvest: string
    erosionControlRating: string
    pStrategy: string
    yieldPotential: string
    score: number
    notes: string
    image?: string
  }>
  emergencyProteinSummary: {
    crops: Array<any>
    schedule: Array<any>
    corePrinciple: string
    spacePerPerson: string
  }
  remediationSummary: {
    targetPh: { min: number; max: number; optimum: number }
    limeRateCaCO3e: { min: number; max: number; unit: string }
    limeTypeRecommendation: string
    biocharRate: { min: number; max: number; unit: string }
    rockPhosphateRate: { min: number; max: number; unit: string }
    sspRate: { min: number; max: number; unit: string }
    amfRate: { min: number; max: number; unit: string }
    vetiverSpacing: string
    mulchRate: { min: number; max: number; unit: string }
  }
}

export const knowledgeBase = rawKnowledge

// Initial Terraform trial scenario defaults
export const initialScenarioParams: SoilInputParams = {
  ph: 4.6,
  soilType: 'Volcanic Andosol (degraded pumice basin)',
  phosphorusStatus: 'P_LOW',
  slopeSeverity: 'EROSION_SEVERE',
  nitrogenStatus: 'not_measured',
  salinityEc: null, // "Not measured"
  bufferPh: null,
  groundCoverPct: 15,
  exchangeableMg: 0.8,
  exchangeableAl: 1.8,
}

// Calculate pH classification from knowledge.json ranges
export function getPhClassification(ph: number) {
  const ranges = rawKnowledge.soil_parameters.ph.ranges
  for (const r of ranges) {
    if (ph >= r.min && (ph < r.max || (r.max === 14.0 && ph <= 14.0))) {
      return r
    }
  }
  return ranges[1] // fallback strongly acidic
}

// Check safety guards from knowledge.json
export function evaluateSafetyGuards(params: SoilInputParams) {
  const guards = []
  // G-01: EC >= 0.75
  if (params.salinityEc !== null && params.salinityEc >= 0.75) {
    guards.push(rawKnowledge.metadata.safety_guards[0])
  }
  // G-02: buffer_ph is not measured
  if (params.bufferPh === null || params.bufferPh === undefined) {
    guards.push(rawKnowledge.metadata.safety_guards[1])
  }
  // G-03: pH >= 5.5 and Al < 0.5
  if (params.ph >= 5.5 && (params.exchangeableAl ?? 0) < 0.5) {
    guards.push(rawKnowledge.metadata.safety_guards[2])
  }
  // G-04: slope > 25% or severe erosion
  if (params.slopeSeverity === 'EROSION_SEVERE' || params.groundCoverPct < 30) {
    guards.push(rawKnowledge.metadata.safety_guards[3])
  }
  // G-05: Cassava cyanogenic glycosides safety warning is always relevant when cassava is recommended
  guards.push(rawKnowledge.metadata.safety_guards[4])

  return guards
}

// Diagnostic rules evaluation matching knowledge.json chain
export function diagnoseSoil(params: SoilInputParams): DiagnosticResult {
  const phClass = getPhClassification(params.ph)
  const ec = params.salinityEc ?? 0.2 // default non-saline assumption if unmeasured
  const activeGuards = evaluateSafetyGuards(params)

  let baseConditionCode = 'ACID_LOW_BASE'
  let matchedRuleIds: string[] = []

  // Check diagnostic rules
  if (ec >= 0.75) {
    baseConditionCode = 'OUT_OF_SCOPE_SALINITY'
    matchedRuleIds.push('D-04')
  } else if (params.ph < 4.5) {
    baseConditionCode = 'ACID_LOW_BASE'
    matchedRuleIds.push('D-01')
  } else if (params.ph >= 4.5 && params.ph < 5.0) {
    baseConditionCode = 'ACID_LOW_BASE'
    matchedRuleIds.push('D-02') // Scenario match
  } else if (params.ph >= 5.0 && params.ph < 5.5) {
    baseConditionCode = 'ACID_LOW_BASE'
    matchedRuleIds.push('D-03')
  } else if (params.ph >= 5.5 && params.ph < 6.5) {
    baseConditionCode = 'MARGINALLY_ACIDIC'
    matchedRuleIds.push('D-07')
  } else if (params.ph >= 6.5 && params.ph <= 7.3) {
    baseConditionCode = 'HEALTHY'
    matchedRuleIds.push('D-08')
  } else {
    baseConditionCode = 'UNDIAGNOSED'
    matchedRuleIds.push('D-09')
  }

  // Modifiers
  const modifierCodes: string[] = []
  if (params.phosphorusStatus === 'P_LOW' || params.phosphorusStatus === 'P_VERY_LOW') {
    modifierCodes.push('P_FIXATION_ALLOPHANE')
    matchedRuleIds.push('D-05')
  }
  if (params.slopeSeverity === 'EROSION_SEVERE' || params.groundCoverPct < 30) {
    modifierCodes.push('EROSION_SEVERE')
    matchedRuleIds.push('D-06')
  }

  // Base condition info
  const conditionsMap = rawKnowledge.soil_conditions as Record<string, any>
  const baseConditionInfo = conditionsMap[baseConditionCode] || conditionsMap['ACID_LOW_BASE']
  const modifierNames = modifierCodes.map((c) => conditionsMap[c]?.name || c)

  // Base severity
  let baseSeverity = 'high'
  if (baseConditionCode === 'ACID_LOW_BASE') {
    baseSeverity = params.ph < 4.5 ? 'critical' : 'high'
  } else if (baseConditionCode === 'MARGINALLY_ACIDIC') {
    baseSeverity = 'low'
  } else if (baseConditionCode === 'HEALTHY') {
    baseSeverity = 'none'
  } else if (baseConditionCode === 'OUT_OF_SCOPE_SALINITY') {
    baseSeverity = 'critical'
  }

  // Crop recommendations lookup
  const cropRecsKey = [baseConditionCode, ...modifierCodes].join('+')
  const allCropRecs = rawKnowledge.crop_recommendations as Record<string, any[]>
  let cropList = allCropRecs[cropRecsKey]
  if (!cropList) {
    cropList = allCropRecs['ACID_LOW_BASE+P_FIXATION_ALLOPHANE+EROSION_SEVERE'] || allCropRecs['ACID_LOW_BASE']
  }

  // Imagery mapping for crops
  const cropImages: Record<string, string> = {
    Cassava: 'https://images.unsplash.com/photo-1596097635121-14b63e7e5f5f?auto=format&fit=crop&w=1200&q=85',
    'Sweet potato': 'https://images.unsplash.com/photo-1590165482129-1b8b27698980?auto=format&fit=crop&w=1200&q=85',
    Taro: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
    Cowpea: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
    Pineapple: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=85',
    Potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=85',
  }

  const formattedCrops = cropList.map((c: any) => ({
    rank: c.rank,
    crop: c.crop,
    scientificName: c.scientific_name,
    role: c.role,
    phTolerance: c.ph_tolerance,
    daysToFirstHarvest: c.days_to_first_harvest,
    erosionControlRating: c.erosion_control_rating || 'Standard',
    pStrategy: c.p_strategy || 'Standard placement',
    yieldPotential: c.yield_potential_t_per_ha ? `${c.yield_potential_t_per_ha} t/ha` : 'High',
    score: c.score || 85,
    notes: c.notes,
    image: cropImages[c.crop] || 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
  }))

  // Lime type recommendation based on exchangeable Mg
  const mg = params.exchangeableMg ?? 0.8
  let limeTypeRecommendation = 'Dolomitic Lime (100%) - exchangeable Mg is low (<1.0 cmol/kg) in leached pumice'
  if (mg >= 1.0 && mg <= 1.5) {
    limeTypeRecommendation = '50:50 Calcitic-Dolomitic Blend'
  } else if (mg > 1.5) {
    limeTypeRecommendation = 'Calcitic Lime (100%)'
  }

  // Erosion classification
  const erosionRanges = rawKnowledge.soil_parameters.slope_and_erosion.ranges
  const erosionClass =
    erosionRanges.find((r) => r.code === params.slopeSeverity) || erosionRanges[2]

  // Phosphorus classification
  const pRanges = rawKnowledge.soil_parameters.phosphorus_status.ranges
  const pClass = pRanges.find((r) => r.code === params.phosphorusStatus) || pRanges[1]

  return {
    baseConditionCode,
    baseConditionName: baseConditionInfo.name,
    baseConditionDefinition: baseConditionInfo.definition,
    baseSeverity,
    modifierCodes,
    modifierNames,
    matchedRuleIds,
    activeSafetyGuards: activeGuards,
    phClassification: phClass,
    erosionClassification: {
      code: erosionClass.code,
      label: erosionClass.label,
      usdaClass: erosionClass.usda_class,
      action: erosionClass.action,
    },
    phosphorusClassification: {
      code: pClass.code,
      label: pClass.label,
      action: pClass.action,
      targetDps: '15-25% (Andosols)',
    },
    recommendedCrops: formattedCrops,
    emergencyProteinSummary: {
      crops: rawKnowledge.emergency_protein_under_25_days.crops,
      schedule: rawKnowledge.emergency_protein_under_25_days.schedule,
      corePrinciple: rawKnowledge.emergency_protein_under_25_days.core_principle,
      spacePerPerson: '0.4–0.5 m² of tray area per person',
    },
    remediationSummary: {
      targetPh: rawKnowledge.remediation_treatment.liming_program.target_ph,
      limeRateCaCO3e:
        params.ph < 4.5
          ? { min: 4.0, max: 6.0, unit: 't/ha CaCO3e' }
          : { min: 2.0, max: 4.0, unit: 't/ha CaCO3e' },
      limeTypeRecommendation,
      biocharRate: rawKnowledge.remediation_treatment.biochar_program.rate,
      rockPhosphateRate:
        rawKnowledge.remediation_treatment.phosphorus_liberation_program.reactive_phosphate_rock.rate,
      sspRate:
        rawKnowledge.remediation_treatment.phosphorus_liberation_program.soluble_starter.rate,
      amfRate:
        rawKnowledge.remediation_treatment.phosphorus_liberation_program.mycorrhizal_inoculant.rate,
      vetiverSpacing:
        '1 line per 5–10 m vertical interval (5 m if slope > 15%), 2–3 slips per station at 0.3–0.5 m spacing',
      mulchRate: { min: 5.0, max: 8.0, unit: 't/ha' },
    },
  }
}

// Emergency protein calculation for variable number of people
export function calculateProteinNeeds(peopleCount: number) {
  const clampedPeople = Math.max(1, Math.min(100, peopleCount))
  const trayAreaMin = (clampedPeople * 0.4).toFixed(1)
  const trayAreaMax = (clampedPeople * 0.5).toFixed(1)
  const dailyFreshSproutsGrams = clampedPeople * 80 // avg 80g/person
  const dailyFreshProteinGrams = ((dailyFreshSproutsGrams * 3.1) / 100).toFixed(1)
  const seedStock25DaysKg = ((clampedPeople * 0.4 * 0.35 * 25) / 10).toFixed(1) // staggered pulse seeds

  return {
    peopleCount: clampedPeople,
    trayArea: `${trayAreaMin} – ${trayAreaMax} m²`,
    dailyFreshHarvest: `${dailyFreshSproutsGrams} g/day`,
    dailyProteinYield: `${dailyFreshProteinGrams} g protein/day`,
    seedStockRequirement: `${seedStock25DaysKg} kg dry pulse seed`,
    staggerFrequency: 'Sow new trays every 2–3 days (Day 0, 3, 6, 9...)',
  }
}

// Cultivation roadmap steps from knowledge base
export function getCultivationRoadmap() {
  const rm = rawKnowledge.cultivation_roadmaps[0]
  return {
    title: rm.crop,
    scientificName: rm.scientific_name,
    difficulty: rm.difficulty,
    duration: rm.total_duration_days,
    spacing: rm.spacing,
    plantingMaterial: rm.planting_material,
    phases: rm.phases,
    monitoringPlan: rawKnowledge.monitoring_plan,
  }
}
