'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight, Sparkles } from 'lucide-react'
import { ServiceIcon } from './icons'
import { useCta } from '../lib/cta-context'
import { startingPriceLabel } from '../lib/config'

export function ServiceCard({ service }) {
  const { openCta } = useCta()

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      id={service.slug}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 sm:p-7 ${
        service.featured
          ? 'border-brand-500/40 bg-gradient-to-b from-brand-600/15 via-ink-900 to-ink-900 shadow-glow'
          : 'border-white/8 bg-ink-900/70 hover:border-brand-500/30'
      } transition-all duration-300`}
    >
      {service.featured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-brand">
          <Sparkles className="h-3 w-3" /> Most popular
        </span>
      )}

      <div
        className={`grid h-12 w-12 place-items-center rounded-2xl ${
          service.featured
            ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand'
            : 'bg-brand-500/10 text-brand-300'
        }`}
      >
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </div>

      <h3 className="mt-5 font-display text-xl font-bold text-white">{service.name}</h3>

      <div className="mt-2 flex items-baseline gap-2">
        <span
          className={`font-display text-2xl font-bold ${service.featured ? 'text-gradient' : 'text-white'}`}
        >
          {startingPriceLabel(service)}
        {Array.isArray(service.pricing) && service.pricing.length > 1 && (
          <span className="text-xs font-medium text-zinc-500">
            {' '}
            &middot; {service.pricing.length} options
          </span>
        )}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.short}</p>

      <ul className="mt-5 flex-1 space-y-2.5">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
              <Check className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3 pt-2">
        <button
          onClick={() => openCta(service.name)}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
            service.featured
              ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-on-brand shadow-glow hover:brightness-110'
              : 'border border-brand-500/40 text-brand-300 hover:bg-brand-500/10'
          }`}
        >
          Start this project
        </button>
        <Link
          href={`/services/${service.slug}`}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-all duration-300 hover:border-brand-400 hover:text-white"
          aria-label={`View ${service.name} details`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
