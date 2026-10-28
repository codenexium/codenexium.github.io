'use client'

import { Sparkles, Target, ShieldCheck, HeartHandshake, Award, Code2, Wrench, Rocket } from 'lucide-react'
import { SITE } from '../lib/config'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { Counter } from '../components/Counter'
import { TechMarquee } from '../components/TechMarquee'
import { CtaBanner } from '../components/CtaBanner'

const SKILLS = [
  {
    icon: Code2,
    title: 'Frontend',
    items: ['React', 'Next.js', 'TailwindCSS', 'JavaScript'],
  },
  {
    icon: Wrench,
    title: 'Backend & CMS',
    items: ['WordPress', 'PHP', 'Node.js', 'WooCommerce'],
  },
  {
    icon: Sparkles,
    title: 'AI & Automation',
    items: ['n8n', 'OpenAI', 'Chatbots', 'Workflow design'],
  },
  {
    icon: Rocket,
    title: 'Marketing Tech',
    items: ['HubSpot', 'Omnisend', 'WhatsApp API', 'SEO / GA4'],
  },
]

const VALUES = [
  {
    icon: Target,
    title: 'Outcomes over output',
    desc: 'A website is a tool for revenue, not a trophy. Every decision is tested against business results.',
  },
  {
    icon: ShieldCheck,
    title: 'Radical clarity',
    desc: 'Plain language updates, fixed prices and written deliverables. You should never be confused about your own project.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term partnership',
    desc: 'Most of my work comes from referrals and returning clients. I build systems that stay healthy long after launch.',
  },
  {
    icon: Award,
    title: 'Craft, every time',
    desc: 'Speed, accessibility and polish are non-negotiables whether it\u2019s a ₹10k site or a ₹1L automation build.',
  },
]

const TIMELINE = [
  {
    year: '2021',
    title: 'Started working in startup as full stack developer intern',
    desc: 'Built and maintained web applications, gaining experience in both frontend and backend development.',
  },
  {
    year: '2022',
    title: 'Worked as permanent full stack developer in startup',
    desc: 'Gained experience in building and maintaining web applications, working with a team of developers and designers.',
  },
  {
    year: '2023',
    title: 'Started freelancing and building websites for clients',
    desc: 'Worked with clients from various industries, building websites and web applications that met their business needs.',
  },
  {
    year: '2024',
    title: 'Built the WhatsApp CRM practice',
    desc: 'Started hosting and integrating WhatsApp CRMs for clients shared inboxes, pipelines and AI replies on their own subdomains.',
  },
  {
    year: '2025',
    title: 'AI automation era',
    desc: 'Added n8n and AI chatbot automation as first-class services. From lead capture to document generation, workflows now run themselves.',
  },
  {
    year: '2026',
    title: 'Today',
    desc: 'Running a full service practice: websites, stores, CRMs, funnels and AI systems for clients in 20+ industries mentoring the next wave of builders.',
  },
]

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About me"
        title={
          <>
            I'm {SITE.name} 
            <br></br>
            <span>and I build systems that{' '}</span>
            <span className="text-gradient">actually get used</span>
          </>
        }
        description="Full stack developer and AI automation expert with 5+ years of experience. I help businesses go from 'how do we get online?' to a fully deployed, revenue - driving web presence."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              From first conversation to{' '}
              <span className="text-gradient">full deployment</span>
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
              <p>
                I'm {SITE.name} - a {SITE.experienceYears}+ year full stack web developer who builds
                websites and AI systems that businesses actually use. My clients span small
                businesses, professionals and growing enterprises, across {SITE.industriesServed}+
                industries.
              </p>
              <p>
                What makes my work different is the focus on outcomes: a café wants reservations, a
                clinic wants bookings, a startup wants investor leads. I design and build with that
                end in mind, then keep the systems running after launch - hosting, domain, email,
                CRMs and automation included.
              </p>
              <p>
                I believe most businesses don't need a bigger ad budget they need a better pipeline.
                That's why every project I ship comes with lead capture, real-time chat and
                integrations (HubSpot, WhatsApp, Omnisend) built in, not bolted on.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { to: SITE.experienceYears, suffix: '+', label: 'Years of experience' },
                { to: SITE.projectsDelivered, suffix: '+', label: 'Projects delivered' },
                { to: SITE.industriesServed, suffix: '+', label: 'Industries served' },
                { to: SITE.satisfaction, suffix: '%', label: 'Client satisfaction' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/8 bg-ink-900/60 p-5"
                >
                  <p className="font-display text-3xl font-bold">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-brand-500/15 to-accent-500/10 blur-2xl" />
              <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 font-mono text-[11px] text-zinc-500">
                    abhishek@studio: ~/about
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <img src="/Abhishek-Sharma.jpg" alt="Abhishek Sharma" className="h-20 w-20 shrink-0 rounded-3xl" />
                  <div>
                    <p className="font-display text-xl font-bold text-white">Abhishek Sharma</p>
                    <p className="text-sm text-zinc-400">{SITE.role}</p>
                    <p className="mt-1 text-xs text-zinc-500">{SITE.location}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {SKILLS.map((skill) => (
                    <div key={skill.title}>
                      <div className="flex items-center gap-2 text-sm">
                        <skill.icon className="h-4 w-4 text-brand-300" />
                        <span className="font-semibold text-white">{skill.title}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg border border-white/10 bg-ink-950/70 px-2.5 py-1 text-xs text-zinc-400"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TechMarquee />

      <section className="border-y border-white/5 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Values"
            title={
              <>
                The principles behind <span className="text-gradient">every project</span>
              </>
            }
          />
          <Stagger
            className={centeredRow({ cols: { sm: 2, lg: 4 }, gap: "gap-5", className: "mt-12" })}
            stagger={0.08}
          >
            {VALUES.map((v) => (
              <StaggerItem
                key={v.title}
                className={centeredItem({ cols: { sm: 2, lg: 4 }, gap: "gap-5"})}
              >
                <div className="h-full rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              How I got <span className="text-gradient">here</span>
            </>
          }
        />
        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-[23px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-500/60 via-accent-500/40 to-transparent sm:left-[27px]" />
          <Stagger className="space-y-8" stagger={0.06}>
            {TIMELINE.map((t) => (
              <StaggerItem key={t.year}>
                <div className="relative flex gap-5 sm:gap-8">
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand-500/30 bg-ink-900 font-mono text-xs font-bold text-brand-300 sm:h-14 sm:w-14">
                    {t.year}
                  </span>
                  <div className="rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
                    <h3 className="font-display text-lg font-bold text-white">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
