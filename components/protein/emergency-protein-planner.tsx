'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  Layers,
  Leaf,
  Plus,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react'
import { calculateProteinNeeds, knowledgeBase } from '@/lib/knowledge-engine'

export function EmergencyProteinPlanner() {
  const [peopleCount, setPeopleCount] = useState<number>(4)
  const [selectedCropRank, setSelectedCropRank] = useState<number>(1)

  const calc = calculateProteinNeeds(peopleCount)
  const crops = knowledgeBase.emergency_protein_under_25_days.crops
  const schedule = knowledgeBase.emergency_protein_under_25_days.schedule
  const foodSafety = knowledgeBase.emergency_protein_under_25_days.food_safety

  const selectedCrop = crops.find((c) => c.rank === selectedCropRank) || crops[0]

  return (
    <section id="emergency-protein" className="scroll-mt-20 border-b border-[#dfe9d7] bg-white py-20 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#edf5e5] text-[#2d5939] dark:bg-neutral-800 dark:text-[#c5e39f]">
                <Clock className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Sub-25 Day Bridge System
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#183b2d] sm:text-4xl dark:text-white">
              Emergency Protein Planning (Decoupled Off-Soil)
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              {knowledgeBase.emergency_protein_under_25_days.core_principle}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
            ✓ 0% Soil Dependency · First Harvest at Day 8
          </div>
        </div>

        {/* Dynamic Population Calculator Card */}
        <div className="mt-10 rounded-3xl border border-[#dfe9d7] bg-[#fbfcf8] p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Nutrition Unit Calculator
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
                Ration &amp; Tray Area Requirement
              </h3>
              <p className="mt-2 text-xs text-[#617267] dark:text-neutral-400">
                Adjust family or cohort size to calculate tray bench surface, seed reserves, and daily protein delivery.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <label htmlFor="people-slider" className="flex items-center gap-2 text-xs font-bold text-[#183b2d] dark:text-neutral-200">
                  <Users className="size-4" />
                  People Supported:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="people-slider"
                    type="range"
                    min="1"
                    max="30"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                    className="h-2 w-32 cursor-pointer accent-[#27583d] dark:accent-[#c5e39f]"
                  />
                  <span className="rounded-lg bg-[#183b2d] px-2.5 py-1 font-mono text-sm font-bold text-[#c5e39f] dark:bg-[#c5e39f] dark:text-[#183b2d]">
                    {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculated Metrics Grid */}
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
                  Bench Tray Area
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-[#183b2d] dark:text-white">
                  {calc.trayArea}
                </p>
                <p className="mt-1 text-[10px] text-[#7c8e78]">0.4–0.5 m² per person</p>
              </div>

              <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
                  Daily Fresh Yield
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-[#27583d] dark:text-[#c5e39f]">
                  {calc.dailyFreshHarvest}
                </p>
                <p className="mt-1 text-[10px] text-[#7c8e78]">continuous staggered cuts</p>
              </div>

              <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
                  Protein Delivery
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-[#27583d] dark:text-[#c5e39f]">
                  {calc.dailyProteinYield}
                </p>
                <p className="mt-1 text-[10px] text-[#7c8e78]">high-digestibility sprouts</p>
              </div>

              <div className="rounded-2xl border border-[#dfe9d7] bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c8e78] dark:text-neutral-400">
                  25-Day Dry Seed Stock
                </span>
                <p className="mt-1 font-mono text-lg font-bold text-[#183b2d] dark:text-white">
                  {calc.seedStockRequirement}
                </p>
                <p className="mt-1 text-[10px] text-[#7c8e78]">dry pulse storage</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Ranked Emergency Crops Selection & Detail */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Crop List */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#183b2d] dark:text-white">
              Ranked Emergency Protein Crops
            </h3>
            <p className="mt-1 text-xs text-[#617267] dark:text-neutral-400">
              Select a crop to view soaking times, cut frequency, and yield multiples.
            </p>

            <div className="mt-5 space-y-2.5">
              {crops.map((c) => (
                <button
                  key={c.crop}
                  type="button"
                  onClick={() => setSelectedCropRank(c.rank)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                    selectedCropRank === c.rank
                      ? 'border-[#27583d] bg-white shadow-md ring-1 ring-[#27583d] dark:border-[#c5e39f] dark:bg-neutral-800'
                      : 'border-[#dfe9d7] bg-[#fbfcf8] hover:bg-white dark:border-neutral-800 dark:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-xl bg-[#edf5e5] font-mono text-xs font-bold text-[#27583d] dark:bg-neutral-700 dark:text-[#c5e39f]">
                      #{c.rank}
                    </span>
                    <div>
                      <p className="font-serif text-sm font-bold text-[#183b2d] dark:text-white">
                        {c.crop}
                      </p>
                      <p className="text-[11px] text-[#7c8e78] dark:text-neutral-400">{c.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Day {c.harvest_day.min}–{c.harvest_day.max}
                    </span>
                    <p className="mt-1 text-[10px] text-[#7c8e78]">
                      {c.protein_fresh_g_per_100g}g protein/100g
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Crop Agronomic Detail Card */}
          <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-850 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                  Cultivation Spec · Rank #{selectedCrop.rank}
                </span>
                <h4 className="mt-1 font-serif text-2xl font-bold text-[#183b2d] dark:text-white">
                  {selectedCrop.crop}
                </h4>
                <p className="font-mono text-xs italic text-[#7c8e78] dark:text-neutral-400">
                  {selectedCrop.scientific_name}
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-[#27583d] dark:text-[#c5e39f]">
                  Day {selectedCrop.harvest_day.min}–{selectedCrop.harvest_day.max}
                </span>
                <p className="text-[10px] text-[#7c8e78]">first edible cut</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f4f8ef] p-4 text-xs dark:bg-neutral-800">
              <strong className="text-[#183b2d] dark:text-white">Production Method: </strong>
              <span className="text-[#496653] dark:text-neutral-300">{selectedCrop.method}</span>
            </div>

            <div className="mt-4 rounded-2xl border border-[#dfe9d7] p-4 text-xs text-[#617267] dark:border-neutral-700 dark:text-neutral-300">
              <strong className="text-[#183b2d] dark:text-white">Nutritional &amp; Agronomic Notes: </strong>
              {selectedCrop.notes}
            </div>

            {/* Day 0–25 Staggered Production Schedule */}
            <div className="mt-6 border-t border-[#edf1e9] pt-6 dark:border-neutral-800">
              <h5 className="font-serif text-sm font-bold text-[#183b2d] dark:text-white">
                25-Day Staggered Production Timeline
              </h5>
              <div className="mt-3 space-y-2">
                {schedule.map((s) => (
                  <div
                    key={s.day}
                    className="flex items-start gap-3 rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 text-xs dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <span className="rounded-md bg-[#27583d] px-2 py-0.5 font-mono text-[10px] font-bold text-white dark:bg-[#c5e39f] dark:text-[#183b2d]">
                      {s.day}
                    </span>
                    <span className="text-[#496653] dark:text-neutral-300">{s.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Safety Directives */}
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="size-4" />
                Sprout Food Safety Protocol:
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {foodSafety.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
