'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronRight, FlaskConical, HelpCircle, Info, Sparkles } from 'lucide-react'
import { getPhClassification, knowledgeBase } from '@/lib/knowledge-engine'

interface PhInteractiveScaleProps {
  currentPh: number
  onPhChange: (newPh: number) => void
}

export function PhInteractiveScale({ currentPh, onPhChange }: PhInteractiveScaleProps) {
  const [hoveredPh, setHoveredPh] = useState<number | null>(null)
  const displayPh = hoveredPh !== null ? hoveredPh : currentPh
  const currentClass = getPhClassification(displayPh)

  // Ranges from knowledge.json
  const ranges = knowledgeBase.soil_parameters.ph.ranges

  // Helper to get color for pH band
  const getRangeColor = (min: number, max: number) => {
    if (max <= 4.5) return 'from-red-600 to-rose-500'
    if (max <= 5.0) return 'from-rose-500 to-orange-500' // pH 4.6 match
    if (max <= 5.5) return 'from-orange-500 to-amber-500'
    if (max <= 6.0) return 'from-emerald-500 to-green-500' // Target band (5.5-6.0)
    if (max <= 6.5) return 'from-green-500 to-teal-500'
    if (max <= 7.3) return 'from-teal-500 to-blue-500'
    if (max <= 8.4) return 'from-blue-500 to-indigo-500'
    return 'from-indigo-600 to-purple-600'
  }

  // Percentage position on 0-14 scale
  const markerPercent = Math.max(0, Math.min(100, (currentPh / 14) * 100))

  return (
    <div className="rounded-3xl border border-[#dfe9d7] bg-[#fbfcf8] p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-[#edf5e5] text-[#2d5939] dark:bg-neutral-800 dark:text-[#c5e39f]">
              <FlaskConical className="size-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Soil Chemistry Engine
            </span>
          </div>
          <h3 className="mt-2 font-serif text-2xl font-bold text-[#183b2d] sm:text-3xl dark:text-white">
            Interactive pH Spectrum &amp; Toxicity Tracker
          </h3>
          <p className="mt-1 text-xs text-[#617267] dark:text-neutral-400">
            Slide or click anywhere along the 0–14 scale to evaluate chemical implications and liming needs in real time.
          </p>
        </div>

        {/* Current Readout Badge */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#dfe9d7] bg-white p-3 shadow-inner dark:border-neutral-800 dark:bg-neutral-850">
          <div className="text-right">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
              Active Assessment
            </span>
            <p className="text-xs font-bold text-[#183b2d] dark:text-neutral-200">
              {currentClass.label}
            </p>
          </div>
          <div className="rounded-xl bg-[#183b2d] px-3.5 py-1.5 font-mono text-2xl font-bold text-[#c5e39f] shadow-sm dark:bg-[#c5e39f] dark:text-[#183b2d]">
            {currentPh.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Main pH Visual Bar (0 to 14) */}
      <div className="mt-8 space-y-3">
        {/* Region Labels */}
        <div className="grid grid-cols-3 text-center text-[11px] font-bold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
          <div className="text-left text-rose-700 dark:text-rose-400">
            Acidic Range (0 – 5.5)
          </div>
          <div className="text-emerald-700 dark:text-emerald-400">
            Target Band &amp; Mild (5.5 – 7.3)
          </div>
          <div className="text-right text-indigo-700 dark:text-indigo-400">
            Alkaline Range (7.3 – 14)
          </div>
        </div>

        {/* The Track with Gradient Segments */}
        <div className="relative h-11 w-full rounded-2xl bg-neutral-200 p-1 shadow-inner dark:bg-neutral-800">
          <div className="relative flex h-full w-full overflow-hidden rounded-xl">
            {ranges.map((r) => {
              const widthPct = ((r.max - r.min) / 14) * 100
              const isCurrent = currentPh >= r.min && currentPh < r.max
              return (
                <div
                  key={r.code}
                  onClick={() => onPhChange(Number(((r.min + r.max) / 2).toFixed(1)))}
                  onMouseEnter={() => setHoveredPh(Number(((r.min + r.max) / 2).toFixed(1)))}
                  onMouseLeave={() => setHoveredPh(null)}
                  style={{ width: `${widthPct}%` }}
                  className={`group relative h-full cursor-pointer bg-gradient-to-r ${getRangeColor(
                    r.min,
                    r.max
                  )} transition-opacity hover:opacity-100 ${isCurrent ? 'opacity-100' : 'opacity-80'}`}
                  title={`${r.label}: ${r.min}–${r.max}`}
                >
                  {/* Subtle target highlight on 5.5 - 6.0 */}
                  {r.code === 'SLIGHTLY_ACIDIC' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                      <span className="text-[9px] font-extrabold uppercase tracking-tighter text-white drop-shadow">
                        Target
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Animated Needle / Marker */}
          <div
            style={{ left: `${markerPercent}%` }}
            className="pointer-events-none absolute -top-2 bottom-[-8px] w-1 -translate-x-1/2 transition-all duration-300"
          >
            {/* Glowing marker pin */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center">
                <span className="rounded-md bg-[#183b2d] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-md dark:bg-white dark:text-[#183b2d]">
                  {currentPh.toFixed(1)}
                </span>
                <div className="size-2 rotate-45 bg-[#183b2d] dark:bg-white" />
              </div>
            </div>
            {/* Vertical Line */}
            <div className="h-full w-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] ring-2 ring-[#183b2d] dark:ring-[#c5e39f]" />
          </div>
        </div>

        {/* Tick markers */}
        <div className="relative flex justify-between px-1 text-[10px] font-mono text-[#7c8e78] dark:text-neutral-500">
          {[0, 2, 4, 4.6, 5.5, 6.0, 7.0, 8.5, 10, 12, 14].map((val) => (
            <span
              key={val}
              onClick={() => onPhChange(val)}
              className={`cursor-pointer transition-colors hover:text-[#183b2d] dark:hover:text-white ${
                val === 4.6 ? 'font-bold text-rose-600 dark:text-rose-400' : ''
              } ${val === 5.8 ? 'font-bold text-emerald-600 dark:text-emerald-400' : ''}`}
            >
              {val}
            </span>
          ))}
        </div>
      </div>

      {/* Slider Control */}
      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-[#dfe9d7] bg-white p-4 dark:border-neutral-800 dark:bg-neutral-850">
        <label htmlFor="ph-slider" className="text-xs font-semibold text-[#183b2d] dark:text-neutral-200">
          Fine-tune Soil pH:
        </label>
        <input
          id="ph-slider"
          type="range"
          min="0.0"
          max="14.0"
          step="0.1"
          value={currentPh}
          onChange={(e) => onPhChange(parseFloat(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-[#27583d] dark:accent-[#c5e39f]"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPhChange(4.6)}
            className="rounded-lg border border-[#bed4ae] bg-[#f4f8ef] px-2.5 py-1 text-xs font-semibold text-[#27583d] transition hover:bg-[#dfe9d7] dark:border-neutral-700 dark:bg-neutral-800 dark:text-[#c5e39f]"
          >
            Scenario Baseline (4.6)
          </button>
          <button
            type="button"
            onClick={() => onPhChange(5.8)}
            className="rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
          >
            Remediated Target (5.8)
          </button>
        </div>
      </div>

      {/* Scientific Diagnostics & Liming Guidance Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Card 1: Chemical & Biological Implications */}
        <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
              Agronomic Implications
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                currentClass.lime_required === true
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : currentClass.lime_required === 'optional'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}
            >
              {currentClass.lime_required === true
                ? 'Liming Required'
                : currentClass.lime_required === 'optional'
                ? 'Target Band (Optional)'
                : 'No Liming Needed'}
            </span>
          </div>

          <h4 className="mt-3 font-serif text-lg font-semibold text-[#183b2d] dark:text-white">
            {currentClass.label} (pH {currentClass.min} – {currentClass.max})
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
            {currentClass.risk}
          </p>

          <div className="mt-4 rounded-xl bg-[#f4f8ef] p-3 text-xs dark:bg-neutral-800">
            <strong className="text-[#183b2d] dark:text-white">Root &amp; Nutrient Dynamics: </strong>
            {currentPh < 5.0 ? (
              <span className="text-rose-900 dark:text-rose-300">
                Toxic soluble Al³⁺ damages root apices (stubby, blackened tips), preventing phosphorus and calcium uptake.
              </span>
            ) : currentPh <= 6.0 ? (
              <span className="text-emerald-900 dark:text-emerald-300">
                Al³⁺ is precipitated into harmless oxides; reactive phosphate rock dissolves continuously; AMF colonization is optimal.
              </span>
            ) : (
              <span className="text-amber-900 dark:text-amber-300">
                Above pH 6.5, micronutrients (Zn, Mn, Fe) precipitate and allophane anion sorption increases.
              </span>
            )}
          </div>
        </div>

        {/* Card 2: Scientific Rule & Over-liming Limitation */}
        <div className="rounded-2xl border border-[#dfe9d7] bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
              Crucial Volcanic Limitation
            </span>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Target: pH 5.5 – 6.0
            </span>
          </div>

          <h4 className="mt-3 font-serif text-lg font-semibold text-[#183b2d] dark:text-white">
            Why Neutral (pH 7.0) is NOT the Goal
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
            Standard agronomy for crystalline soils recommends liming to pH 6.5–7.0. However, <strong>volcanic Andosols behave differently:</strong> over-liming past 6.5 creates acute zinc/manganese deficiencies and halts the natural acid dissolution of reactive phosphate rock.
          </p>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            <strong>Buffer pH Rule (Guard G-02): </strong>
            Never calculate field lime tonnage from water pH alone. Volcanic ash with high organic carbon and allophane requires buffer pH measurement to avoid under-liming by 30–50%.
          </div>
        </div>
      </div>
    </div>
  )
}
