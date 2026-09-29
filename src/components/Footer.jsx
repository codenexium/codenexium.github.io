'use client'

import Link from 'next/link'
import { Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { SITE, WHATSAPP, SERVICES } from '../lib/config'
import { useCta } from '../lib/cta-context'
import CalIdModal from './CalIdModal'

export function Footer() {
  const { openCta } = useCta()

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
              I build websites and AI systems that businesses actually use - from the first
              conversation to full deployment.
            </p>
            <div className="mt-6 space-y-2 text-sm text-zinc-400">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand-400" /> {SITE.email}
              </a>
              <a
                href={WHATSAPP.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp me anytime
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-400" /> {SITE.location}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              {[
                { to: '/services', label: 'Services' },
                { to: '/process', label: 'Process' },
                { to: '/mentorship', label: 'Mentorship' },
                { to: '/blog', label: 'Blog' },
                { to: '/about', label: 'About' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className="transition-colors duration-200 hover:text-brand-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="transition-colors duration-200 hover:text-brand-300"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink-900/60 p-6">
            <h4 className="font-display text-lg font-bold text-white">Have a project in mind?</h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Let's map out what you need and get you a fixed quote within 24 hours.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={() => openCta()}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:shadow-glow-cyan hover:brightness-110"
              >
                Get a Free Quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <CalIdModal variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-zinc-600">Made with code & caffeine</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
