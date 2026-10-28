'use client'

import { motion } from 'framer-motion'
import { Check, Clock, MessageSquareText, FileText, Users } from 'lucide-react'
import { PROCESS_STEPS } from '../lib/config'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { CtaBanner } from '../components/CtaBanner'

const EXPECTATIONS = [
  {
    icon: MessageSquareText,
    title: 'Weekly updates',
    desc: 'A short update every week with what\u2019s done, what\u2019s next and anything I need from you. No chasing required.',
  },
  {
    icon: FileText,
    title: 'Staging preview',
    desc: 'You get a live staging link early, so you see the site taking shape and can give feedback as it grows.',
  },
  {
    icon: Clock,
    title: 'Clear timelines',
    desc: 'Every phase has a duration and a clear definition of done. You always know where we are.',
  },
  {
    icon: Users,
    title: 'One point of contact',
    desc: 'You work directly with me from brief to launch. No account managers, no hand-offs between teams.',
  },
]

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'A business website usually ships in 1–2 weeks. Online stores take 3–4 weeks. Automation and CRM projects vary with scope - I give you a timeline in the proposal and we track against it.',
  },
  {
    q: 'What do I need to provide before we start?',
    a: 'Your logo, brand colours and text content (I help with the text if you need it). Anything else - photos, menus, product details - we agree on a list during the discovery call.',
  },
  {
    q: 'Do you work with existing designs or websites?',
    a: 'Yes. I can redesign an existing site, migrate from another platform, or take over maintenance. Share what you have in the project form and I\u2019ll tell you the best path.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes 30 days of free support for fixes and tweaks. After that, optional maintenance retainers cover updates, backups, security and improvements.',
  },
  {
    q: 'How do payments work?',
    a: 'Projects start with a 50% advance; the balance is due on launch. Larger builds can be split into milestone payments. You receive a formal invoice for every payment.',
  },
  {
    q: 'Can you integrate HubSpot, WhatsApp or other tools?',
    a: 'Yes - HubSpot forms and chat, WhatsApp CRM, Omnisend, payment gateways and n8n automation are core parts of most projects. Tell me which tools you use and I\u2019ll wire them in.',
  },
]

function FAQItem({ q, a, index }) { 
  return (
    <Reveal delay={index * 0.05}>
      <div className="group rounded-2xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
        <h3 className="font-display text-base font-bold text-white">{q}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{a}</p>
      </div>
    </Reveal>
  )
}

export function Process() {
  return (
    <>
      <PageHero
        eyebrow="How I work"
        title={
          <>
            A transparent process from{' '}
            <span className="text-gradient">first call to launch</span>
          </>
        }
        description="Five clear phases. You'll always know what's happening, what's next and what it costs - no black box, no surprises."
      />

      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-px bg-gradient-to-b from-brand-500/60 via-accent-500/40 to-transparent sm:block" />

          <Stagger className="space-y-8" stagger={0.08}>
            {PROCESS_STEPS.map((p) => (
              <StaggerItem key={p.step}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="relative grid gap-5 rounded-3xl border border-white/8 bg-ink-900/70 p-6 sm:grid-cols-[auto_1fr] sm:p-8"
                >
                  <div className="relative flex items-start gap-4 sm:block">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-base font-bold text-on-brand shadow-glow">
                      {p.step}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                        {p.title}
                      </h2>
                      <span className="rounded-full border border-accent-400/30 bg-accent-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-400">
                        {p.duration}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {p.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {p.items.map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-3.5 py-1.5 text-xs font-medium text-zinc-300"
                        >
                          <Check className="h-3 w-3 text-brand-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What to expect"
            title={
              <>
                Working with me feels like{' '}
                <span className="text-gradient">working with a team</span>
              </>
            }
            description="Transparency is a feature. Here's what every client gets regardless of project size."
          />
          <Stagger
            className={centeredRow({ cols: { sm: 2, lg: 4 }, gap: "gap-5", className: "mt-12" })}
            stagger={0.08}
          >
            {EXPECTATIONS.map((e) => (
              <StaggerItem
                key={e.title}
                className={centeredItem({ cols: { sm: 2, lg: 4 }, gap: "gap-5"})}
              >
                <div className="h-full rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                    <e.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{e.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Common questions, <span className="text-gradient">answered honestly</span>
            </>
          }
        />
        <div className="mt-12 grid gap-4">
          {FAQS.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
