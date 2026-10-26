'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import {
  SERVICES,
  INDUSTRIES,
  TECH_STACKS,
  startingPriceLabel,
  serviceTierOptionValue,
  addOnsForPlan,
  addOnsForService,
  addOnBillingLabel,
  formatINR,
} from '../lib/config'
import { normalizeSlug, SERVICE_INDUSTRIES } from '../lib/service-pages'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/icons'
import { CtaBanner } from '../components/CtaBanner'
import CalIdModal from '../components/CalIdModal'
import { useCta } from '../lib/cta-context'

export function ServiceDetail() {
  const { slug: rawSlug } = useParams()
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const service = SERVICES.find((s) => normalizeSlug(s.slug) === slug)
  const industries = SERVICE_INDUSTRIES[slug] || []
  const serviceAddOns = service ? addOnsForService(service) : []
  const { openCta } = useCta()

  const words = service.name.split(' ')
  const lastName = words[words.length - 1]
  const firstName = words.slice(0, -1).join(' ')

  return (
    <>
      <section className="flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mt-18 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
        </div>

        <PageHero
          centered
          eyebrow="Service Details"
          title={
            firstName ? (
              <>
                {firstName} <span className="text-gradient">{lastName}</span>
              </>
            ) : (
              <span className="text-gradient">{lastName}</span>
            )
          }
          description={service.short}
        >
          <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-white/10 bg-ink-900/70 p-5 sm:p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            <div className="min-w-40">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Starting price
              </p>
              <p className="flex items-center gap-2 font-display text-3xl font-bold text-white">
                {startingPriceLabel(service)}
                {service.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-on-brand">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() =>
                  openCta(service.name, {
                    addOns: serviceAddOns,
                    requiresAddOnSelection: true,
                  })
                }
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:brightness-110 hover:shadow-glow-cyan"
              >
                Start this project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <CalIdModal text="Book a call" />
            </div>
          </div>
        </PageHero>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {Array.isArray(service.pricing) && service.pricing.length > 0 && (
          <>
            <SectionHeading
              eyebrow="Pricing"
              title={
                <>
                  Choose the <span className="text-gradient">stack</span> that fits
                </>
              }
              description={service.pricingNote}
            />
            <Stagger className={centeredRow({ cols: { lg: 2 }, gap: "gap-5", className: "mt-12" })} stagger={0.06}>
              {service.pricing.map((tier) => {
                const stack = TECH_STACKS[tier.stack]
                const planAddOns = addOnsForPlan(service, tier)
                return (
                  <StaggerItem
                    key={tier.stack}
                    className={centeredItem({ cols: { lg: 2 }, gap: "gap-5"})}
                  >
                    <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          {stack && (
                            <span className="inline-flex items-center rounded-full bg-brand-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-300">
                              {stack.tag}
                            </span>
                          )}
                          <h3 className="mt-3 font-display text-lg font-bold text-white">
                            {tier.label}
                          </h3>
                        </div>
                        <p className="font-display text-2xl font-bold text-gradient">
                          {formatINR(tier.price)}
                        </p>
                      </div>
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                              <Check className="h-3 w-3" />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {planAddOns.length > 0 && (
                        <div className="mt-5 border-t border-white/5 pt-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                            Add-ons for this plan
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {planAddOns.map((addOn) => (
                              <Link
                                key={addOn.slug}
                                href={`/addons/${addOn.slug}`}
                                className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-ink-950/60 px-2.5 py-1 text-[11px] text-zinc-300 transition-colors duration-300 hover:border-brand-500/30 hover:text-brand-200"
                              >
                                {addOn.name}
                                <ArrowUpRight className="h-3 w-3" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() =>
                          openCta(serviceTierOptionValue(service, tier), {
                            addOns: planAddOns,
                            requiresAddOnSelection: true,
                          })
                        }
                        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:brightness-110 hover:shadow-glow-cyan"
                      >
                        Start this project
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </>
        )}

        {serviceAddOns.length > 0 && (
          <div className="mt-20">
            <SectionHeading
              eyebrow="Add-ons"
              title={
                <>
                  Add only what you <span className="text-gradient">actually need</span>
                </>
              }
              description="Each add-on is available on selected plans above. Open one to see exactly what is included, how it works and where it fits."
            />
            <Stagger className={centeredRow({ cols: { sm: 2 }, gap: "gap-4", className: "mt-12" })} stagger={0.06}>
              {serviceAddOns.map((addOn) => (
                <StaggerItem
                  key={addOn.slug}
                  className={centeredItem({ cols: { sm: 2 }, gap: "gap-4"})}
                >
                  <Link
                    href={`/addons/${addOn.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-white/8 bg-ink-900/60 p-5 transition-colors duration-300 hover:border-brand-500/30"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                      <ServiceIcon name={addOn.icon} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-brand-200">
                          {addOn.name}
                        </h3>
                        <p className="font-display text-base font-bold text-accent-400">
                          +{formatINR(addOn.price)}{' '}
                          <span className="text-xs font-medium text-zinc-500">
                            {addOnBillingLabel(addOn)}
                          </span>
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{addOn.summary}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-300">
                        View add-on details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What You Get"
            title={
              <>
                Everything included in this <span className="text-gradient">service</span>
              </>
            }
            description="A clear, written list of everything delivered - no surprises, no scope creep."
          />
          <Stagger className={centeredRow({ cols: { sm: 2 }, gap: "gap-4", className: "mt-12" })} stagger={0.06}>
            {service.deliverables.map((item) => (
              <StaggerItem key={item} className={centeredItem({ cols: { sm: 2 }, gap: "gap-4"})}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/8 bg-ink-900/60 p-5 transition-colors duration-300 hover:border-brand-500/30">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Business Needs Fulfilled"
            title={
              <>
                Who this service is <span className="text-gradient">built for</span>
              </>
            }
            description="How this service maps to the real needs of the industries I work with."
          />
          <div className={centeredRow({ cols: { lg: 3 }, className: "mt-12" })}>
            {industries.map(({ group, items }) => {
              const meta = INDUSTRIES.find((i) => i.group === group)
              return (
                <Reveal key={group} className={centeredItem({ cols: { lg: 3 }})}>
                  <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-ink-950/60 p-6 transition-colors duration-300 hover:border-brand-500/30">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                        <ServiceIcon name={meta?.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-white">{group}</h3>
                        <p className="text-xs text-zinc-500">{meta?.description}</p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-4">
                      {Object.entries(items).map(([label, note]) => (
                        <li
                          key={label}
                          className="flex flex-col gap-1 border-l-2 border-brand-500/30 pl-3"
                        >
                          <span className="text-sm font-semibold text-zinc-200">{label}</span>
                          <span className="text-sm leading-relaxed text-zinc-400">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery & Demos"
          title={
            <>
              See this service <span className="text-gradient">in action</span>
            </>
          }
          description="Screenshots, a live demo and a walkthrough video will be added here soon."
        />
        <Stagger className={centeredRow({ cols: { md: 3 }, className: "mt-12" })} stagger={0.08}>
          {MEDIA_PLACEHOLDERS.map(({ icon: Icon, title, note, desc }) => (
            <StaggerItem key={title} className={centeredItem({ cols: { md: 3 }})}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-white/8 bg-ink-900/60 p-6 text-center transition-colors duration-300 hover:border-brand-500/30">
                <div className="grid aspect-video w-full place-items-center rounded-2xl border border-dashed border-white/15 bg-ink-950/50">
                  <div className="flex flex-col items-center gap-3 px-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {note}
                    </span>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section> */}

      <CtaBanner />
    </>
  )
}
