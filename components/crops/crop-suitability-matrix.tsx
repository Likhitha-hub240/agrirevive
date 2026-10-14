'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Filter,
  Info,
  Layers,
  Leaf,
  ShieldAlert,
  Sparkles,
  Sprout,
} from 'lucide-react'
import { DiagnosticResult } from '@/lib/knowledge-engine'

interface CropSuitabilityMatrixProps {
  diagnosis: DiagnosticResult
}

export function CropSuitabilityMatrix({ diagnosis }: CropSuitabilityMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedCrop, setExpandedCrop] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  const crops = diagnosis.recommendedCrops

  // Additional context crops from knowledge.json
  const additionalCrops = [
    {
      rank: 6,
      crop: 'Potato (Solanum tuberosum)',
      scientificName: 'Solanum tuberosum',
      role: 'Deferred High-Yield Starch (Season 2+)',
      phTolerance: '5.0 – 6.5 (Optimum: 5.5–6.0)',
      daysToFirstHarvest: '75 – 110 days',
      erosionControlRating: 'Poor on active slopes (Hilling causes severe soil wash)',
      pStrategy: 'High P demand; banded starter P mandatory',
      yieldPotential: '20 – 35 t/ha',
      score: 65,
      notes:
        'The reference Andosol crop worldwide, but strictly DEFERRED in Season 1: soil hilling destabilizes fragile pumice slopes. Plant only after liming has held pH >= 5.5 and bench terraces are built.',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=85',
      isDeferred: true,
    },
    {
      rank: 7,
      crop: 'Vetiver Grass (Chrysopogon zizanioides)',
      scientificName: 'Chrysopogon zizanioides',
      role: 'Structural Contour Hedgerow (Non-Food)',
      phTolerance: '4.5 – 9.0',
      daysToFirstHarvest: 'Permanent barrier (established Day 60)',
      erosionControlRating: 'Exceptional (90–95% sediment trap)',
      pStrategy: 'Extreme P scavenger; survives in raw pumice',
      yieldPotential: 'N/A (Structural soil conservation)',
      score: 95,
      notes:
        'Not a food crop, but the agronomic backbone of the entire system. Massive vertical root network (3–4 m deep) anchors slopes, intercepts storm runoff, and levels natural terraces over time.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
      isStructural: true,
    },
  ]

  const allDisplayCrops = [...crops, ...additionalCrops]

  const filteredCrops = allDisplayCrops.filter((c) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'starch') return c.role.toLowerCase().includes('starch')
    if (selectedCategory === 'erosion') return c.erosionControlRating.toLowerCase().includes('excellent') || c.role.toLowerCase().includes('nurse') || (c as any).isStructural
    if (selectedCategory === 'protein') return c.role.toLowerCase().includes('protein') || c.role.toLowerCase().includes('pulse')
    return true
  })

  return (
    <section id="solutions" className="scroll-mt-20 border-b border-[#dfe9d7] bg-[#edf5e5]/40 py-20 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#d5ecb6] text-[#183b2d] dark:bg-neutral-800 dark:text-[#c5e39f]">
                <Sparkles className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Comparative Evaluation
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#183b2d] sm:text-4xl dark:text-white">
              Crop Pathways &amp; Suitability Comparison
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              Evaluated specifically for degraded volcanic Andosols: separating emergency sub-25 day protein from the long-term calorie anchor, with dedicated living mulch to halt slope erosion.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#dfe9d7] bg-white p-1.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                  : 'text-[#617267] hover:text-[#183b2d] dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Card View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-[#183b2d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                  : 'text-[#617267] hover:text-[#183b2d] dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Comparison Matrix
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Ranked Crops' },
            { id: 'starch', label: 'High-Yield Starch Roots' },
            { id: 'erosion', label: 'Erosion Cover & Nurse Crops' },
            { id: 'protein', label: 'Protein Pulses & Covers' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#27583d] text-white shadow dark:bg-[#c5e39f] dark:text-[#183b2d]'
                  : 'border border-[#dfe9d7] bg-white text-[#496653] hover:bg-[#edf5e5] dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Critical Safety Callout for Cassava (Guard G-05) */}
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/80 p-4 dark:border-red-900/50 dark:bg-red-950/30">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" />
            <div className="text-xs">
              <strong className="text-red-900 dark:text-red-300">
                Safety Guard G-05 (Cassava Toxicity Warning):{' '}
              </strong>
              <span className="text-red-800 dark:text-red-200">
                Never consume raw cassava roots or leaves. Cassava contains cyanogenic glycosides: peel, chip, soak or ferment for 24–48 hours, then boil or sun-dry thoroughly before eating. In emergency food deployments, sweet/low-cyanide varieties must be prioritized.
              </span>
            </div>
          </div>
        </div>

        {/* VIEW 1: CARDS */}
        {viewMode === 'cards' && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCrops.map((c) => {
              const isExpanded = expandedCrop === c.crop
              return (
                <article
                  key={c.crop}
                  className="flex flex-col overflow-hidden rounded-3xl border border-[#dfe9d7] bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-850"
                >
                  {/* Image & Rank Badge */}
                  <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={c.image}
                      alt={c.crop}
                      className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-[#183b2d]/90 px-3 py-1 font-mono text-xs font-bold text-[#c5e39f] backdrop-blur-sm dark:bg-[#c5e39f]/90 dark:text-[#183b2d]">
                      Rank #{c.rank} · Score: {c.score}/100
                    </span>
                    <span className="absolute bottom-3 left-4 rounded-lg bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-[#183b2d] backdrop-blur-sm dark:bg-neutral-900/90 dark:text-white">
                      {c.role}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl font-bold text-[#183b2d] dark:text-white">
                      {c.crop}
                    </h3>
                    <p className="font-mono text-xs italic text-[#7c8e78] dark:text-neutral-400">
                      {c.scientificName}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
                      {c.notes}
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                      <div className="rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 dark:border-neutral-800 dark:bg-neutral-900">
                        <span className="text-[#7c8e78] dark:text-neutral-400">pH Tolerance:</span>
                        <p className="font-bold text-[#183b2d] dark:text-white">{c.phTolerance}</p>
                      </div>
                      <div className="rounded-xl border border-[#dfe9d7] bg-[#fbfcf8] p-2.5 dark:border-neutral-800 dark:bg-neutral-900">
                        <span className="text-[#7c8e78] dark:text-neutral-400">Harvest Time:</span>
                        <p className="font-bold text-[#183b2d] dark:text-white">{c.daysToFirstHarvest}</p>
                      </div>
                    </div>

                    {/* Expand Details */}
                    <div className="mt-auto pt-4">
                      <button
                        type="button"
                        onClick={() => setExpandedCrop(isExpanded ? null : c.crop)}
                        className="flex w-full items-center justify-between border-t border-[#edf1e9] pt-3 text-xs font-semibold text-[#27583d] hover:text-[#183b2d] dark:border-neutral-800 dark:text-[#c5e39f]"
                      >
                        <span>{isExpanded ? 'Hide Strategy' : 'View P & Erosion Strategy'}</span>
                        <ChevronDown className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-2 rounded-2xl bg-[#f4f8ef] p-3.5 text-xs text-[#496653] dark:bg-neutral-800 dark:text-neutral-300">
                          <div>
                            <strong className="text-[#183b2d] dark:text-white">Erosion Rating: </strong>
                            {c.erosionControlRating}
                          </div>
                          <div>
                            <strong className="text-[#183b2d] dark:text-white">Phosphorus Strategy: </strong>
                            {c.pStrategy}
                          </div>
                          <div>
                            <strong className="text-[#183b2d] dark:text-white">Yield Potential: </strong>
                            {c.yieldPotential}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* VIEW 2: COMPARISON TABLE */}
        {viewMode === 'table' && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#dfe9d7] bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-850">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#dfe9d7] bg-[#f4f8ef] font-bold text-[#183b2d] dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                  <tr>
                    <th className="p-4">Rank &amp; Crop</th>
                    <th className="p-4">Agronomic Role</th>
                    <th className="p-4">pH Tolerance</th>
                    <th className="p-4">Days to Harvest</th>
                    <th className="p-4">Yield Potential</th>
                    <th className="p-4">Erosion Control</th>
                    <th className="p-4">Phosphorus Adaptation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf1e9] dark:divide-neutral-800">
                  {filteredCrops.map((c) => (
                    <tr key={c.crop} className="hover:bg-[#fbfcf8] dark:hover:bg-neutral-800/50">
                      <td className="p-4 font-bold text-[#183b2d] dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#edf5e5] px-2 py-0.5 font-mono text-[10px] text-[#27583d] dark:bg-neutral-800 dark:text-[#c5e39f]">
                            #{c.rank}
                          </span>
                          <div>
                            <div>{c.crop}</div>
                            <div className="font-mono text-[10px] font-normal italic text-[#7c8e78]">
                              {c.scientificName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[#496653] dark:text-neutral-300">{c.role}</td>
                      <td className="p-4 font-mono font-semibold text-[#183b2d] dark:text-white">
                        {c.phTolerance}
                      </td>
                      <td className="p-4 text-[#496653] dark:text-neutral-300">{c.daysToFirstHarvest}</td>
                      <td className="p-4 font-semibold text-[#27583d] dark:text-[#c5e39f]">
                        {c.yieldPotential}
                      </td>
                      <td className="p-4 text-[#496653] dark:text-neutral-300">{c.erosionControlRating}</td>
                      <td className="p-4 text-[#496653] dark:text-neutral-300">{c.pStrategy}</td>
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
