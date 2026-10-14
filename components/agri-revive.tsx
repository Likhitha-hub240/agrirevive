'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Droplets,
  FileDown,
  FlaskConical,
  Leaf,
  Menu,
  Mountain,
  Printer,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Sprout,
  SunMedium,
  Timer,
  Waves,
  X,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { scenario, type Strategy, type Stage } from '@/lib/agri-revive-data'
import {
  diagnoseSoil,
  initialScenarioParams,
  SoilInputParams,
} from '@/lib/knowledge-engine'
import { SoilOverview } from './dashboard/soil-overview'
import { SoilAnalyzer } from './analysis/soil-analyzer'
import { TreatmentExplorer } from './remediation/treatment-explorer'
import { CropSuitabilityMatrix } from './crops/crop-suitability-matrix'
import { EmergencyProteinPlanner } from './protein/emergency-protein-planner'
import { CultivationRoadmap } from './cultivation/cultivation-roadmap'

const iconMap = {
  ph: FlaskConical,
  phosphorus: Sprout,
  slope: Mountain,
  deadline: SunMedium,
  cover: Leaf,
  nutrients: FlaskConical,
  living: Sprout,
} as const

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="AgriRevive home">
      <span className="grid size-10 place-items-center rounded-full bg-[#d5ecb6] text-[#153d2b] shadow-sm dark:bg-[#c5e39f] dark:text-[#183b2d]">
        <Leaf className="size-5" />
      </span>
      <span className="font-serif text-xl font-bold tracking-tight text-[#183b2d] dark:text-white">
        Agri<span className="text-[#7b9f45] dark:text-[#c5e39f]">Revive</span>
      </span>
    </a>
  )
}

function StrategyCard({ strategy }: { strategy: Strategy }) {
  const Icon = iconMap[strategy.icon as keyof typeof iconMap] || Leaf
  return (
    <details className="group rounded-3xl border border-[#dfe9d7] bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-850">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <span className="mb-4 grid size-11 place-items-center rounded-2xl bg-[#edf5e5] text-[#587d42] shadow-inner dark:bg-neutral-800 dark:text-[#c5e39f]">
            <Icon className="size-5" />
          </span>
          <h3 className="font-serif text-xl font-bold text-[#183b2d] dark:text-white">
            {strategy.title}
          </h3>
        </div>
        <ChevronDown className="mt-2 size-5 shrink-0 text-[#7b9f45] transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-4 text-xs leading-relaxed text-[#617267] dark:text-neutral-300">
        {strategy.short}
      </p>
      <div className="mt-4 border-t border-[#edf1e9] pt-4 text-xs leading-relaxed text-[#496653] dark:border-neutral-800 dark:text-neutral-300">
        <strong className="text-[#183b2d] dark:text-white">In practice: </strong>
        {strategy.detail}
      </div>
    </details>
  )
}

export function AgriRevive() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [soilParams, setSoilParams] = useState<SoilInputParams>({ ...initialScenarioParams })

  // Live evaluation from knowledge engine
  const diagnosis = diagnoseSoil(soilParams)

  const closeMenu = () => setMenuOpen(false)

  const handlePrint = () => {
    window.print()
  }

  const scrollToAnalyzer = () => {
    const el = document.getElementById('soil-analyzer-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="top" className="min-h-screen bg-[#fbfcf8] text-[#183b2d] antialiased dark:bg-neutral-950 dark:text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e5ece0]/80 bg-[#fbfcf8]/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            <a href="#analysis" className="text-xs font-semibold uppercase tracking-wider text-[#496653] transition hover:text-[#183b2d] dark:text-neutral-300 dark:hover:text-white">
              Diagnostics
            </a>
            <a href="#treatments" className="text-xs font-semibold uppercase tracking-wider text-[#496653] transition hover:text-[#183b2d] dark:text-neutral-300 dark:hover:text-white">
              Remediation
            </a>
            <a href="#solutions" className="text-xs font-semibold uppercase tracking-wider text-[#496653] transition hover:text-[#183b2d] dark:text-neutral-300 dark:hover:text-white">
              Crop Pathways
            </a>
            <a href="#emergency-protein" className="text-xs font-semibold uppercase tracking-wider text-[#496653] transition hover:text-[#183b2d] dark:text-neutral-300 dark:hover:text-white">
              Emergency Protein (&lt;25d)
            </a>
            <a href="#recovery" className="text-xs font-semibold uppercase tracking-wider text-[#496653] transition hover:text-[#183b2d] dark:text-neutral-300 dark:hover:text-white">
              Cultivation Roadmap
            </a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              onClick={handlePrint}
              className="rounded-full border-[#dfe9d7] bg-white px-4 text-xs font-semibold text-[#183b2d] shadow-sm hover:bg-[#f4f8ef] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <Printer className="mr-1.5 size-3.5" />
              Export Report
            </Button>
            <Button asChild className="rounded-full bg-[#27583d] px-5 text-xs font-semibold text-white shadow-sm hover:bg-[#183b2d] dark:bg-[#c5e39f] dark:text-[#183b2d] dark:hover:bg-white">
              <a href="#treatments">
                Explore Solutions <ArrowRight className="ml-1 size-3.5" />
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid size-10 place-items-center rounded-full border border-[#dfe9d7] text-[#183b2d] dark:border-neutral-700 dark:text-neutral-200"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="flex flex-col gap-3 border-t border-[#e5ece0] bg-[#fbfcf8] px-6 py-6 dark:border-neutral-800 dark:bg-neutral-900 lg:hidden">
            <a onClick={closeMenu} href="#analysis" className="py-1 text-sm font-semibold text-[#183b2d] dark:text-neutral-200">
              Soil Diagnostics &amp; Dashboard
            </a>
            <a onClick={closeMenu} href="#treatments" className="py-1 text-sm font-semibold text-[#183b2d] dark:text-neutral-200">
              Treatment Exploration &amp; Liming
            </a>
            <a onClick={closeMenu} href="#solutions" className="py-1 text-sm font-semibold text-[#183b2d] dark:text-neutral-200">
              Crop Pathways &amp; Suitability
            </a>
            <a onClick={closeMenu} href="#emergency-protein" className="py-1 text-sm font-semibold text-[#183b2d] dark:text-neutral-200">
              Emergency Protein (&lt;25 Days)
            </a>
            <a onClick={closeMenu} href="#recovery" className="py-1 text-sm font-semibold text-[#183b2d] dark:text-neutral-200">
              Cultivation Roadmap (Cassava)
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90"
            alt="Lush green fields beneath a volcanic mountain range"
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#143426]/90 via-[#143426]/80 to-[#102d20]/70" />

          <div className="mx-auto flex min-h-[660px] max-w-7xl items-end px-5 pb-20 pt-32 lg:px-8 lg:pb-28">
            <div className="max-w-3xl text-white">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#c5e39f]/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#c5e39f] backdrop-blur-sm">
                  TERRAFORM TRIAL SCENARIO
                </span>
                <span className="text-xs text-white/80">
                  Volcanic Ash &amp; High-Acid Pumice Basin
                </span>
              </div>

              <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[5.25rem]">
                Reviving Life in <span className="text-[#c5e39f]">Volcanic Soils</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                From acidic ash to fertile fields — data-driven diagnostics, precision liming, allophane phosphorus liberation, emergency protein within 25 days, and long-term starch cultivation.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full bg-[#c5e39f] px-6 text-sm font-bold text-[#183b2d] shadow-lg hover:bg-white">
                  <a href="#analysis">
                    Analyze Soil (pH {soilParams.ph.toFixed(1)}) <FlaskConical className="ml-1.5 size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/60 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm hover:bg-white hover:text-[#183b2d]">
                  <a href="#treatments">
                    Explore Solutions <ArrowRight className="ml-1.5 size-4" />
                  </a>
                </Button>
              </div>

              {/* Quick Baseline Indicators on Hero */}
              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60">Soil pH</span>
                  <p className="font-mono text-xl font-bold text-[#c5e39f]">4.6</p>
                  <span className="text-[10px] text-white/70">Strongly Acidic</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60">Phosphorus</span>
                  <p className="font-mono text-xl font-bold text-[#c5e39f]">Low</p>
                  <span className="text-[10px] text-white/70">Allophane-bound</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60">Slope Erosion</span>
                  <p className="font-mono text-xl font-bold text-[#c5e39f]">Severe</p>
                  <span className="text-[10px] text-white/70">Active Rills</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60">Emergency Protein</span>
                  <p className="font-mono text-xl font-bold text-[#c5e39f]">&lt; 25 Days</p>
                  <span className="text-[10px] text-white/70">Off-Soil Tray Relay</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. ANIMATED DASHBOARD & LIVE DIAGNOSIS OVERVIEW */}
        <section id="analysis" className="scroll-mt-20">
          <SoilOverview
            diagnosis={diagnosis}
            params={soilParams}
            onOpenAnalysis={scrollToAnalyzer}
          />
        </section>

        {/* 2. INTERACTIVE SOIL ANALYSIS & pH TRACKER */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <SoilAnalyzer
            params={soilParams}
            onParamsChange={(newParams) => setSoilParams(newParams)}
            diagnosis={diagnosis}
          />
        </section>

        {/* 3. UNDERSTANDING THE CHALLENGE (Preserved & Enhanced) */}
        <section id="challenge" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85"
              alt="Volcanic farmland with green crops and mountain backdrop"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#173c2b]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-[#173c2b]/90 p-3 text-white backdrop-blur-sm">
                <p className="text-xs font-semibold">pH 4.6</p>
                <p className="mt-1 text-[10px] text-white/70">Exchangeable Al³⁺</p>
              </div>
              <div className="rounded-xl bg-[#173c2b]/90 p-3 text-white backdrop-blur-sm">
                <p className="text-xs font-semibold">Low P</p>
                <p className="mt-1 text-[10px] text-white/70">Allophane Sinks</p>
              </div>
              <div className="rounded-xl bg-[#173c2b]/90 p-3 text-white backdrop-blur-sm">
                <p className="text-xs font-semibold">Severe Slope</p>
                <p className="mt-1 text-[10px] text-white/70">Erosion Exposure</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#edf5e5] text-[#2d5939] dark:bg-neutral-800 dark:text-[#c5e39f]">
                <Mountain className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Agronomic Challenge
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#183b2d] sm:text-4xl dark:text-white">
              Understanding the Volcanic Basin Challenge
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              Volcanic Andosols possess unique physical and chemical characteristics. Their light, porous tephra materials detach effortlessly under rainstorm impact, causing devastating rills on unprotected slopes.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
              Chemically, amorphous allophane minerals and exchangeable aluminum (Al³⁺) severely restrict plant roots, causing root tips to blacken and prune while binding over 85% of applied phosphorus. Direct tillage or broadcast fertilizer only accelerates topsoil destruction.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild className="rounded-full bg-[#27583d] text-white hover:bg-[#183b2d] dark:bg-[#c5e39f] dark:text-[#183b2d] dark:hover:bg-white">
                <a href="#treatments">
                  View Precision Liming Protocol <ArrowRight className="ml-1.5 size-4" />
                </a>
              </Button>
              <a
                href="#solutions"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[#496653] hover:text-[#183b2d] dark:text-[#c5e39f] dark:hover:text-white"
              >
                Inspect Ranked Crops <ArrowDownRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 4. TREATMENT EXPLORATION & REMEDIATION */}
        <TreatmentExplorer diagnosis={diagnosis} params={soilParams} />

        {/* 5. CROP PATHWAYS & SUITABILITY MATRIX */}
        <CropSuitabilityMatrix diagnosis={diagnosis} />

        {/* 6. EMERGENCY PROTEIN PLANNER (<25 DAYS) */}
        <EmergencyProteinPlanner />

        {/* 7. LONG-TERM STARCH CULTIVATION ROADMAP */}
        <CultivationRoadmap />

        {/* 8. CORE STRATEGIES (Preserved from original) */}
        <section className="border-b border-[#dfe9d7] bg-[#edf5e5]/30 py-20 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                Core Principles
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#183b2d] sm:text-4xl dark:text-white">
                Four Pillars of Soil Revival
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#617267] dark:text-neutral-300">
                Ground-level practices designed for lasting resilience. Expand each card for practical on-farm instructions.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {scenario.strategies.map((strategy) => (
                <StrategyCard key={strategy.title} strategy={strategy} />
              ))}
            </div>
          </div>
        </section>

        {/* 9. CALL TO ACTION / RESOURCES */}
        <section id="resources" className="px-5 py-20 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#355f42] px-7 py-16 sm:px-14 lg:py-20">
            <img
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1800&q=85"
              alt="Sunlight filtering through a lush forest canopy"
              className="absolute inset-0 size-full object-cover opacity-25 mix-blend-screen"
            />
            <div className="relative max-w-2xl text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5e39f]">
                AgriRevive Field Directive
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Good soil doesn&apos;t just grow crops. It anchors civilizations.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Download the complete field protocol or re-run the diagnostic engine whenever new laboratory soil test results or weather patterns arrive.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={handlePrint}
                  className="rounded-full bg-[#c5e39f] px-6 text-sm font-bold text-[#183b2d] hover:bg-white"
                >
                  <FileDown className="mr-1.5 size-4" /> Print / Export Complete Field Dossier
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/60 bg-white/10 px-6 text-sm font-bold text-white hover:bg-white hover:text-[#183b2d]">
                  <a href="#analysis">Re-evaluate Parameters</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e5ece0] bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#617267] dark:text-neutral-400">
              AgriRevive transforms soil chemistry signals and terrain constraints into actionable, sustainable decisions for the fields that sustain us.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Diagnostic Tools
            </p>
            <div className="mt-4 grid gap-2.5 text-xs text-[#496653] dark:text-neutral-400">
              <a href="#analysis" className="hover:text-[#183b2d] dark:hover:text-white">Live Soil Assessment</a>
              <a href="#analysis" className="hover:text-[#183b2d] dark:hover:text-white">Interactive pH Tracker</a>
              <a href="#analysis" className="hover:text-[#183b2d] dark:hover:text-white">Slope Cross-Section</a>
              <a href="#treatments" className="hover:text-[#183b2d] dark:hover:text-white">Precision Liming Calculator</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Crops &amp; Nutrition
            </p>
            <div className="mt-4 grid gap-2.5 text-xs text-[#496653] dark:text-neutral-400">
              <a href="#solutions" className="hover:text-[#183b2d] dark:hover:text-white">Cassava &amp; Sweet Potato</a>
              <a href="#solutions" className="hover:text-[#183b2d] dark:hover:text-white">Suitability Comparison Matrix</a>
              <a href="#emergency-protein" className="hover:text-[#183b2d] dark:hover:text-white">Decoupled Protein Relays</a>
              <a href="#recovery" className="hover:text-[#183b2d] dark:hover:text-white">9-Phase Cultivation Journey</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
              Knowledge Base
            </p>
            <div className="mt-4 grid gap-2.5 text-xs text-[#496653] dark:text-neutral-400">
              <span>KB: Volcanic Soils v2.0.0</span>
              <span>Classification: Andosol / Andisol</span>
              <span>Guard G-01 through G-05 Active</span>
              <a href="#top" className="font-bold text-[#27583d] hover:underline dark:text-[#c5e39f]">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e5ece0] px-5 py-6 text-center text-xs text-[#7c8e78] dark:border-neutral-800 dark:text-neutral-500 lg:px-8">
          AgriRevive Agricultural Decision Support Platform · Based on USDA-NRCS, FAO WRB, IFDC, and International Biochar Initiative standards · Field rates require site-specific soil testing.
        </div>
      </footer>
    </div>
  )
}
