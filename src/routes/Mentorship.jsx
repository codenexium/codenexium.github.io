'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Code2,
  Rocket,
  Users,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Briefcase,
  BadgeCheck,
  CalendarCheck,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { CtaBanner } from '../components/CtaBanner'
import CalIdModal from '../components/CalIdModal'

const TRACKS = [
  {
    icon: BookOpen,
    title: 'The Fundamentals',
    items: [
      'Modern web architecture - how the pieces fit together',
      'HTML, CSS, JavaScript and React done properly',
      'WordPress + PHP for client work and quick builds',
      'Next.js and TailwindCSS for fast, SEO-friendly sites',
    ],
  },
  {
    icon: Code2,
    title: 'Real Client Work',
    items: [
      'Scoping projects, pricing and proposals that win',
      'Building complete client sites end to end',
      'Payments, domains, hosting and deployment',
      'Delivering to non-technical clients with confidence',
    ],
  },
  {
    icon: TrendingUp,
    title: 'AI & Automation',
    items: [
      'n8n workflows that replace manual busywork',
      'AI chatbots and assistants for real businesses',
      'CRM integrations - HubSpot, Zoho, WhatsApp API',
      'Marketing automation with Omnisend and funnels',
    ],
  },
  {
    icon: Briefcase,
    title: 'The Freelance Business',
    items: [
      'Finding clients and positioning yourself',
      'Fixed pricing vs hourly and when to use each',
      'Contracts, invoicing and getting paid on time',
      'Turning one-off projects into retainers',
    ],
  },
]

const FORMATS = [
  {
    icon: Users,
    name: '1-on-1 Mentorship',
    priceLabel: 'Monthly',
    desc: 'Weekly 1-on-1 calls, a personal roadmap, code reviews and async support between sessions. Best for serious career builders.',
    features: [
      '4 x 60-min private sessions/month',
      'Personalised learning roadmap',
      'Code reviews on your projects',
      'Async chat support on WhatsApp',
      'Resume, portfolio & client pitching help',
    ],
  },
  {
    icon: Rocket,
    name: 'Project-Based Bootcamp',
    priceLabel: 'Fixed program',
    desc: 'Build 3 real-world projects (site, store, automation) under my guidance. Finish with a portfolio that wins clients.',
    features: [
      '3 guided real projects',
      'Weekly live workshops',
      'Recorded sessions to rewatch',
      'Portfolio & case-study review',
      'Freelance starter pack + scripts',
    ],
  },
  {
    icon: Lightbulb,
    name: 'Pay-As-You-Go Sessions',
    priceLabel: 'Per session',
    desc: 'Book a single session to unblock a specific problem-a bug, a workflow, a pricing question or a code review.',
    features: [
      'Book any single 60-min session',
      'Bring your own project/problem',
      'Practical, actionable answers',
      'Recording sent after the call',
      'No long-term commitment',
    ],
  },
]

const STUDENT_STORIES = [
  {
    name: 'Rahul Deshmukh',
    role: 'Junior dev → landed first client',
    quote:
      'Six weeks into mentorship I shipped my first paid website. The client work module alone paid for the program 10x over.',
  },
  {
    name: 'Ananya Gupta',
    role: 'Career switcher → junior frontend role',
    quote:
      'The roadmap kept me focused. Abhishek reviewed my code weekly and pushed me to build real projects instead of tutorials.',
  },
  {
    name: 'Karan Shah',
    role: 'Freelancer → monthly retainer clients',
    quote:
      'The pricing and positioning advice changed my business. I stopped chasing hourly work and now sell fixed-scope projects.',
  },
]

export function Mentorship() {
  return (
    <>
      <PageHero
        eyebrow="Mentorship"
        title={
          <>
            Learn to build <span className="text-gradient">real websites & AI systems</span> and
            get paid for it
          </>
        }
        description="I mentor developers, career switchers and freelancers who want to go from learning to shipping client-ready work with modern tools - WordPress, React, Next.js, n8n and AI."
      >
        <div className="flex flex-wrap items-center gap-4">
          <CalIdModal text="Book a Mentorship Intro Call" variant="primary" />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/70 px-4 py-2 text-sm text-zinc-300">
            <GraduationCap className="h-4 w-4 text-brand-300" />
            Limited to 5 active mentees
          </span>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What you'll learn"
          title={
            <>
              Four tracks, <span className="text-gradient">one goal: you ship</span>
            </>
          }
          description="Everything is taught through building-the same projects and workflows I use with paying clients."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.08}>
          {TRACKS.map((t) => (
            <StaggerItem key={t.title} className="h-full">
              <div className="h-full rounded-3xl border border-white/8 bg-ink-900/60 p-7 transition-colors duration-300 hover:border-brand-500/30">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{t.title}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Formats"
            title={
              <>
                Choose how you want <span className="text-gradient">to learn</span>
              </>
            }
            description="Flexible formats designed for different goals and budgets. Starting prices vary by commitment."
          />
          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.09}>
            {FORMATS.map((f, i) => (
              <StaggerItem key={f.name} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`flex h-full flex-col rounded-3xl border p-7 ${
                    i === 1
                      ? 'border-brand-500/40 bg-gradient-to-b from-brand-600/15 to-ink-900 shadow-glow'
                      : 'border-white/8 bg-ink-900/70 hover:border-brand-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                      <f.icon className="h-6 w-6" />
                    </span>
                    {i === 1 && (
                      <span className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-brand">
                        Most popular
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">{f.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-accent-400">{f.priceLabel}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {f.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all duration-300">
                    <CalIdModal text="Book this format" variant={i === 1 ? 'primary' : 'outline'} />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Results"
          title={
            <>
              Mentees who <span className="text-gradient">actually shipped</span>
            </>
          }
        />
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.09}>
          {STUDENT_STORIES.map((s) => (
            <StaggerItem key={s.name} className="h-full">
              <div className="h-full rounded-3xl border border-white/8 bg-ink-900/60 p-6">
                <p className="text-sm leading-relaxed text-zinc-300">"{s.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-bold text-on-brand">
                    {s.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs text-zinc-500">{s.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBanner />
    </>
  )
}
