'use client'

import React, { useState } from 'react'
import {
  Code2,
  Cpu,
  Database,
  FileDown,
  FileSearch,
  FlaskConical,
  Layers,
  Leaf,
  Menu,
  Printer,
  ShieldAlert,
  Sparkles,
  Sprout,
  X,
  Zap,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ScenarioWizard } from './workflow/scenario-wizard'
import { PhInteractiveScale } from './analysis/ph-interactive-scale'
import { SoilCrossSection } from './analysis/soil-cross-section'
import { initialScenarioParams } from '@/lib/knowledge-engine'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="AgriRevive home">
      <span className="grid size-9 place-items-center rounded-xl bg-[#d5ecb6] text-[#153d2b] shadow-sm dark:bg-[#c5e39f] dark:text-[#183b2d]">
        <Leaf className="size-4.5" />
      </span>
      <span className="font-serif text-xl font-bold tracking-tight text-[#183b2d] dark:text-white">
        Agri<span className="text-[#7b9f45] dark:text-[#c5e39f]">Revive</span>
      </span>
    </a>
  )
}

export function AgriRevive() {
  const [showSimulations, setShowSimulations] = useState(false)
  const [currentPh, setCurrentPh] = useState(4.6)

  return (
    <div id="top" className="min-h-screen bg-[#fbfcf8] text-[#183b2d] antialiased dark:bg-neutral-950 dark:text-neutral-100">
      {/* MINIMAL SCIENTIFIC HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#dfe9d7] bg-[#fbfcf8]/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <div className="hidden items-center gap-6 sm:flex">
            <div className="flex items-center gap-2 font-mono text-xs text-[#617267] dark:text-neutral-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>KB-VOLC-ANDOSOL-EMERG</span>
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] dark:bg-neutral-800">
                Offline Mode (No API)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowSimulations(!showSimulations)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#bed4ae] bg-[#f4f8ef] px-3.5 py-1.5 text-xs font-semibold text-[#27583d] hover:bg-[#dfe9d7] dark:border-neutral-700 dark:bg-neutral-800 dark:text-[#c5e39f]"
            >
              <Layers className="size-3.5" />
              {showSimulations ? 'Hide Soil Simulator' : 'Inspect pH & Slope Simulator'}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#dfe9d7] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#183b2d] shadow-sm hover:bg-[#f4f8ef] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <Printer className="size-3.5" />
              Export
            </button>

            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setShowSimulations(!showSimulations)}
              className="rounded-lg border border-[#dfe9d7] p-2 text-xs font-bold"
            >
              <Layers className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* OPTIONAL EXPANDABLE SOIL PHYSICS SIMULATOR */}
      {showSimulations && (
        <section className="border-b border-[#dfe9d7] bg-[#edf5e5]/40 py-8 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7b9f45]">
                  Visual Diagnostics Suite
                </span>
                <h3 className="font-serif text-xl font-bold text-[#183b2d] dark:text-white">
                  Interactive Soil Chemistry &amp; Cross-Section Dynamics
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSimulations(false)}
                className="text-xs font-semibold text-[#7c8e78] underline hover:text-[#183b2d]"
              >
                Close Simulator ✕
              </button>
            </div>

            <PhInteractiveScale currentPh={currentPh} onPhChange={(p) => setCurrentPh(p)} />
            <SoilCrossSection currentPh={currentPh} slopeSeverity="EROSION_SEVERE" />
          </div>
        </section>
      )}

      {/* MAIN INTELLIGENCE WORKFLOW WIZARD */}
      <main>
        <ScenarioWizard />
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-[#dfe9d7] bg-white py-6 text-center text-xs text-[#7c8e78] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>AgriRevive Agricultural Intelligence Engine · 100% Client-Side Knowledge Base Execution</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>WRB / USDA Andosol Standards</span>
            <span>Safety Guards G-01 to G-05 Active</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
