'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Check,
  ChevronDown,
  Droplets,
  FlaskConical,
  Mountain,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Sprout,
  Waves,
} from 'lucide-react'
import {
  DiagnosticResult,
  initialScenarioParams,
  SoilInputParams,
} from '@/lib/knowledge-engine'
import { PhInteractiveScale } from './ph-interactive-scale'
import { SoilCrossSection } from './soil-cross-section'

interface SoilAnalyzerProps {
  params: SoilInputParams
  onParamsChange: (newParams: SoilInputParams) => void
  diagnosis: DiagnosticResult
}

export function SoilAnalyzer({
  params,
  onParamsChange,
  diagnosis,
}: SoilAnalyzerProps) {
  const [activeTab, setActiveTab] = useState<'inputs' | 'ph' | 'profile'>('inputs')

  const resetToTrialDefaults = () => {
    onParamsChange({ ...initialScenarioParams })
  }

  const updateParam = <K extends keyof SoilInputParams>(key: K, value: SoilInputParams[K]) => {
    onParamsChange({
      ...params,
      [key]: value,
    })
  }

  return (
    <div id="soil-analyzer-section" className="scroll-mt-24 space-y-8">
      {/* Navigation tabs between Inputs, pH Tracker, and Soil Cross-Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe9d7] pb-4 dark:border-neutral-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('inputs')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              activeTab === 'inputs'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-[#f4f8ef] text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            1. Soil Parameter Inputs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ph')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              activeTab === 'ph'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-[#f4f8ef] text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            2. Interactive pH Tracker (0–14)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'bg-[#f4f8ef] text-[#496653] hover:bg-[#edf5e5] dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            3. Animated Soil Profile &amp; Slope
          </button>
        </div>

        <button
          type="button"
          onClick={resetToTrialDefaults}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#bed4ae] bg-white px-4 py-2 text-xs font-semibold text-[#27583d] shadow-sm transition hover:bg-[#edf5e5] dark:border-neutral-700 dark:bg-neutral-800 dark:text-[#c5e39f]"
        >
          <RotateCcw className="size-3.5" />
          Reset to Terraform Trial Baseline
        </button>
      </div>

      {/* TAB 1: FORM INPUTS */}
      {activeTab === 'inputs' && (
        <div className="rounded-3xl border border-[#dfe9d7] bg-[#fbfcf8] p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Terraform Trial Baseline: Volcanic Ash &amp; High-Acid Pumice Basin
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] sm:text-3xl dark:text-white">
                Laboratory Soil Data &amp; Field Inputs
              </h3>
              <p className="mt-1 text-xs text-[#617267] dark:text-neutral-400">
                Prefilled with the official scenario trial values. Edit parameters to recalculate diagnostic rules and crop suitability instantly.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              Live Evaluation Active
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Soil pH */}
            <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
              <div className="flex items-center justify-between">
                <label htmlFor="ph-input" className="text-xs font-bold uppercase tracking-wider text-[#183b2d] dark:text-neutral-200">
                  Soil pH (1:2.5 H₂O)
                </label>
                <span className="font-mono text-sm font-bold text-rose-700 dark:text-rose-400">
                  {params.ph.toFixed(1)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                Initial: 4.6 (Strongly Acidic)
              </p>
              <input
                id="ph-input"
                type="range"
                min="0.0"
                max="14.0"
                step="0.1"
                value={params.ph}
                onChange={(e) => updateParam('ph', parseFloat(e.target.value))}
                className="mt-4 h-2 w-full cursor-pointer accent-[#27583d] dark:accent-[#c5e39f]"
              />
              <div className="mt-2 flex justify-between text-[10px] font-mono text-[#7c8e78]">
                <span>0.0</span>
                <span>4.6 (Trial)</span>
                <span>5.8 (Target)</span>
                <span>14.0</span>
              </div>
            </div>

            {/* 2. Soil Type */}
            <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
              <label htmlFor="soil-type-select" className="text-xs font-bold uppercase tracking-wider text-[#183b2d] dark:text-neutral-200">
                Soil Profile / Soil Type
              </label>
              <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                Initial: Volcanic Andosol (Pumice/Ash)
              </p>
              <select
                id="soil-type-select"
                value={params.soilType}
                onChange={(e) => updateParam('soilType', e.target.value)}
                className="mt-3 w-full rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 text-xs font-semibold text-[#183b2d] outline-none focus:ring-2 focus:ring-[#739b50] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="Volcanic Andosol (degraded pumice basin)">
                  Volcanic Andosol (Degraded Pumice Basin) — Scenario
                </option>
                <option value="Weathered Basaltic Ash">Weathered Basaltic Ash</option>
                <option value="Alluvial River Valley Loam">Alluvial River Valley Loam</option>
                <option value="Acid Ultisol / Red Clay">Acid Ultisol / Red Clay</option>
              </select>
            </div>

            {/* 3. Available Phosphorus */}
            <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
              <label htmlFor="p-status-select" className="text-xs font-bold uppercase tracking-wider text-[#183b2d] dark:text-neutral-200">
                Available Phosphorus
              </label>
              <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                Initial: Low (Allophane Binding)
              </p>
              <select
                id="p-status-select"
                value={params.phosphorusStatus}
                onChange={(e) => updateParam('phosphorusStatus', e.target.value as any)}
                className="mt-3 w-full rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 text-xs font-semibold text-[#183b2d] outline-none focus:ring-2 focus:ring-[#739b50] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="P_VERY_LOW">Very Low (&lt;10 mg/kg Olsen P) — Extreme Fixation</option>
                <option value="P_LOW">Low (10–15 mg/kg Olsen P) — Allophane Bound</option>
                <option value="P_ADEQUATE">Adequate (15–30 mg/kg) — Target State</option>
                <option value="P_HIGH">High (&gt;30 mg/kg)</option>
              </select>
            </div>

            {/* 4. Slope & Erosion Severity */}
            <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
              <label htmlFor="erosion-select" className="text-xs font-bold uppercase tracking-wider text-[#183b2d] dark:text-neutral-200">
                Slope &amp; Erosion Severity
              </label>
              <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                Initial: Severe (Active Rills on Slope)
              </p>
              <select
                id="erosion-select"
                value={params.slopeSeverity}
                onChange={(e) => updateParam('slopeSeverity', e.target.value as any)}
                className="mt-3 w-full rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 text-xs font-semibold text-[#183b2d] outline-none focus:ring-2 focus:ring-[#739b50] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="EROSION_LOW">Low (0–5% slope, &gt;70% cover)</option>
                <option value="EROSION_MODERATE">Moderate (5–15% slope, 30–70% cover)</option>
                <option value="EROSION_SEVERE">Severe (&gt;15% slope, &lt;30% cover, active rills)</option>
              </select>
            </div>

            {/* 5. Nitrogen Content */}
            <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
              <label htmlFor="n-select" className="text-xs font-bold uppercase tracking-wider text-[#183b2d] dark:text-neutral-200">
                Nitrogen Content
              </label>
              <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                Initial: Not measured
              </p>
              <select
                id="n-select"
                value={params.nitrogenStatus}
                onChange={(e) => updateParam('nitrogenStatus', e.target.value as any)}
                className="mt-3 w-full rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 text-xs font-semibold text-[#183b2d] outline-none focus:ring-2 focus:ring-[#739b50] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="not_measured">Not measured (Default) — Lab Test Required</option>
                <option value="low">Low (&lt;20 kg N/ha)</option>
                <option value="adequate">Adequate (20–40 kg N/ha)</option>
                <option value="high">High (&gt;40 kg N/ha)</option>
              </select>
            </div>

            {/* 6. Salinity (Electrical Conductivity) */}
            <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
              <label htmlFor="salinity-select" className="text-xs font-bold uppercase tracking-wider text-[#183b2d] dark:text-neutral-200">
                Salinity / Electrical Conductivity
              </label>
              <p className="mt-1 text-[11px] text-[#7c8e78] dark:text-neutral-400">
                Initial: Not measured (Assumed &lt;0.75 dS/m)
              </p>
              <select
                id="salinity-select"
                value={params.salinityEc === null ? 'not_measured' : params.salinityEc.toString()}
                onChange={(e) => {
                  const val = e.target.value
                  updateParam('salinityEc', val === 'not_measured' ? null : parseFloat(val))
                }}
                className="mt-3 w-full rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 text-xs font-semibold text-[#183b2d] outline-none focus:ring-2 focus:ring-[#739b50] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="not_measured">Not measured (Assumed Non-Saline &lt;0.75 dS/m)</option>
                <option value="0.3">Measured: 0.3 dS/m (Safely Non-Saline)</option>
                <option value="0.85">Measured: 0.85 dS/m (Saline — Triggers Guard G-01!)</option>
                <option value="2.5">Measured: 2.5 dS/m (Severe Salinity)</option>
              </select>
            </div>
          </div>

          {/* Quick Scenario Prefill Summary Bar */}
          <div className="mt-8 rounded-2xl border border-[#bed4ae] bg-[#edf5e5]/60 p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-semibold text-[#183b2d] dark:text-neutral-200">
                  Current Soil Diagnosis Match:
                </span>
                <span className="font-mono font-bold text-[#27583d] dark:text-[#c5e39f]">
                  {diagnosis.baseConditionCode} + {diagnosis.modifierCodes.join(' + ')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#617267] dark:text-neutral-400">
                  Rules Triggered: <strong className="font-mono">{diagnosis.matchedRuleIds.join(', ')}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('ph')}
                  className="font-bold text-[#27583d] underline hover:text-[#183b2d] dark:text-[#c5e39f]"
                >
                  View pH Spectrum →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE pH TRACKER */}
      {activeTab === 'ph' && (
        <PhInteractiveScale
          currentPh={params.ph}
          onPhChange={(newPh) => updateParam('ph', newPh)}
        />
      )}

      {/* TAB 3: SOIL CROSS-SECTION & SLOPE */}
      {activeTab === 'profile' && (
        <SoilCrossSection
          currentPh={params.ph}
          slopeSeverity={params.slopeSeverity}
        />
      )}
    </div>
  )
}
