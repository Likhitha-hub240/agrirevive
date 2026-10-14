'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Eye,
  Layers,
  Sparkles,
  Sprout,
  Waves,
} from 'lucide-react'

interface SoilCrossSectionProps {
  currentPh: number
  slopeSeverity: string
}

export function SoilCrossSection({ currentPh, slopeSeverity }: SoilCrossSectionProps) {
  const [viewState, setViewState] = useState<'degraded' | 'remediated'>('degraded')
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)

  const isDegraded = viewState === 'degraded'

  return (
    <div className="rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
      {/* Header and Toggle */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-[#edf5e5] text-[#2d5939] dark:bg-neutral-800 dark:text-[#c5e39f]">
              <Layers className="size-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Cross-Section Simulation
            </span>
          </div>
          <h3 className="mt-2 font-serif text-2xl font-bold text-[#183b2d] sm:text-3xl dark:text-white">
            Animated Volcanic Andosol Profile &amp; Slope Dynamics
          </h3>
          <p className="mt-1 text-xs text-[#617267] dark:text-neutral-400">
            Visualizing soil horizons, root-Al interaction, stormwater runoff, and allophane phosphorus binding.
          </p>
        </div>

        {/* State Toggle Buttons */}
        <div className="inline-flex rounded-2xl border border-[#dfe9d7] bg-[#f4f8ef] p-1.5 dark:border-neutral-800 dark:bg-neutral-850">
          <button
            type="button"
            onClick={() => setViewState('degraded')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              isDegraded
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-[#617267] hover:text-[#183b2d] dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="size-3.5" />
            Degraded Baseline (pH 4.6)
          </button>
          <button
            type="button"
            onClick={() => setViewState('remediated')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              !isDegraded
                ? 'bg-[#27583d] text-white shadow-sm dark:bg-[#c5e39f] dark:text-[#183b2d]'
                : 'text-[#617267] hover:text-[#183b2d] dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="size-3.5" />
            Remediated (pH 5.8 + Mulch + AMF)
          </button>
        </div>
      </div>

      {/* Interactive Animated SVG Cross-Section */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#dfe9d7] bg-gradient-to-b from-sky-50 via-amber-50/20 to-stone-100 shadow-inner dark:border-neutral-800 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        {/* Sky / Rain Atmosphere Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated raindrops */}
          <div className="absolute top-2 left-1/4 h-8 w-0.5 animate-pulse bg-sky-400/60 rotate-12" />
          <div className="absolute top-6 left-1/2 h-10 w-0.5 animate-pulse bg-sky-400/60 rotate-12 delay-100" />
          <div className="absolute top-3 left-3/4 h-7 w-0.5 animate-pulse bg-sky-400/60 rotate-12 delay-200" />
        </div>

        <svg
          viewBox="0 0 900 480"
          className="h-auto w-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for Horizons */}
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.1" />
            </linearGradient>

            {/* A Horizon (Melanic volcanic ash) */}
            <linearGradient id="aHorizonGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDegraded ? '#3e2723' : '#271c19'} />
              <stop offset="100%" stopColor="#4e342e" />
            </linearGradient>

            {/* B/C Horizon (Weathered pumice & tephra) */}
            <linearGradient id="bcHorizonGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8d6e63" />
              <stop offset="50%" stopColor="#a1887f" />
              <stop offset="100%" stopColor="#bcaaa4" />
            </linearGradient>

            {/* Bedrock / Deep pumice */}
            <linearGradient id="bedrockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d4c41" />
              <stop offset="100%" stopColor="#5d4037" />
            </linearGradient>

            {/* Water flow pattern */}
            <pattern id="rainPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10" y2="30" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" />
            </pattern>
          </defs>

          {/* SLOPE GEOMETRY (Top surface sloping down from (0, 110) to (900, 260) -> 17% grade) */}

          {/* Deep Parent Material / Tephra Base */}
          <polygon points="0,380 900,430 900,480 0,480" fill="url(#bedrockGrad)" />

          {/* B/C Horizon (Pumice & Allophane Subsoil) */}
          <polygon
            points={isDegraded ? '0,180 900,320 900,430 0,380' : '0,180 900,320 900,430 0,380'}
            fill="url(#bcHorizonGrad)"
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => setSelectedLayer('bc-horizon')}
          />

          {/* Pumice Stones & Tephra Flecks embedded in B horizon */}
          <g fill="#d7ccc8" opacity="0.6">
            <ellipse cx="120" cy="270" rx="18" ry="10" />
            <ellipse cx="260" cy="310" rx="25" ry="14" />
            <ellipse cx="440" cy="350" rx="20" ry="11" />
            <ellipse cx="620" cy="390" rx="28" ry="15" />
            <ellipse cx="780" cy="410" rx="22" ry="12" />
          </g>

          {/* A Horizon (Organic & Ash Topsoil) */}
          {/* Note: Degraded shows thin eroded profile, while remediated shows thick protected topsoil */}
          <polygon
            points={
              isDegraded
                ? '0,110 300,165 500,210 700,240 900,270 900,320 700,290 500,260 300,220 0,180'
                : '0,110 900,260 900,320 0,180'
            }
            fill="url(#aHorizonGrad)"
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => setSelectedLayer('a-horizon')}
          />

          {/* EROSION RILLS & RUNOFF (Only in Degraded state) */}
          {isDegraded && (
            <g>
              {/* Erosion gullies / rills cutting into topsoil */}
              <path
                d="M 320,168 Q 360,190 390,215 Q 430,245 470,270"
                stroke="#d32f2f"
                strokeWidth="6"
                strokeDasharray="8 4"
                fill="none"
              />
              <path
                d="M 600,225 Q 640,250 690,285"
                stroke="#d32f2f"
                strokeWidth="5"
                strokeDasharray="6 3"
                fill="none"
              />

              {/* Surface runoff arrows washing sediment */}
              <path
                d="M 120,115 L 280,145 L 480,185 L 720,230"
                stroke="#0284c7"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10 5"
              />
              <polygon points="730,232 710,222 715,238" fill="#0284c7" />

              {/* Sediment plume at base of slope */}
              <path
                d="M 720,230 Q 820,255 900,270 L 900,300 L 720,255 Z"
                fill="#8d6e63"
                opacity="0.8"
              />
              <text x="760" y="275" fill="#ffffff" fontSize="11" fontWeight="bold">
                Sediment Wash (Loss)
              </text>
            </g>
          )}

          {/* REMEDIATED SURFACE PROTECTION (Mulch blanket + Vetiver + Living Cover) */}
          {!isDegraded && (
            <g>
              {/* Mulch Blanket layer */}
              <path
                d="M 0,105 Q 450,180 900,255 L 900,262 Q 450,187 0,112 Z"
                fill="#f59e0b"
                opacity="0.9"
              />

              {/* Vetiver Grass Hedgerow at mid-slope station (Contour barrier) */}
              <g transform="translate(450, 180)">
                {/* Vetiver massive roots holding sediment */}
                <path
                  d="M 0,0 C -5,60 -15,120 -10,180 M 5,0 C 0,70 10,140 5,180 M -8,0 C -18,50 -25,110 -20,170 M 10,0 C 20,60 25,120 18,175"
                  stroke="#15803d"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* Vetiver dense above-ground grass hedge */}
                <path
                  d="M -20,0 L -15,-60 L -5,-75 L 0,-65 L 10,-78 L 18,-62 L 20,0 Z"
                  fill="#166534"
                />
                <text x="-40" y="-85" fill="#14532d" fontSize="11" fontWeight="bold">
                  Vetiver Hedgerow
                </text>
              </g>

              {/* Sweet Potato Living Mulch vines spreading on contour */}
              <path
                d="M 120,125 Q 240,150 360,168"
                stroke="#65a30d"
                strokeWidth="4"
                fill="none"
              />
              <circle cx="160" cy="132" r="5" fill="#84cc16" />
              <circle cx="240" cy="148" r="6" fill="#84cc16" />
              <circle cx="310" cy="160" r="5" fill="#84cc16" />

              {/* Infiltration arrows (water sinking into pumice, not washing) */}
              <g stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 3">
                <line x1="200" y1="135" x2="200" y2="210" />
                <line x1="600" y1="210" x2="600" y2="280" />
              </g>
              <polygon points="200,215 196,206 204,206" fill="#0284c7" />
              <polygon points="600,285 596,276 604,276" fill="#0284c7" />
              <text x="210" y="195" fill="#0369a1" fontSize="11" fontWeight="bold">
                Infiltration (Pumice Storage)
              </text>
            </g>
          )}

          {/* CROPS & ROOT ARCHITECTURE */}
          {/* Degraded State: Stunted, blackened, pruned roots under toxic Al3+ at pH 4.6 */}
          {isDegraded && (
            <g transform="translate(220, 150)">
              {/* Weak, pale shoot */}
              <path d="M 0,0 L 0,-45 L 8,-50 M 0,-30 L -12,-36" stroke="#84cc16" strokeWidth="3" fill="none" />
              <ellipse cx="8" cy="-50" rx="8" ry="4" fill="#65a30d" />
              <ellipse cx="-12" cy="-36" rx="7" ry="4" fill="#a3e635" />

              {/* Stunted stubby roots with blackened tips (Al Toxicity) */}
              <path
                d="M 0,0 L -12,25 M 0,0 L 5,20 M 0,0 L 15,22 M -12,25 L -16,35 M 5,20 L 7,28"
                stroke="#1c1917"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="-16" cy="35" r="4" fill="#991b1b" />
              <circle cx="7" cy="28" r="4" fill="#991b1b" />
              <circle cx="15" cy="22" r="3.5" fill="#991b1b" />

              {/* Callout */}
              <rect x="-110" y="45" width="130" height="34" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
              <text x="-105" y="60" fill="#991b1b" fontSize="10" fontWeight="bold">
                Al³⁺ Root Tip Blight
              </text>
              <text x="-105" y="73" fill="#b91c1c" fontSize="9">
                Stubby, pruned roots @ pH 4.6
              </text>
            </g>
          )}

          {/* Remediated State: Vigorous Cassava & Sweet Potato with deep mycorrhizal network */}
          {!isDegraded && (
            <g transform="translate(220, 145)">
              {/* Robust Cassava Shoot & Leaves */}
              <path d="M 0,0 L 0,-85" stroke="#166534" strokeWidth="5" fill="none" />
              {/* Palmate Cassava Leaves */}
              <path
                d="M 0,-85 C -20,-110 -35,-90 0,-85 C 0,-120 20,-115 0,-85 C 30,-110 35,-85 0,-85"
                fill="#15803d"
              />
              <text x="-50" y="-125" fill="#14532d" fontSize="12" fontWeight="bold">
                Cassava (Day 60+)
              </text>

              {/* Deep, extensive taproot penetrating porous pumice */}
              <path
                d="M 0,0 C -15,50 -25,120 -15,200 M 0,0 C 15,60 30,130 20,210 M 0,0 L 0,160"
                stroke="#d97706"
                strokeWidth="5"
                fill="none"
              />

              {/* AMF Mycorrhizal Hyphae Web (fine branching network) */}
              <g stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.8" fill="none">
                <path d="M -15,100 Q -40,120 -60,110 M -15,140 Q -45,160 -70,145" />
                <path d="M 15,110 Q 50,130 75,120 M 20,150 Q 55,170 80,160" />
                <path d="M 0,130 Q 20,170 0,195 Q -25,180 -10,150" />
              </g>

              {/* Callout */}
              <rect x="35" y="80" width="145" height="34" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
              <text x="42" y="95" fill="#065f46" fontSize="10" fontWeight="bold">
                AMF Mycorrhizal Hyphae
              </text>
              <text x="42" y="108" fill="#047857" fontSize="9">
                Extracts Allophane-bound P
              </text>
            </g>
          )}

          {/* CHEMICAL & NUTRIENT ION INDICATORS */}
          {/* Phosphorus locked by allophane in Degraded */}
          {isDegraded && (
            <g transform="translate(480, 290)">
              {/* Allophane mineral cage */}
              <polygon points="0,-15 15,0 0,15 -15,0" fill="#a8a29e" stroke="#78716c" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#dc2626" />
              <text x="-3" y="4" fill="#ffffff" fontSize="9" fontWeight="bold">
                P
              </text>
              <text x="22" y="4" fill="#b91c1c" fontSize="10" fontWeight="bold">
                Orthophosphate locked by allophane
              </text>
            </g>
          )}

          {/* Active Banded Phosphorus & Base Cations in Remediated */}
          {!isDegraded && (
            <g transform="translate(620, 310)">
              {/* Banded P zone */}
              <ellipse cx="0" cy="0" rx="30" ry="12" fill="#d97706" opacity="0.3" stroke="#f59e0b" strokeWidth="2" />
              <text x="-25" y="4" fill="#78350f" fontSize="10" fontWeight="bold">
                Banded P + Ca²⁺
              </text>
              {/* Mg and Ca ions */}
              <circle cx="50" cy="-10" r="10" fill="#10b981" opacity="0.8" />
              <text x="44" y="-7" fill="#ffffff" fontSize="8" fontWeight="bold">
                Mg²⁺
              </text>
              <circle cx="75" cy="5" r="10" fill="#3b82f6" opacity="0.8" />
              <text x="70" y="8" fill="#ffffff" fontSize="8" fontWeight="bold">
                Ca²⁺
              </text>
            </g>
          )}

          {/* HORIZON LABELS ON LEFT */}
          <g transform="translate(15, 80)">
            <rect x="0" y="0" width="130" height="24" rx="4" fill="#183b2d" opacity="0.85" />
            <text x="8" y="16" fill="#c5e39f" fontSize="10" fontWeight="bold">
              Slope: 17% Grade (Severe)
            </text>

            <g transform="translate(0, 70)">
              <rect x="0" y="0" width="120" height="22" rx="4" fill="#3e2723" opacity="0.9" />
              <text x="8" y="15" fill="#d7ccc8" fontSize="10" fontWeight="bold">
                A Horizon (Ash Topsoil)
              </text>
            </g>

            <g transform="translate(0, 160)">
              <rect x="0" y="0" width="135" height="22" rx="4" fill="#8d6e63" opacity="0.9" />
              <text x="8" y="15" fill="#efebe9" fontSize="10" fontWeight="bold">
                B/C Horizon (Pumice/Allophane)
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Cross-Section Explanation Badges */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
          <span className="font-bold uppercase tracking-wider text-[#7b9f45]">1. Slope &amp; Erosion</span>
          <p className="mt-1 text-[#617267] dark:text-neutral-300">
            {isDegraded
              ? 'Unprotected 17% slope suffers torrential rill erosion. Lightweight pumice topsoil washes away first.'
              : 'Vetiver contour hedges every 5m trap sediment; sweet potato living mulch creates 100% cover by Day 60.'}
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
          <span className="font-bold uppercase tracking-wider text-[#7b9f45]">2. Root Architecture</span>
          <p className="mt-1 text-[#617267] dark:text-neutral-300">
            {isDegraded
              ? 'Toxic Al³⁺ at pH 4.6 kills root growing tips, causing stubby, blackened, inefficient root systems.'
              : 'Dolomitic lime lifts pH to 5.8, precipitating Al. Roots extend deep into pumice layers with zero tip damage.'}
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
          <span className="font-bold uppercase tracking-wider text-[#7b9f45]">3. Phosphorus Binding</span>
          <p className="mt-1 text-[#617267] dark:text-neutral-300">
            {isDegraded
              ? 'Allophane minerals bind broadcast orthophosphate in tight chemical cages. Less than 15% is available.'
              : 'Strict row banding of rock phosphate + SSP saturates local sites; AMF hyphae bridge the depletion zone.'}
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe9d7] bg-[#fbfcf8] p-4 text-xs dark:border-neutral-800 dark:bg-neutral-850">
          <span className="font-bold uppercase tracking-wider text-[#7b9f45]">4. Water Hydrology</span>
          <p className="mt-1 text-[#617267] dark:text-neutral-300">
            {isDegraded
              ? 'Raindrops impact bare ash, causing crusting and violent surface runoff that carves deep gullies.'
              : '5–8 t/ha mulch dissipates raindrop energy; water infiltrates into porous pumice beds for drought reserve.'}
          </p>
        </div>
      </div>
    </div>
  )
}
