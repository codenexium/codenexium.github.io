'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Info, BadgeCheck, Wallet, RefreshCw, Headset } from 'lucide-react'
import { VISIBLE_SERVICES, PRICE_NOTE, INDUSTRIES } from '../lib/config'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceIcon } from '../components/icons'
import { CtaBanner } from '../components/CtaBanner'

const GUARANTEES = [
  {
    icon: Wallet,
    title: 'Fixed starting prices',
    desc: 'You know the price before we start. No hourly surprises, no scope creep.',
  },
  {
    icon: RefreshCw,
    title: 'Revision friendly',
    desc: 'Structured feedback rounds included, so the result matches what you imagined.',
  },
  {
    icon: BadgeCheck,
    title: 'Deliverables, in writing',
    desc: 'A clear list of what you get-hosting, domain, email, integrations-before you pay.',
  },
  {
    icon: Headset,
    title: 'Support after launch',
    desc: '30 days of free support and optional retainers to keep everything running smoothly.',
  },
]

export function Services() {
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const id = window.location.hash.slice(1)
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Services & Pricing"
        title={
          <>
            Services with <span className="text-gradient">honest, fixed pricing</span>
          </>
        }
        description="Six ways I help businesses win online-websites, stores, WhatsApp CRMs, marketing automation, funnels and AI workflows. All prices are starting prices."
      >
        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/70 px-5 py-3 text-sm text-zinc-300">
          <Info className="h-4 w-4 text-accent-400" />
          {PRICE_NOTE}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Stagger className={centeredRow({ cols: { lg: 2 } })} stagger={0.06}>
          {VISIBLE_SERVICES.map((service) => (
            <StaggerItem key={service.slug} className={centeredItem({ cols: { lg: 2 }, className: "h-full" })}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/8 bg-ink-900/50 p-8 sm:p-12">
          <Reveal className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              How to <span className="text-gradient">choose</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Not sure which stack fits? Here's the honest version - most businesses combine one
              core service with a WhatsApp CRM or automation to close the loop between marketing and
              revenue.
            </p>
          </Reveal>

          <div className={centeredRow({ cols: { sm: 2, lg: 3 }, gap: "gap-4", className: "mt-10" })}>
            {[
              {
                title: 'Just need a presence?',
                desc: 'Start with a single page from ₹5,000 - look professional, rank on Google, capture leads.',
                cta: 'Business Website',
                slug: 'business-website',
              },
              {
                title: 'Need clients to book you?',
                desc: 'Add the booking system to any website - calendar sync, confirmations and reminders.',
                cta: 'Booking add-on',
                slug: 'business-website',
              },
              {
                title: 'Selling products?',
                desc: 'Add the Online Store - catalogue, cart, checkout and payments managed in one place.',
                cta: 'Online Store',
                slug: 'online-store',
              },
              {
                title: 'Drowning in busywork?',
                desc: 'AI agents and automation take over the repetitive work - data entry, lead follow-up, reporting.',
                cta: 'AI Automation',
                slug: 'ai-automation',
              },
              {
                title: 'Need a real system?',
                desc: 'Custom builds for clinics, schools, hotels and restaurants that run on operations.',
                cta: 'Custom Software',
                slug: 'custom-business-website',
              },
            ].map((c) => (
              <motion.a
                key={c.title}
                href={`#${c.slug}`}
                whileHover={{ y: -4 }}
                className={centeredItem({
                  cols: { sm: 2, lg: 3 },
                  gap: "gap-4",
                  className:
                    "group rounded-2xl border border-white/8 bg-ink-950/60 p-6 transition-colors duration-300 hover:border-brand-500/30",
                })}
              >
                <h3 className="font-display text-base font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 group-hover:text-brand-200">
                  {c.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className={centeredRow({ cols: { sm: 2, lg: 4 }, gap: "gap-4" })}>
          {GUARANTEES.map((g) => (
            <Reveal key={g.title} className={centeredItem({ cols: { sm: 2, lg: 4 }, gap: "gap-4", className: "h-full" })}>
              <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Not sure which <span className="text-gradient">industry playbook</span> applies?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Every industry gets a tailored approach-explore who I work with, then let's map your
              exact needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((g) => (
                <span
                  key={g.group}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/70 px-5 py-2.5 text-sm text-zinc-300"
                >
                  <ServiceIcon name={g.icon} className="h-4 w-4 text-brand-300" />
                  {g.group}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
            >
              Learn more about my approach <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
