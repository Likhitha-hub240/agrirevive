'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ChevronDown,
  Droplets,
  FlaskConical,
  Info,
  Leaf,
  Mountain,
  ShieldAlert,
  Sparkles,
  Sprout,
  SunMedium,
  Timer,
  Waves,
  Zap,
} from 'lucide-react'
import { DiagnosticResult, SoilInputParams } from '@/lib/knowledge-engine'

interface SoilOverviewProps {
  diagnosis: DiagnosticResult
  params: SoilInputParams
  onOpenAnalysis?: () => void
}

export function SoilOverview({ diagnosis, params, onOpenAnalysis }: SoilOverviewProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showAllGuards, setShowAllGuards] = useState(false)

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const metrics = [
    {
      id: 'ph',
      label: 'Soil Acidity',
      value: `pH ${params.ph.toFixed(1)}`,
      unit: 'pH units (1:2.5 water)',
      status: diagnosis.phClassification.label,
      statusColor:
        params.ph < 5.0
          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
          : params.ph < 5.5
          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
      icon: FlaskConical,
      short: diagnosis.phClassification.risk,
      detail:
        'Measured in 1:2.5 soil:water suspension. For precise liming, buffer pH (SMP/Kehres) must be determined in parallel to avoid 30–50% lime requirement error (Guard G-02). Target range for volcanic Andosols is pH 5.5–6.0.',
      formula: 'Diagnostic Rule D-02: Topsoil pH 4.5–5.0 matches strongly acidic low-base status.',
    },
    {
      id: 'nitrogen',
      label: 'Nitrogen Status',
      value: params.nitrogenStatus === 'not_measured' ? 'Not measured' : params.nitrogenStatus.toUpperCase(),
      unit: 'available mineral N',
      status: params.nitrogenStatus === 'not_measured' ? 'Lab Test Pending' : 'Measured',
      statusColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
      icon: Leaf,
      short:
        params.nitrogenStatus === 'not_measured'
          ? 'Field measurement absent. Do not broadcast ammonium fertilizers blindly.'
          : `Current rating: ${params.nitrogenStatus}`,
      detail:
        'Nitrogen content is deliberately displayed as "Not measured" rather than an invented value. Pre-application test is critical: ammonium-based N on unlimed volcanic ash accelerates rhizosphere acidification. Inoculated cowpea cover will provide biological N fixation (40–70 kg N/ha) safely.',
      formula: 'Documented Protocol: N status marked unmeasured until Kjeldahl/inorganic N lab analysis.',
    },
    {
      id: 'salinity',
      label: 'Salinity (ECe)',
      value: params.salinityEc === null ? 'Not measured' : `${params.salinityEc} dS/m`,
      unit: 'dS/m (saturated paste)',
      status: params.salinityEc === null ? 'Assumed Non-Saline (<0.75)' : params.salinityEc < 0.75 ? 'Non-Saline' : 'Saline - Halt!',
      statusColor:
        params.salinityEc && params.salinityEc >= 0.75
          ? 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
      icon: Waves,
      short:
        params.salinityEc === null
          ? 'Assumed non-saline (<0.75 dS/m) in degraded, heavily leached upland pumice basin.'
          : params.salinityEc >= 0.75
          ? 'Guard G-01 triggered: Salinity reclamation must precede liming!'
          : 'Safe for acid-soil amendment protocols.',
      detail:
        'Safety Guard G-01 mandates: if ECe >= 0.75 dS/m, all liming must halt until salts are leached. Leached high-altitude pumice typically exhibits very low soluble salts, allowing direct entry into the liming and phosphorus protocol.',
      formula: 'Safety Protocol G-01: EC threshold 0.75 dS/m ensures lime dissociation without salt toxicity.',
    },
    {
      id: 'phosphorus',
      label: 'Available Phosphorus',
      value: diagnosis.phosphorusClassification.label,
      unit: 'Olsen / Truog P',
      status: 'High Allophane Fixation',
      statusColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300',
      icon: Sprout,
      short: diagnosis.phosphorusClassification.action,
      detail:
        'Short-range order minerals (allophane & imogolite) possess high anion exchange capacity, rapidly sorbing orthophosphate by ligand exchange. Broadcast P is rendered 85%+ unavailable. Solution: precision banded rock phosphate + SSP starter + AMF mycorrhiza.',
      formula: 'Diagnostic Rule D-05: Modifer P_FIXATION_ALLOPHANE triggered when P is low in Andosol.',
    },
    {
      id: 'erosion',
      label: 'Erosion Risk',
      value: diagnosis.erosionClassification.label,
      unit: `${diagnosis.erosionClassification.usdaClass}`,
      status: 'Emergency Stabilisation',
      statusColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300',
      icon: Mountain,
      short: diagnosis.erosionClassification.action,
      detail:
        'Lightweight volcanic ash and pumice topsoil possess low bulk density and detach easily during high-intensity rainfall. Guard G-04 applies: install vetiver hedgerows, jute netting, and 5–8 t/ha surface mulch BEFORE any tillage or traffic.',
      formula: 'Diagnostic Rule D-06: Slope > 5% with vegetative cover < 30% triggers severe erosion status.',
    },
    {
      id: 'crops',
      label: 'Recommended Crops',
      value: `${diagnosis.recommendedCrops.length} Ranked Pathways`,
      unit: 'ranked by suitability score',
      status: 'Cassava #1 · Sweet Potato #2',
      statusColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
      icon: Sparkles,
      short: 'Ranked strategy combines long-term survival starch with rapid erosion living mulch.',
      detail:
        'Cassava (Manihot esculenta, score 91) provides acid tolerance (pH 4.3–7.8) and 12–18 month in-ground survival storage. Sweet potato (Ipomoea batatas, score 87) closes 100% ground cover by Day 45–60 while yielding first starch at Day 90–150.',
      formula: 'Suitability algorithm evaluates pH match, Al tolerance, erosion protection, and P efficiency.',
    },
    {
      id: 'harvest',
      label: 'Earliest Nutrition',
      value: '8–12 Days',
      unit: 'from Day 0 arrival',
      status: 'Sub-25 Day Guaranteed',
      statusColor: 'bg-lime-100 text-lime-800 dark:bg-lime-950/50 dark:text-lime-300',
      icon: Timer,
      short: 'Secured via decoupled off-soil legume tray relay (clean water, zero soil dependency).',
      detail:
        'By starting tray sprouts (mung bean, lentil, pea shoots) in shallow trays with clean water, edible protein is produced in 8–15 days without waiting 4–8 weeks for soil liming or exposing un-stabilised slopes to foot traffic.',
      formula: 'Decoupled Relay: Mung/lentil harvest Day 8–12, Pea shoots Day 10–15, Amaranth leaf Day 20–25.',
    },
  ]

  return (
    <section className="relative overflow-hidden border-b border-[#dfe9d7] bg-white py-12 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header with Condition Badge and Diagnosis */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#183b2d] px-3.5 py-1 text-xs font-semibold tracking-wide text-[#c5e39f] shadow-sm dark:bg-[#c5e39f] dark:text-[#183b2d]">
                <Zap className="size-3.5" /> LIVE DIAGNOSTIC ENGINE
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  diagnosis.baseSeverity === 'critical'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    : diagnosis.baseSeverity === 'high'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}
              >
                <AlertTriangle className="size-3.5" />
                Severity: {diagnosis.baseSeverity}
              </span>
              <span className="text-xs font-mono text-[#7c8e78] dark:text-neutral-400">
                Rules: {diagnosis.matchedRuleIds.join(' · ')}
              </span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#183b2d] sm:text-4xl dark:text-white">
              {diagnosis.baseConditionName}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              {diagnosis.baseConditionDefinition}
            </p>

            {/* Modifier Tags */}
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="text-xs font-medium text-[#7c8e78] self-center dark:text-neutral-400">
                Active modifiers:
              </span>
              {diagnosis.modifierNames.map((mod) => (
                <span
                  key={mod}
                  className="rounded-lg border border-[#bed4ae] bg-[#f4f8ef] px-2.5 py-1 text-xs font-medium text-[#2d5939] dark:border-neutral-700 dark:bg-neutral-800 dark:text-[#c5e39f]"
                >
                  + {mod}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenAnalysis && (
              <button
                type="button"
                onClick={onOpenAnalysis}
                className="inline-flex items-center gap-2 rounded-full border border-[#27583d] bg-white px-5 py-2.5 text-xs font-semibold text-[#183b2d] shadow-sm transition hover:bg-[#edf5e5] dark:border-[#c5e39f] dark:bg-neutral-800 dark:text-[#c5e39f] dark:hover:bg-neutral-700"
              >
                <FlaskConical className="size-4" />
                Adjust Soil Parameters
              </button>
            )}
            <a
              href="#treatments"
              className="inline-flex items-center gap-2 rounded-full bg-[#27583d] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#183b2d] dark:bg-[#c5e39f] dark:text-[#183b2d] dark:hover:bg-white"
            >
              Explore Remediation Protocol →
            </a>
          </div>
        </div>

        {/* Safety Guards Alert Banner */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 p-5 shadow-sm dark:border-amber-900/50 dark:from-amber-950/30 dark:via-neutral-900 dark:to-amber-950/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400">
                <ShieldAlert className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                    Mandatory Safety Guards ({diagnosis.activeSafetyGuards.length} Active)
                  </h3>
                  <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                    Scientific Soil Standards
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80">
                  Volcanic ash soils require strict protocol sequencing. Ignoring buffer pH or tilling steep slopes causes irreversible topsoil loss.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAllGuards(!showAllGuards)}
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-100"
            >
              {showAllGuards ? 'Show Less' : 'View All Guards'}
              <ChevronDown className={`size-4 transition-transform ${showAllGuards ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {(showAllGuards ? diagnosis.activeSafetyGuards : diagnosis.activeSafetyGuards.slice(0, 3)).map((g) => (
              <div
                key={g.id}
                className="rounded-xl border border-amber-200/70 bg-white/80 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/80"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-900 dark:text-amber-300">{g.id}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                      g.severity === 'critical'
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {g.severity}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-[#183b2d] dark:text-neutral-200">If: {g.if}</p>
                <p className="mt-1 text-[#617267] dark:text-neutral-400">{g.then}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seven Metric Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon
            const isExpanded = expandedCard === m.id
            return (
              <article
                key={m.id}
                className={`group relative rounded-2xl border transition-all duration-300 ${
                  isExpanded
                    ? 'border-[#739b50] bg-white shadow-lg ring-1 ring-[#739b50]/30 dark:border-[#c5e39f] dark:bg-neutral-800'
                    : 'border-[#dfe9d7] bg-[#fbfcf8] hover:border-[#b8cfab] hover:bg-white hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-850'
                } p-5`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-10 place-items-center rounded-xl bg-[#edf5e5] text-[#2d5939] shadow-inner transition-transform group-hover:scale-105 dark:bg-neutral-800 dark:text-[#c5e39f]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
                        {m.label}
                      </span>
                      <p className="font-serif text-2xl font-bold tracking-tight text-[#183b2d] dark:text-white">
                        {m.value}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${m.statusColor}`}>
                    {m.status}
                  </span>
                  <span className="text-[10px] text-[#7c8e78] dark:text-neutral-400">{m.unit}</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
                  {m.short}
                </p>

                {/* Expand / Learn More Toggle */}
                <div className="mt-4 border-t border-[#edf1e9] pt-3 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => toggleExpand(m.id)}
                    className="flex w-full items-center justify-between text-[11px] font-semibold text-[#345c3a] hover:text-[#183b2d] dark:text-[#c5e39f] dark:hover:text-white"
                  >
                    <span>{isExpanded ? 'Hide scientific details' : 'Scientific explanation & rule'}</span>
                    <ChevronDown className={`size-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 space-y-2 rounded-xl bg-[#f4f8ef] p-3 text-[11px] leading-relaxed text-[#496653] dark:bg-neutral-800/80 dark:text-neutral-300">
                      <p>{m.detail}</p>
                      <div className="rounded border border-[#dfe9d7] bg-white p-2 font-mono text-[10px] text-[#183b2d] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                        {m.formula}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
