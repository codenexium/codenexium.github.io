'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
} from 'lucide-react'
import {
  addOnBillingLabel,
  addOnPrice,
  addOnPriceRange,
  formatINR,
  getAddOn,
  plansForAddOn,
  relatedAddOns,
  resolveAddOn,
} from '../lib/config'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/icons'
import { CtaBanner } from '../components/CtaBanner'
import CalIdModal from '../components/CalIdModal'
import { useCta } from '../lib/cta-context'

export function AddOnDetail() {
  const { slug: rawSlug } = useParams()
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const addOn = getAddOn(slug)
  const { openCta } = useCta()

  if (!addOn) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
          Add-on
        </span>
        <h1 className="mt-6 text-4xl font-bold">This add-on could not be found</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          The page may have moved. Browse the full add-on catalogue to find what you need.
        </p>
        <Link
          href="/addons"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 text-sm font-semibold text-on-brand shadow-glow transition-all hover:brightness-110"
        >
          Browse all add-ons <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  const plans = plansForAddOn(addOn.slug)
  const related = relatedAddOns(addOn)
  const billing = addOnBillingLabel(addOn)
  const price = addOnPriceRange(addOn)
  const primaryService = plans[0]?.service
  const priceLabel = price.varies ? `from ${formatINR(price.min)}` : formatINR(price.min)

  const startProject = () => {
    const resolved = resolveAddOn(addOn.slug, primaryService)
    openCta(primaryService?.name ?? '', {
      requiresAddOnSelection: false,
      selectedAddOns: resolved ? [resolved] : [],
    })
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/addons"
          className="mt-18 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" />
          All add-ons
        </Link>
      </section>

      <PageHero
        centered
        eyebrow={addOn.category}
        title={<span className="text-gradient">{addOn.name}</span>}
        description={addOn.summary}
      >
        <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-white/10 bg-ink-900/70 p-5 sm:p-6">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
            <ServiceIcon name={addOn.icon} className="h-7 w-7" />
          </span>
          <div className="min-w-40 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Add-on price
            </p>
            <p className="flex flex-wrap items-baseline gap-2 font-display text-3xl font-bold text-white">
              {priceLabel}{' '}
              <span className="text-sm font-medium text-zinc-500">{billing}</span>
            </p>
            {price.varies && (
              <p className="mt-1 text-xs text-zinc-500">
                Final price depends on the service plan.
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startProject}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:brightness-110 hover:shadow-glow-cyan"
            >
              Add to a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <CalIdModal text="Book a call" />
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Overview"
              title={
                <>
                  What this <span className="text-gradient">add-on</span> covers
                </>
              }
            />
            <div className="mt-6 space-y-4">
              {addOn.intro.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="rounded-3xl border border-white/8 bg-ink-900/60 p-6">
              <h3 className="font-display text-base font-bold text-white">At a glance</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <dt className="text-zinc-500">Price</dt>
                  <dd className="text-right font-semibold text-zinc-200">
                    {priceLabel} {billing}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <dt className="text-zinc-500">Category</dt>
                  <dd className="text-right font-semibold text-zinc-200">{addOn.category}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-zinc-500">Available on</dt>
                  <dd className="text-right font-semibold text-zinc-200">
                    {plans.length} {plans.length === 1 ? 'plan' : 'plans'}
                  </dd>
                </div>
              </dl>

              <h3 className="mt-6 font-display text-sm font-bold text-white">Best for</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {addOn.bestFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 text-[11px] text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <button
                onClick={startProject}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:brightness-110 hover:shadow-glow-cyan"
              >
                Include this add-on
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What's Included"
            title={
              <>
                Exactly what you <span className="text-gradient">get</span>
              </>
            }
            description="The scope is fixed before work starts, so there are no surprise line items later."
          />
          <Stagger
            className={centeredRow({ cols: { sm: 2 }, gap: 'gap-3', className: 'mt-12' })}
            stagger={0.05}
          >
            {addOn.features.map((feature) => (
              <StaggerItem
                key={feature}
                className={centeredItem({ cols: { sm: 2 }, gap: 'gap-3' })}
              >
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/8 bg-ink-900/60 p-4">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                    <Check className="h-3 w-3" />
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-300">{feature}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why It Matters"
          title={
            <>
              The problem this <span className="text-gradient">solves</span>
            </>
          }
          description="The value is not the feature itself. It is the friction, cost or risk it removes from running your business."
        />
        <Stagger
          className={centeredRow({ cols: { md: 3 }, gap: 'gap-5', className: 'mt-12' })}
          stagger={0.06}
        >
          {addOn.benefits.map((benefit) => (
            <StaggerItem
              key={benefit.title}
              className={centeredItem({ cols: { md: 3 }, gap: 'gap-5' })}
            >
              <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-ink-900/60 p-6">
                <h3 className="font-display text-base font-bold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{benefit.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title={
              <>
                From decision to <span className="text-gradient">live</span>
              </>
            }
            description="A short, predictable process. You always know what happens next and who is doing it."
          />
          <Stagger
            className={centeredRow({ cols: { md: 3 }, gap: 'gap-5', className: 'mt-12' })}
            stagger={0.06}
          >
            {addOn.process.map((step, index) => (
              <StaggerItem
                key={step.title}
                className={centeredItem({ cols: { md: 3 }, gap: 'gap-5' })}
              >
                <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-ink-900/60 p-6">
                  <span className="font-display text-3xl font-bold text-brand-500/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Available With"
          title={
            <>
              Add it to a plan that <span className="text-gradient">supports it</span>
            </>
          }
          description="These plans already include this add-on as an option. The add-on price is added to the plan price."
        />
        <div className={centeredRow({ cols: { lg: 2 }, gap: 'gap-4', className: 'mt-12' })}>
          {plans.map(({ service, tier }) => {
            const planPrice = addOnPrice(addOn, service)
            return (
              <Reveal
                key={`${service.slug}-${tier.stack}`}
                className={centeredItem({ cols: { lg: 2 }, gap: 'gap-4' })}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/8 bg-ink-900/60 p-5 transition-colors duration-300 hover:border-brand-500/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                        <ServiceIcon name={service.icon} className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                          {service.name}
                        </p>
                        <h3 className="mt-1 font-display text-sm font-bold text-white transition-colors group-hover:text-brand-200">
                          {tier.label}
                        </h3>
                      </div>
                    </div>
                    <p className="shrink-0 font-display text-base font-bold text-gradient">
                      {formatINR(tier.price)}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-4 text-xs">
                    <span className="text-zinc-400">
                      Add-on{' '}
                      <span className="font-semibold text-accent-400">
                        +{formatINR(planPrice)}
                      </span>{' '}
                      {billing}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-300">
                      View plan
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions worth <span className="text-gradient">asking</span>
              </>
            }
            description="The answers that usually decide whether this add-on is the right fit."
          />
          <div className={centeredRow({ cols: { lg: 2 }, gap: 'gap-4', className: 'mt-12' })}>
            {addOn.faq.map((item) => (
              <Reveal
                key={item.q}
                className={centeredItem({ cols: { lg: 2 }, gap: 'gap-4' })}
              >
                <details className="group h-full rounded-2xl border border-white/8 bg-ink-900/60 p-5 [&::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold text-white">
                    {item.q}
                    <Plus className="mt-0.5 h-4 w-4 shrink-0 text-brand-300 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Related Add-ons"
            title={
              <>
                Often added <span className="text-gradient">together</span>
              </>
            }
            description="Compatible extras that solve the next problem after this one."
          />
          <Stagger
            className={centeredRow({ cols: { sm: 2, lg: 3 }, gap: 'gap-4', className: 'mt-12' })}
            stagger={0.06}
          >
            {related.map((item) => {
              const itemPrice = addOnPriceRange(item)
              return (
                <StaggerItem
                  key={item.slug}
                  className={centeredItem({ cols: { sm: 2, lg: 3 }, gap: 'gap-4' })}
                >
                  <Link
                    href={`/addons/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/8 bg-ink-900/60 p-5 transition-colors duration-300 hover:border-brand-500/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                        <ServiceIcon name={item.icon} className="h-4 w-4" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-brand-300" />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {item.category}
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold text-white transition-colors group-hover:text-brand-200">
                      {item.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                      {item.summary}
                    </p>
                    <p className="mt-4 border-t border-white/5 pt-3 font-display text-sm font-bold text-accent-400">
                      {itemPrice.varies ? 'from ' : '+'}
                      {formatINR(itemPrice.min)}{' '}
                      <span className="text-xs font-medium text-zinc-500">
                        {addOnBillingLabel(item)}
                      </span>
                    </p>
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </section>
      )}

      <CtaBanner />
    </>
  )
}
