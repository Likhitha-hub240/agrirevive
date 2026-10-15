export interface DiseaseInfo {
  name: string
  scientificAgent: string
  symptoms: string
  riskFactors: string
  curativeProtocol: string
  preventiveMeasures: string
  severity: 'critical' | 'high' | 'moderate'
}

export interface CropDiseaseMap {
  [cropName: string]: DiseaseInfo[]
}

export const cropDiseases: CropDiseaseMap = {
  Cassava: [
    {
      name: 'Cassava Mosaic Disease (CMD)',
      scientificAgent: 'Cassava mosaic begomoviruses (Vectored by Bemisia tabaci whiteflies)',
      symptoms: 'Severe chlorotic leaf mottling, leaflet distortion, stunted shoot elongation, up to 70% yield loss.',
      riskFactors: 'High whitefly populations in dry spells; infected vegetative stake planting material.',
      curativeProtocol: 'Rogue and incinerate infected plants immediately. Rogue within 48h of first symptom notice.',
      preventiveMeasures: 'Plant only certified virus-free cuttings of tolerant varieties; dip stakes in wood ash/neem solution; avoid planting near wild Ipomoea weed reservoirs.',
      severity: 'critical',
    },
    {
      name: 'Cassava Bacterial Blight (CBB)',
      scientificAgent: 'Xanthomonas axonopodis pv. manihotis',
      symptoms: 'Water-soaked angular leaf spots, sticky gum exudation on young stems, dieback of shoots.',
      riskFactors: 'Rain splashing on exposed slopes; high relative humidity and warm temperatures.',
      curativeProtocol: 'Prune blighted branch tips with sanitized shears (10% bleach dip between plants); remove and bury crop residues.',
      preventiveMeasures: 'Avoid overhead watering late in the day; space plants at 1.0 x 0.8 m to promote air circulation; use resistant clones.',
      severity: 'high',
    },
    {
      name: 'Phytophthora & Fusarium Tuber Rot',
      scientificAgent: 'Phytophthora drechsleri / Fusarium oxysporum',
      symptoms: 'Soft water-soaked tuber decay, foul odor, sudden wilting of above-ground foliage.',
      riskFactors: 'Poor drainage in pumice hollows; soil compaction; high acidity (pH < 5.0).',
      curativeProtocol: 'Excavate and destroy rotted tubers. Drench localized hole with copper oxychloride or biological Trichoderma harzianum.',
      preventiveMeasures: 'Plant on contour ridges/beds (never flat in drainage lines); lime soil to pH 5.5+ to suppress fungal spore germination; incorporate AMF inoculant.',
      severity: 'high',
    },
  ],
  'Sweet potato': [
    {
      name: 'Sweet Potato Weevil',
      scientificAgent: 'Cylas formicarius elegantulus',
      symptoms: 'Larval tunnels in stems and storage roots, dark discoloration, pungent terpene odor rendering tubers inedible.',
      riskFactors: 'Dry cracked soil allowing adult weevils direct access to tubers; continuous monocropping.',
      curativeProtocol: 'Harvest mature tubers immediately (Day 90–120). Do not leave ripe tubers in dry cracked ground.',
      preventiveMeasures: 'Mound soil around tuber crowns (earthing-up); maintain continuous living mulch to keep soil moist and crack-free; use clean apical vine tips (top 30 cm only).',
      severity: 'critical',
    },
    {
      name: 'Sweet Potato Feathery Mottle Virus (SPFMV)',
      scientificAgent: 'Potyvirus (vectored by aphids)',
      symptoms: 'Feathery purplish ring-spots on older leaves, vein clearing, stunted feeder root development.',
      riskFactors: 'Aphid vectors moving from nearby solanaceous weeds.',
      curativeProtocol: 'Rogue out stunted vines; spray organic neem seed extract (NSKE 5%) or mineral oil to deter aphid stylet transfer.',
      preventiveMeasures: 'Propagate from healthy vine nurseries; isolate new plantings from old harvested beds.',
      severity: 'moderate',
    },
  ],
  Cowpea: [
    {
      name: 'Cowpea Aphid & Mosaic Complex',
      scientificAgent: 'Aphis craccivora (Cowpea aphid-borne mosaic virus)',
      symptoms: 'Curling of young leaves, sooty mould growth from honeydew excretion, reduced pod set.',
      riskFactors: 'Warm dry weather during seedling and vegetative growth.',
      curativeProtocol: 'Foliar spray with soap solution or neem oil (3 ml/L) during early morning or late dusk.',
      preventiveMeasures: 'Intercrop between cassava rows; encourage natural predators (ladybird beetles and lacewings).',
      severity: 'moderate',
    },
    {
      name: 'Fusarium Wilt in Acid Soils',
      scientificAgent: 'Fusarium oxysporum f. sp. tracheiphilum',
      symptoms: 'Yellowing of lower leaves, dark vascular discoloration inside stem, sudden plant collapse.',
      riskFactors: 'Soil pH below 5.0; root damage from toxic aluminum (Al³⁺); lack of mycorrhizal protection.',
      curativeProtocol: 'Remove diseased plants; avoid soil disturbance that spreads spores downhill.',
      preventiveMeasures: 'Apply dolomitic lime to bring pH to 5.5–6.0; coat seeds with Rhizobium and Trichoderma biological seed dressing.',
      severity: 'high',
    },
  ],
  Taro: [
    {
      name: 'Taro Leaf Blight',
      scientificAgent: 'Phytophthora colocasiae',
      symptoms: 'Water-soaked circular lesions on leaves with yellow halos, rapid leaf rot in humid wet drains.',
      riskFactors: 'Excessive water stagnancy; high shade and warm humid microclimates.',
      curativeProtocol: 'Cut off and compost infected outer leaves away from water lines.',
      preventiveMeasures: 'Ensure drain line water keeps flowing; space taro suckers 1.0 m apart; plant tolerant Pacific cultivars.',
      severity: 'high',
    },
  ],
  Pineapple: [
    {
      name: 'Heart Rot & Root Rot',
      scientificAgent: 'Phytophthora nicotianae / P. cinnamomi',
      symptoms: 'Central young leaves turn brown and pull out easily from the stem; heart emits putrid odor.',
      riskFactors: 'Waterlogging during high rainfall on pumice slopes.',
      curativeProtocol: 'Drench affected crown with copper hydroxide; improve trench drainage immediately.',
      preventiveMeasures: 'Plant on raised beds on contour; dip planting suckers in copper fungicide before planting.',
      severity: 'high',
    },
  ],
}

export interface MonthMilestone {
  month: string
  dayRange: string
  title: string
  keyActions: string[]
  soilCheck: string
  icon: string
}

export const cultivationCalendar: MonthMilestone[] = [
  {
    month: 'Month -2',
    dayRange: 'Day -60 to -31',
    title: 'Soil Diagnostics, Liming & Erosion Netting',
    keyActions: [
      'Conduct composite soil test (pH, buffer pH, ECe, exchangeable Mg/Al, Olsen P).',
      'Broadcast 60–70% of dolomitic lime rate (2.0–4.0 t/ha CaCO₃e) under light mulch.',
      'Commence 1:2 co-composting of biochar (5–10 t/ha) with manure/compost.',
      'Staple jute netting and install 5–8 t/ha emergency straw mulch blanket.',
      'Survey contours with A-frame and plant vetiver grass slips (every 5–10 m interval).',
    ],
    soilCheck: 'Target: 100% bare soil covered; lime reaction active in moist topsoil.',
    icon: 'FlaskConical',
  },
  {
    month: 'Month -1',
    dayRange: 'Day -30 to -1',
    title: 'Contour Beds, Banded P & Inoculation Prep',
    keyActions: [
      'Construct contour beds/furrows across slope (never on fall line).',
      'Band reactive rock phosphate (250–400 kg/ha) at 10–15 cm depth.',
      'Incorporate charged biochar (5–10 t/ha) + compost into planting rows.',
      'Spot re-test soil pH: verify pH >= 5.5 before planting.',
      'Prepare AMF mycorrhizal inoculant carried on charged biochar.',
      'Prepare off-soil emergency protein trays (mung, lentil, pea shoots).',
    ],
    soilCheck: 'Target: Topsoil pH >= 5.5; allophane sorption sites locally saturated.',
    icon: 'Layers',
  },
  {
    month: 'Month 1',
    dayRange: 'Day 0 to 30',
    title: 'Planting Day 0 & Emergency Protein Relay',
    keyActions: [
      'Day 0: Plant healthy cassava stakes (1.0 x 0.8 m) with 25–50g AMF in planting hole.',
      'Day 0: Interplant sweet potato nurse vines between rows for living cover.',
      'Day 0: Sow off-soil protein trays 1 & 2; stagger new trays every 2–3 days.',
      'Day 8–12: FIRST PROTEIN HARVEST (mung & lentil sprouts).',
      'Day 10–15: First pea shoot cut (second cut at Day 18–22).',
      'Day 20–25: Amaranth leaf first cut (closes 25-day emergency protein milestone).',
      'Hand-weed only; replace any dead cassava stakes by Day 14.',
    ],
    soilCheck: 'Target: Protein secured; sweet potato ground cover >40%; cassava sprouting >=90%.',
    icon: 'Sprout',
  },
  {
    month: 'Months 2–3',
    dayRange: 'Day 31 to 90',
    title: 'Cover Closure, Banded P Sidedress & First Starch',
    keyActions: [
      'Sidedress banded phosphorus (20–30 kg P₂O₅/ha) at peak root demand (Day 45–60).',
      'Apply remaining 30–40% lime topdress if buffer pH indicates residual deficit.',
      'Verify 100% ground cover achieved by sweet potato living mulch (Day 60).',
      'Inspect vetiver lines after every storm; clear any silt accumulation.',
      'Continue staggered amaranth and cowpea leaf cuts every 7–10 days.',
      'Day 90: Optional test lift of baby sweet potatoes (first starch harvest).',
    ],
    soilCheck: 'Target: 100% vegetative ground cover; Olsen P >= 12–15 mg/kg; zero new rills.',
    icon: 'Leaf',
  },
  {
    month: 'Months 4–7',
    dayRange: 'Day 91 to 210',
    title: 'Canopy Closure, K Sidedress & Main Sweet Potato Lift',
    keyActions: [
      'Stop all nitrogen applications (excess N induces leaf growth over tubers).',
      'Sidedress potassium (60–80 kg K₂O/ha) to replenish leached pumice reserves.',
      'Harvest main sweet potato nurse crop at Day 120–150.',
      'CRITICAL: Immediately re-mulch exposed alleys and sow Mucuna/cowpea cover.',
      'Interplant taro suckers in wet drainage margins and terrace edges.',
      'Scout for cassava whitefly, mosaic virus, and stem mealybugs.',
    ],
    soilCheck: 'Target: Cassava canopy closed; slope permanently sheltered from raindrops.',
    icon: 'SunMedium',
  },
  {
    month: 'Months 8–12',
    dayRange: 'Day 211 to 365',
    title: 'Baby Lift, Main Harvest & Safe Tuber Processing',
    keyActions: [
      'Day 180–240: Test lift baby cassava tubers (1.5–2.5 kg per plant).',
      'Day 270–360: Main harvest when lower leaves yellow and tuber skins score easily.',
      'Harvest progressively in 2–3 day family batches (standing roots store for 12–18 months).',
      'MANDATORY PROCESSING (Guard G-05): Peel, chip, soak/ferment 24–48h, then boil or dry.',
      'Store dried cassava chips/flour in airtight containers (keeps 6–12 months).',
      'Day 365: Re-test soil pH and Olsen P; surface compost 3–5 t/ha for Year 2 rotation.',
    ],
    soilCheck: 'Target: Yield 15–25 t/ha first cycle; soil erosion class improved by >=1 class.',
    icon: 'CheckCircle2',
  },
]
