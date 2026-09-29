'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarCheck, MessageCircle } from 'lucide-react'
import { WHATSAPP } from '../lib/config'
import { useCta } from '../lib/cta-context'
import { Reveal } from './Reveal'
import CalIdModal from './CalIdModal'

export function CtaBanner() {
  const { openCta } = useCta()

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-300"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Booking projects now
            </motion.span>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Ready to build something{' '}
              <span className="text-gradient">your business actually uses?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Get a fixed-price quote within 24 hours. No pressure, no jargon-just a clear plan
              for your project.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openCta()}
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-4 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-cyan"
              >
                Get a Free Quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <CalIdModal variant="outline" />
              <a
                href={WHATSAPP.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-7 py-4 text-sm font-semibold text-zinc-200 transition-colors hover:border-emerald-400/50 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                WhatsApp
              </a>
            </div>

            <p className="mt-8 text-xs text-zinc-500">
              Average response time: under 4 hours on weekdays
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
