'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  FileText,
  Layers,
  Leaf,
  ShieldAlert,
  Sparkles,
  Sprout,
  Target,
} from 'lucide-react'
import { getCultivationRoadmap } from '@/lib/knowledge-engine'

export function CultivationRoadmap() {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0)
  const [showMonitoringTable, setShowMonitoringTable] = useState<boolean>(false)

  const roadmap = getCultivationRoadmap()
  const activePhase = roadmap.phases[selectedPhaseIndex]

  return (
    <section id="recovery" className="scroll-mt-20 border-b border-[#dfe9d7] bg-[#fbfcf8] py-20 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#edf5e5] text-[#2d5939] dark:bg-neutral-800 dark:text-[#c5e39f]">
                <Compass className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Full Cycle Roadmap
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#183b2d] sm:text-4xl dark:text-white">
              Cultivation Journey: {roadmap.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              A 9-phase scientific roadmap taking a degraded, eroding volcanic basin from initial laboratory sampling (Day -120) through emergency protein relay, living nurse mulch, and full-season tuber storage (Day +365).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMonitoringTable(!showMonitoringTable)}
              className="inline-flex items-center gap-2 rounded-full border border-[#27583d] bg-white px-5 py-2.5 text-xs font-bold text-[#183b2d] shadow-sm transition hover:bg-[#edf5e5] dark:border-[#c5e39f] dark:bg-neutral-800 dark:text-[#c5e39f] dark:hover:bg-neutral-700"
            >
              <Target className="size-4" />
              {showMonitoringTable ? 'Hide Monitoring Matrix' : 'View 12-Month Monitoring Matrix'}
            </button>
          </div>
        </div>

        {/* Roadmap Metadata Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
            <span className="font-semibold text-[#7c8e78] dark:text-neutral-400">Target Crop</span>
            <p className="mt-1 font-serif text-base font-bold text-[#183b2d] dark:text-white">
              {roadmap.title} ({roadmap.scientificName})
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
            <span className="font-semibold text-[#7c8e78] dark:text-neutral-400">Total Horizon</span>
            <p className="mt-1 font-serif text-base font-bold text-[#183b2d] dark:text-white">
              300–365 Days <span className="text-xs font-normal text-[#617267]">(Day -120 to +365)</span>
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
            <span className="font-semibold text-[#7c8e78] dark:text-neutral-400">Planting Spacing</span>
            <p className="mt-1 font-mono text-sm font-bold text-[#27583d] dark:text-[#c5e39f]">
              {roadmap.spacing}
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
            <span className="font-semibold text-[#7c8e78] dark:text-neutral-400">Operator Skill Level</span>
            <p className="mt-1 font-serif text-base font-bold text-[#183b2d] dark:text-white">
              Beginner Friendly (Guided)
            </p>
          </div>
        </div>

        {/* 9-Phase Stepper Navigation */}
        <div className="mt-10 overflow-x-auto pb-4">
          <div className="flex min-w-[850px] items-center gap-2">
            {roadmap.phases.map((phase, idx) => {
              const isSelected = selectedPhaseIndex === idx
              return (
                <button
                  key={phase.phase}
                  type="button"
                  onClick={() => setSelectedPhaseIndex(idx)}
                  className={`flex flex-1 flex-col items-start rounded-2xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-[#27583d] bg-white shadow-md ring-2 ring-[#27583d] dark:border-[#c5e39f] dark:bg-neutral-800 dark:ring-[#c5e39f]'
                      : 'border-[#dfe9d7] bg-[#fbfcf8] hover:bg-white dark:border-neutral-800 dark:bg-neutral-850'
                  }`}
                >
                  <span className="rounded-md bg-[#edf5e5] px-2 py-0.5 font-mono text-[10px] font-bold text-[#27583d] dark:bg-neutral-700 dark:text-[#c5e39f]">
                    Phase 0{phase.phase}
                  </span>
                  <p className="mt-2 line-clamp-1 font-serif text-xs font-bold text-[#183b2d] dark:text-white">
                    {phase.name}
                  </p>
                  <p className="mt-1 text-[10px] text-[#7c8e78] dark:text-neutral-400">
                    {phase.day_range}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Phase Details Card */}
        <div className="mt-8 rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <span className="rounded-full bg-[#edf5e5] px-3 py-1 font-mono text-xs font-bold text-[#27583d] dark:bg-neutral-800 dark:text-[#c5e39f]">
                Phase {activePhase.phase} of 9 · {activePhase.day_range}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[#183b2d] sm:text-3xl dark:text-white">
                {activePhase.name}
              </h3>
            </div>

            {/* Checkpoint Badge */}
            {activePhase.checkpoint && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                <div className="font-bold">Phase Gate Checkpoint:</div>
                <div className="mt-0.5">{activePhase.checkpoint}</div>
              </div>
            )}
          </div>

          {/* Action Steps Checklist */}
          <div className="mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Action Checklist ({activePhase.steps.length} Steps)
            </h4>
            <div className="mt-4 space-y-3">
              {activePhase.steps.map((step: string, sIdx: number) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 text-xs leading-relaxed text-[#183b2d] transition hover:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  <div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#27583d] text-white dark:bg-[#c5e39f] dark:text-[#183b2d]">
                    <Check className="size-3" />
                  </div>
                  <div>{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Inputs & Targets Grid */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {/* Inputs */}
            {activePhase.inputs && (
              <div className="rounded-2xl border border-[#dfe9d7] bg-[#f4f8ef] p-5 text-xs dark:border-neutral-800 dark:bg-neutral-800">
                <span className="font-bold uppercase tracking-wider text-[#27583d] dark:text-[#c5e39f]">
                  Required Inputs &amp; Materials
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activePhase.inputs.map((inp: string, iIdx: number) => (
                    <span
                      key={iIdx}
                      className="rounded-lg border border-[#bed4ae] bg-white px-2.5 py-1 text-[11px] font-medium text-[#183b2d] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                    >
                      {inp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Targets */}
            {activePhase.targets && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-xs text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                <span className="font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Target Verification Criteria
                </span>
                <ul className="mt-3 space-y-1.5 list-inside list-disc">
                  {activePhase.targets.map((tgt: string, tIdx: number) => (
                    <li key={tIdx}>{tgt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 12-Month Monitoring Plan Table */}
        {showMonitoringTable && (
          <div className="mt-12 overflow-hidden rounded-3xl border border-[#dfe9d7] bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
            <div className="border-b border-[#dfe9d7] bg-[#f4f8ef] p-5 dark:border-neutral-800 dark:bg-neutral-800">
              <h4 className="font-serif text-lg font-bold text-[#183b2d] dark:text-white">
                Scientific Monitoring Plan (Day -120 to Day +365)
              </h4>
              <p className="mt-1 text-xs text-[#617267] dark:text-neutral-400">
                Systematic checkpoints and quantitative pass/fail criteria to ensure soil recovery and zero crop failure.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#dfe9d7] bg-[#fbfcf8] font-bold text-[#183b2d] dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                  <tr>
                    <th className="p-4">Checkpoint</th>
                    <th className="p-4">Required Verification Checks</th>
                    <th className="p-4">Pass Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf1e9] dark:divide-neutral-800">
                  {roadmap.monitoringPlan.map((m: any, mIdx: number) => (
                    <tr key={mIdx} className="hover:bg-[#fbfcf8] dark:hover:bg-neutral-800/40">
                      <td className="p-4 font-mono font-bold text-[#27583d] dark:text-[#c5e39f]">
                        {m.checkpoint}
                      </td>
                      <td className="p-4 text-[#496653] dark:text-neutral-300">
                        {m.checks.join(' · ')}
                      </td>
                      <td className="p-4 font-semibold text-emerald-800 dark:text-emerald-300">
                        {m.pass_criteria.join(' · ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
