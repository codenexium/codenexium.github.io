'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Zap,
  Search,
  Rocket,
  Quote,
  Store,
  Briefcase,
  Building2,
} from 'lucide-react'
import { SITE, SERVICES, INDUSTRIES, TESTIMONIALS, PROCESS_STEPS } from '../lib/config'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { Counter } from '../components/Counter'
import { TechMarquee } from '../components/TechMarquee'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceIcon } from '../components/icons'
import { CtaBanner } from '../components/CtaBanner'
import { useCta } from '../lib/cta-context'
import CalIdModal from '../components/CalIdModal'

function HeroCard() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="glass-strong relative overflow-hidden rounded-3xl p-6 ring-glow"
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

        {/* window dots */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-[11px] text-zinc-500">
            abhishek@studio: ~/projects
          </span>
        </div>

        <div className="mt-6 space-y-3 font-mono text-[13px] leading-relaxed">
          <p className="text-zinc-500">
            <span className="text-brand-400">$</span> abhishek build --site cafe-orders
          </p>
          <p className="text-emerald-400">✓ Site built in 12 days</p>
          <p className="text-zinc-500">
            <span className="text-brand-400">$</span> abhishek integrate --hubspot --whatsapp
          </p>
          <p className="text-emerald-400">✓ Leads landing in CRM + chat live</p>
          <p className="text-zinc-500">
            <span className="text-brand-400">$</span> abhishek deploy --production
          </p>
          <p className="text-accent-400">
            ✓ Deployed · SEO 98/100 · Load 0.8s · {`{ revenue: 'up 3x' }`}
          </p>
          <p className="mt-3 text-zinc-500">
            <span className="text-brand-400">$</span> <span className="animate-pulse">▊</span>
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
          {[
            { label: 'Projects', value: '120+' },
            { label: 'Avg. speed', value: '< 1s' },
            { label: 'ROI focus', value: 'Always' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-sm font-bold text-white">{s.value}</p>
              <p className="text-[11px] text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="glass absolute -left-6 -top-6 hidden items-center gap-2 rounded-2xl px-4 py-3 sm:flex"
      >
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#25d366]/15 text-emerald-400">
          <ServiceIcon name="message-circle" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-bold text-white">WhatsApp CRM</p>
          <p className="text-[10px] text-zinc-500">No lead left behind</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="glass absolute -bottom-6 -right-4 hidden items-center gap-2 rounded-2xl px-4 py-3 sm:flex"
      >
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
          <ServiceIcon name="bot" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-bold text-white">n8n + AI</p>
          <p className="text-[10px] text-zinc-500">Workflows that run themselves</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  const { openCta } = useCta()

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-32 right-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects · {SITE.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]"
          >
            Hi, I'm{' '}
            <span className="text-gradient">{SITE.name}.</span>{' '}
            I build websites & AI systems that{' '}
            <span className="relative whitespace-nowrap">
              businesses use
              <svg
                className="absolute -bottom-2 left-0 w-full text-accent-400/70"
                viewBox="0 0 200 9"
                fill="none"
              >
                <path
                  d="M2 7C50 2 150 2 198 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            From the first conversation to full deployment - websites, online stores, WhatsApp
            CRMs, marketing funnels and AI automation for{' '}
            <span className="font-medium text-zinc-200">small businesses, professionals and growing enterprises</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openCta()}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-4 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <CalIdModal text="Book a Free Call" variant="outline" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex items-center gap-3 text-sm text-zinc-500"
          >
            <div className="flex -space-x-2">
              {['from-brand-500 to-brand-400', 'from-accent-500 to-accent-400', 'from-fuchsia-500 to-fuchsia-400'].map(
                (g, i) => (
                  <span
                    key={i}
                    className={`h-8 w-8 rounded-full border-2 border-ink-950 bg-gradient-to-br ${g}`}
                  />
                )
              )}
            </div>
            <p>
              Trusted by <span className="font-semibold text-zinc-300">120+ businesses</span> across{' '}
              <span className="font-semibold text-zinc-300">{SITE.industriesServed} industries</span>
            </p>
          </motion.div>
        </div>

        <HeroCard />
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: 5, suffix: '+', label: 'Years experience' },
    { value: 120, suffix: '+', label: 'Projects delivered' },
    { value: 20, suffix: '+', label: 'Industries served' },
    { value: 98, suffix: '%', label: 'Client satisfaction' },
  ]

  return (
    <section className="border-y border-white/5 bg-ink-900/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-bold sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-zinc-500">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            Everything you need to{' '}
            <span className="text-gradient">win online</span>
          </>
        }
        description="Fixed starting prices, no surprises. Pick a service or combine them into a complete growth system."
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {SERVICES.map((service) => (
          <StaggerItem key={service.slug} className="h-full">
            <ServiceCard service={service} compact />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-12 text-center">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
        >
          View all services & pricing
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}

const INDUSTRY_ICONS = { store: Store, briefcase: Briefcase, building: Building2 }

function Industries() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-900/40 py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who I help"
          title={
            <>
              Built for <span className="text-gradient">businesses like yours</span>
            </>
          }
          description="I've delivered for clients across small businesses, professionals and growing enterprises-each with its own playbook."
        />

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {INDUSTRIES.map((g) => {
            const Icon = INDUSTRY_ICONS[g.icon] || Store
            return (
              <StaggerItem
                key={g.group}
                className="group rounded-3xl border border-white/8 bg-ink-950/60 p-7 transition-all duration-300 hover:border-brand-500/30 hover:bg-ink-900/80"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{g.group}</h3>
                <p className="mt-2 text-sm text-zinc-400">{g.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

function ProcessPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            A proven process, <span className="text-gradient">zero guesswork</span>
          </>
        }
        description="From discovery to launch, you always know what's happening, what's next and what it costs."
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {PROCESS_STEPS.slice(0, 4).map((p) => (
          <StaggerItem key={p.step} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-ink-900/70 p-6 transition-all duration-300 hover:border-brand-500/30">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-base font-bold text-on-brand shadow-glow">
                {p.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-400">
                {p.duration}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-12 text-center">
        <Link
          href="/process"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
        >
          See the full process
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}

function WhyMe() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Built to convert',
      desc: 'Every section earns its place - designed to turn visitors into enquiries, not just look pretty.',
    },
    {
      icon: Zap,
      title: 'Fast by default',
      desc: 'Sub-second loads, Core Web Vitals in green. Speed is SEO, and SEO is revenue.',
    },
    {
      icon: Search,
      title: 'SEO baked in',
      desc: 'Technical SEO, schema and optimisation handled from day one - not bolted on later.',
    },
    {
      icon: Rocket,
      title: 'Launched & supported',
      desc: 'Deployment, domain, email and 30 days of free support after launch. I don\u2019t vanish.',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
            Why work with me
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            One person, <span className="text-gradient">end-to-end ownership</span> - from brief
            to deployment
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            I've spent {SITE.experienceYears}+ years shipping websites and AI systems for{' '}
            {SITE.industriesServed}+ industries. You work directly with the person who builds,
            launches and supports your project - no agencies, no hand-offs, no vanishing act.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-ink-900/60 p-4 transition-colors duration-300 hover:border-brand-500/30"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">{p.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-500/10 to-accent-500/10 blur-2xl" />
            <div className="glass-strong relative rounded-[2rem] p-8">
              <h3 className="font-display text-xl font-bold text-white">What clients say</h3>
              <div className="mt-6 space-y-6">
                {TESTIMONIALS.slice(0, 3).map((t) => (
                  <div key={t.name} className="rounded-2xl border border-white/5 bg-ink-950/60 p-5">
                    <Quote className="h-5 w-5 text-brand-400" />
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{t.quote}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-bold text-on-brand">
                        {t.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-zinc-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Stats />
      <ServicesPreview />
      <Industries />
      <ProcessPreview />
      <WhyMe />
      <CtaBanner />
    </>
  )
}
