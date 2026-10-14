'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  Droplets,
  FlaskConical,
  Info,
  Leaf,
  Mountain,
  ShieldAlert,
  Sparkles,
  Sprout,
  Zap,
} from 'lucide-react'
import { DiagnosticResult, SoilInputParams } from '@/lib/knowledge-engine'

interface TreatmentExplorerProps {
  diagnosis: DiagnosticResult
  params: SoilInputParams
}

export function TreatmentExplorer({ diagnosis, params }: TreatmentExplorerProps) {
  const [exchangeableMg, setExchangeableMg] = useState<number>(params.exchangeableMg ?? 0.8)
  const [biocharAppliedTonnes, setBiocharAppliedTonnes] = useState<number>(5)
  const [activeTab, setActiveTab] = useState<'liming' | 'biochar' | 'phosphorus' | 'erosion' | 'timeline'>('liming')

  // Lime type decision from knowledge.json type_decision_table
  let limeType = '100% Dolomitic Lime'
  let limeAdvantage = 'Supplies essential magnesium (Mg) depleted by intense leaching in volcanic pumice.'
  let limeCaution = 'Reacts 2–3x slower than calcitic lime: specify fine grind (<=0.15 mm).'

  if (exchangeableMg > 1.5) {
    limeType = '100% Calcitic Lime (CaCO₃)'
    limeAdvantage = 'Fast acting, no Mg-K competition where magnesium is already sufficient.'
    limeCaution = 'Ensure soil Mg remains protected by organic mulch and reduced leaching.'
  } else if (exchangeableMg >= 1.0) {
    limeType = '50:50 Calcitic-Dolomitic Blend'
    limeAdvantage = 'Balanced calcium and magnesium replenishment.'
    limeCaution = 'Re-test exchangeable Mg after one cropping season.'
  }

  // Base lime rate
  const baseLimeMin = params.ph < 4.5 ? 4.0 : 2.0
  const baseLimeMax = params.ph < 4.5 ? 6.0 : 4.0

  // Biochar liming credit: 0.10 t CaCO3e per tonne biochar
  const biocharCredit = biocharAppliedTonnes * 0.1
  const netLimeMin = Math.max(0.5, baseLimeMin - biocharCredit).toFixed(1)
  const netLimeMax = Math.max(1.0, baseLimeMax - biocharCredit).toFixed(1)

  // Split calculation
  const basalMin = (parseFloat(netLimeMin) * 0.65).toFixed(1)
  const basalMax = (parseFloat(netLimeMax) * 0.65).toFixed(1)
  const topdressMin = (parseFloat(netLimeMin) * 0.35).toFixed(1)
  const topdressMax = (parseFloat(netLimeMax) * 0.35).toFixed(1)

  return (
    <section id="treatments" className="scroll-mt-20 border-b border-[#dfe9d7] bg-[#fbfcf8] py-20 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#edf5e5] text-[#2d5939] dark:bg-neutral-800 dark:text-[#c5e39f]">
                <Sprout className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Remediation Protocol
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#183b2d] sm:text-4xl dark:text-white">
              Data-Driven Treatment Exploration
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              Transforming degraded volcanic pumice into a fertile, stabilized seedbed through precision liming, charged biochar, phosphorus liberation, and contour stabilization.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe9d7] bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
              Target Soil pH
            </span>
            <p className="font-mono text-xl font-bold text-[#183b2d] dark:text-[#c5e39f]">
              pH 5.5 – 6.0 <span className="text-xs font-normal text-[#617267]">(Optimum: 5.8)</span>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-[#dfe9d7] pb-4 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab('liming')}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'liming'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-white text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            1. Precision Liming Program
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('biochar')}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'biochar'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-white text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            2. Charged Biochar Conditioning
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('phosphorus')}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'phosphorus'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-white text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            3. Phosphorus Liberation Strategy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('erosion')}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'erosion'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-white text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            4. Vetiver &amp; Slope Stabilization
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'timeline'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-white text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            5. Master Application Sequence
          </button>
        </div>

        {/* TAB 1: PRECISION LIMING CALCULATOR */}
        {activeTab === 'liming' && (
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Interactive Liming Calculator Card */}
              <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                      Precision Liming Engine
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
                      Lime Type &amp; Rate Determination
                    </h3>
                  </div>
                  <span className="rounded-xl bg-[#edf5e5] p-2.5 text-[#27583d] dark:bg-neutral-800 dark:text-[#c5e39f]">
                    <Calculator className="size-5" />
                  </span>
                </div>

                {/* Mg Slider */}
                <div className="mt-6 rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <label htmlFor="mg-slider" className="text-xs font-bold text-[#183b2d] dark:text-neutral-200">
                      Exchangeable Soil Magnesium (Mg)
                    </label>
                    <span className="font-mono text-xs font-bold text-[#27583d] dark:text-[#c5e39f]">
                      {exchangeableMg.toFixed(2)} cmol(c)/kg
                    </span>
                  </div>
                  <input
                    id="mg-slider"
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={exchangeableMg}
                    onChange={(e) => setExchangeableMg(parseFloat(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer accent-[#27583d] dark:accent-[#c5e39f]"
                  />
                  <div className="mt-2 flex justify-between text-[10px] text-[#7c8e78]">
                    <span>&lt;1.0 (Dolomitic 100%)</span>
                    <span>1.0–1.5 (50:50 Blend)</span>
                    <span>&gt;1.5 (Calcitic 100%)</span>
                  </div>
                </div>

                {/* Biochar Credit Slider */}
                <div className="mt-4 rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <label htmlFor="biochar-slider" className="text-xs font-bold text-[#183b2d] dark:text-neutral-200">
                      Co-Composted Biochar Application
                    </label>
                    <span className="font-mono text-xs font-bold text-[#27583d] dark:text-[#c5e39f]">
                      {biocharAppliedTonnes} t/ha (Credit: -{biocharCredit.toFixed(2)} t CaCO₃e)
                    </span>
                  </div>
                  <input
                    id="biochar-slider"
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={biocharAppliedTonnes}
                    onChange={(e) => setBiocharAppliedTonnes(parseInt(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer accent-[#27583d] dark:accent-[#c5e39f]"
                  />
                  <p className="mt-1 text-[10px] text-[#7c8e78] dark:text-neutral-400">
                    High-pH wood biochar credits 0.05–0.20 t CaCO₃e per dry tonne applied.
                  </p>
                </div>

                {/* Prescription Output Box */}
                <div className="mt-6 rounded-2xl border border-[#bed4ae] bg-[#edf5e5]/80 p-5 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#27583d] dark:text-[#c5e39f]">
                      Prescribed Formulation
                    </span>
                    <span className="font-mono text-sm font-bold text-[#183b2d] dark:text-white">
                      {netLimeMin} – {netLimeMax} t/ha CaCO₃e
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-lg font-bold text-[#183b2d] dark:text-white">
                    {limeType}
                  </h4>
                  <p className="mt-1 text-xs text-[#496653] dark:text-neutral-300">
                    {limeAdvantage}
                  </p>
                  <p className="mt-2 text-xs font-medium text-amber-900 dark:text-amber-300">
                    <strong>Caution: </strong>{limeCaution}
                  </p>
                </div>

                {/* Split Application Protocol */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-3 dark:border-neutral-800 dark:bg-neutral-900">
                    <span className="font-bold text-[#183b2d] dark:text-neutral-200">Basal Split (60–70%)</span>
                    <p className="mt-1 font-mono text-base font-bold text-[#27583d] dark:text-[#c5e39f]">
                      {basalMin} – {basalMax} t/ha
                    </p>
                    <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                      Day -60: Work into contour furrows or spread under mulch. Never plough on fall line.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-3 dark:border-neutral-800 dark:bg-neutral-900">
                    <span className="font-bold text-[#183b2d] dark:text-neutral-200">Topdress Split (30–40%)</span>
                    <p className="mt-1 font-mono text-base font-bold text-[#27583d] dark:text-[#c5e39f]">
                      {topdressMin} – {topdressMax} t/ha
                    </p>
                    <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                      Day +60: Apply if 45-day buffer-pH re-test still indicates an acidity deficit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rules & Critical Safety Directives Card */}
              <div className="space-y-4">
                <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 dark:border-rose-900/50 dark:bg-rose-950/30">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300">
                    <ShieldAlert className="size-5 shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Critical Liming Safety Rules
                    </h4>
                  </div>
                  <ul className="mt-4 space-y-3 text-xs leading-relaxed text-rose-950 dark:text-rose-200">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rose-700 dark:text-rose-400">1.</span>
                      <span><strong>Never mix lime with ammonium fertilizers:</strong> Rising pH triggers catastrophic ammonia volatilization (NH₃ gas loss). Maintain a minimum 14-day window.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rose-700 dark:text-rose-400">2.</span>
                      <span><strong>No fall-line tillage:</strong> On &gt;5% slopes, never mouldboard plough to incorporate lime. Distribute under mulch to prevent accelerating erosion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rose-700 dark:text-rose-400">3.</span>
                      <span><strong>Reaction horizon:</strong> Lime requires 4–8 weeks in moist soil to neutralize toxic Al³⁺. Never plant acid-sensitive crops on Day 0 of liming.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-rose-700 dark:text-rose-400">4.</span>
                      <span><strong>Do not over-lime beyond 6.5:</strong> Allophane anion sorption increases and micronutrients (Fe, Zn, Mn) lock up irreversibly.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 dark:border-neutral-800 dark:bg-neutral-850">
                  <h4 className="font-serif text-base font-bold text-[#183b2d] dark:text-white">
                    Buffer pH Method Standard
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
                    Water pH measures active acidity in soil solution only. Volcanic ash soils hold an enormous reserve of exchangeable Al and titratable H⁺ on allophane edges. Buffer pH methods (SMP, Kehres, York) account for this reserve acidity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHARGED BIOCHAR CONDITIONING */}
        {activeTab === 'biochar' && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Permanent Soil Structural Amendment
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
                Co-Composted Biochar Conditioning
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
                Volcanic ash and pumice soils exhibit weak structural stability and rapid nutrient leaching on steep gradients. Fine biochar builds stable humus-like porosity.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-semibold text-[#183b2d] dark:text-neutral-200">Recommended Rate</span>
                  <span className="font-mono font-bold text-[#27583d] dark:text-[#c5e39f]">5.0 – 10.0 t/ha</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-semibold text-[#183b2d] dark:text-neutral-200">Particle Fineness</span>
                  <span className="font-mono font-bold text-[#27583d] dark:text-[#c5e39f]">&lt; 2.0 mm (milled)</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-semibold text-[#183b2d] dark:text-neutral-200">Co-Composting Ratio</span>
                  <span className="font-mono font-bold text-[#27583d] dark:text-[#c5e39f]">1 part biochar : 2 parts compost</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-semibold text-[#183b2d] dark:text-neutral-200">Water Retention Gain</span>
                  <span className="font-mono font-bold text-[#27583d] dark:text-[#c5e39f]">+10% to +25% in pumice</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 dark:border-amber-900/50 dark:bg-amber-950/30 sm:p-8">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
                <AlertTriangle className="size-5 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Mandatory Charging Protocol (Never Apply Fresh)
                </h4>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-amber-950 dark:text-amber-200">
                Freshly pyrolyzed raw biochar acts as a sponge: it contains empty pore structures that strip existing nitrogen and phosphorus from the root zone, causing acute crop stunting.
              </p>

              <div className="mt-5 space-y-3 rounded-2xl bg-white/80 p-4 text-xs text-[#183b2d] dark:bg-neutral-850 dark:text-neutral-200">
                <div className="font-bold">2–4 Week Pre-Charging Protocol:</div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>Blend 5 t biochar with 10 t animal manure/compost or aerated compost tea.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>Allow microbial colonization to saturate all sorption sites with humic acids and base cations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>Use charged biochar as the ideal biological carrier for AMF mycorrhizal fungi.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PHOSPHORUS LIBERATION STRATEGY */}
        {activeTab === 'phosphorus' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Beating the Allophane Phosphate Sink
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
                The Three-Layer Phosphorus Liberation Strategy
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
                Broadcasting soluble phosphate on volcanic Andosols wastes 85%+ of the fertilizer as it binds irreversibly to allophane and amorphous iron/aluminum oxides. Our three-layer strategy bypasses this limitation.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {/* Layer 1: Reactive Rock Phosphate */}
                <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Layer 1 · Continuous
                    </span>
                    <span className="font-mono text-xs font-bold text-[#183b2d] dark:text-white">
                      250–400 kg/ha
                    </span>
                  </div>
                  <h4 className="mt-3 font-serif text-base font-bold text-[#183b2d] dark:text-white">
                    Reactive Rock Phosphate
                  </h4>
                  <p className="mt-2 text-xs text-[#617267] dark:text-neutral-400">
                    Finely ground (80–90% passing 0.15 mm). Naturally dissolves in acidic volcanic soil (pH 4.5–6.0), providing sustained, steady P release over 6–12 months.
                  </p>
                </div>

                {/* Layer 2: Banded Soluble Starter */}
                <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Layer 2 · Concentrated
                    </span>
                    <span className="font-mono text-xs font-bold text-[#183b2d] dark:text-white">
                      200–300 kg/ha
                    </span>
                  </div>
                  <h4 className="mt-3 font-serif text-base font-bold text-[#183b2d] dark:text-white">
                    Banded SSP / TSP Starter
                  </h4>
                  <p className="mt-2 text-xs text-[#617267] dark:text-neutral-400">
                    STRICTLY BANDED: 5 cm below and 5 cm to the side of the seed/stake. The concentrated micro-zone saturates local allophane sites, leaving free orthophosphate for early root uptake.
                  </p>
                </div>

                {/* Layer 3: AMF Mycorrhizal Inoculant */}
                <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                      Layer 3 · Biological
                    </span>
                    <span className="font-mono text-xs font-bold text-[#183b2d] dark:text-white">
                      25–50 kg/ha
                    </span>
                  </div>
                  <h4 className="mt-3 font-serif text-base font-bold text-[#183b2d] dark:text-white">
                    AMF Mycorrhizal Fungi
                  </h4>
                  <p className="mt-2 text-xs text-[#617267] dark:text-neutral-400">
                    Rhizophagus irregularis carried on charged biochar. Placed in the planting hole (20–50 g per plant). Hyphae expand the effective root absorption zone 3–10x, extracting allophane-bound P.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VETIVER & EROSION STABILIZATION */}
        {activeTab === 'erosion' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Immediate Slope Protection
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
                Vetiver Hedgerows &amp; Three-Phase Erosion Stabilization
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
                Pumice soils wash away before amendments can react unless runoff energy is dissipated. Structural hedgerows combine with organic blankets to create permanent erosion control.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 text-xs dark:border-rose-900/50 dark:bg-rose-950/20">
                  <span className="font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                    Phase 1 (Days 0–14) · Emergency Blanket
                  </span>
                  <ul className="mt-3 space-y-2 text-[#496653] dark:text-neutral-300">
                    <li>• Surface mulch: 5–8 t/ha straw and residues spread immediately.</li>
                    <li>• Staple jute/coir netting across active rill channels.</li>
                    <li>• Brush/stone check dams placed in rills to prevent headcutting.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 text-xs dark:border-amber-900/50 dark:bg-amber-950/20">
                  <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Phase 2 (Days 14–60) · Contour Hedgerows
                  </span>
                  <ul className="mt-3 space-y-2 text-[#496653] dark:text-neutral-300">
                    <li>• Survey contour lines with A-frame every 5–10 m vertical interval.</li>
                    <li>• Plant vetiver grass slips (2–3 slips/station, 0.3–0.5 m spacing).</li>
                    <li>• Interplant sweet potato living mulch between rows.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/20">
                  <span className="font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Phase 3 (Days 60–90) · Living Canopy
                  </span>
                  <ul className="mt-3 space-y-2 text-[#496653] dark:text-neutral-300">
                    <li>• Target: 100% ground cover achieved by Day 60.</li>
                    <li>• Zero inter-row tillage permitted (hand-weeding only).</li>
                    <li>• Re-mulch after storms; surface compost 5–10 t/ha to rebuild topsoil.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MASTER APPLICATION SEQUENCE */}
        {activeTab === 'timeline' && (
          <div className="mt-8 rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Protocol Chronology
            </span>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
              Application Sequence (Day -60 to Day +90)
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
              Precise chronological sequence ensuring chemical reactions, soil stabilization, and biological colonization occur in correct order.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { day: 'Day -60', action: 'Baseline lab soil test (buffer pH & EC confirmed); broadcast 60–70% dolomitic lime; commence 1:2 biochar co-composting; install 5–8 t/ha emergency mulch blanket and rill netting.' },
                { day: 'Day -45', action: 'Survey contours with A-frame; plant vetiver slips along contours; establish grassed waterways and stone check dams.' },
                { day: 'Day -30', action: 'Construct contour broad beds; band reactive rock phosphate (250–400 kg/ha); band potassium (40–60 kg K₂O/ha); incorporate charged biochar + compost into planting rows.' },
                { day: 'Day -14', action: 'Spot re-test soil pH: verify pH >= 5.5 before planting. If still <5.3, topdress remaining lime and hold planting 14 days.' },
                { day: 'Day 0', action: 'Plant cassava stakes with AMF inoculant in planting hole; interseed sweet potato nurse cover; sow emergency protein trays 1 & 2 (mung & pea shoots).' },
                { day: 'Day +12', action: 'Harvest first emergency mung/lentil sprouts; hand weed without slope disturbance.' },
                { day: 'Day +25', action: 'Harvest pea shoots (cut 2) and amaranth leaf; verify sweet potato ground cover >40%.' },
                { day: 'Day +45 to +60', action: 'Sidedress banded P (20–30 kg P₂O₅/ha); verify 100% vegetative ground cover reached.' },
              ].map((step, idx) => (
                <div
                  key={step.day}
                  className="flex items-start gap-4 rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 text-xs transition hover:bg-white hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <span className="rounded-xl bg-[#183b2d] px-3 py-1 font-mono text-xs font-bold text-[#c5e39f] dark:bg-[#c5e39f] dark:text-[#183b2d]">
                    {step.day}
                  </span>
                  <p className="leading-relaxed text-[#183b2d] dark:text-neutral-200">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
