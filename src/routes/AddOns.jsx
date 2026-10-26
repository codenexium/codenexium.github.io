'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { ADDONS, addOnBillingLabel, addOnPriceRange, formatINR } from '../lib/config'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/icons'
import { CtaBanner } from '../components/CtaBanner'

const CATEGORY_ORDER = ['Foundation', 'Growth', 'Build', 'Store']

const CATEGORY_COPY = {
  Foundation: 'The essentials that keep your site online, renewed and looked after.',
  Growth: 'Get found, stay in touch and turn more visitors into enquiries.',
  Build: 'Extra functionality for payments, content and admin without a rebuild.',
  Store: 'The operations that make an online catalogue easier to run and sell.',
}

export function AddOns() {
  const categories = CATEGORY_ORDER.filter((category) =>
    ADDONS.some((addOn) => addOn.category === category),
  )

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="mt-18 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Services & pricing
        </Link>
      </section>

      <PageHero
        centered
        eyebrow="Add-ons & Extras"
        title={
          <>
            Extend your website without a <span className="text-gradient">rebuild</span>
          </>
        }
        description="Every add-on has its own detail page, price and scope. Add one to a plan that supports it, or combine them into the project you actually need."
      >
        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/70 px-5 py-3 text-sm text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
          {ADDONS.length} add-ons · fixed prices · no hourly surprises
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {categories.map((category, index) => {
          const addOns = ADDONS.filter((addOn) => addOn.category === category)
          return (
            <section
              key={category}
              className={index === 0 ? '' : 'mt-20 border-t border-white/5 pt-16'}
            >
              <SectionHeading
                align="left"
                eyebrow={category}
                title={
                  category === 'Foundation' ? (
                    <>
                      The <span className="text-gradient">foundation</span>
                    </>
                  ) : category === 'Growth' ? (
                    <>
                      Ready to <span className="text-gradient">grow</span>
                    </>
                  ) : category === 'Build' ? (
                    <>
                      Built to <span className="text-gradient">fit</span>
                    </>
                  ) : (
                    <>
                      Store <span className="text-gradient">operations</span>
                    </>
                  )
                }
                description={CATEGORY_COPY[category]}
              />
              <Stagger
                className={centeredRow({
                  cols: { sm: 2, lg: 3 },
                  gap: 'gap-5',
                  className: 'mt-10',
                })}
                stagger={0.06}
              >
                {addOns.map((addOn) => {
                  const price = addOnPriceRange(addOn)
                  return (
                    <StaggerItem
                      key={addOn.slug}
                      className={centeredItem({ cols: { sm: 2, lg: 3 }, gap: 'gap-5' })}
                    >
                      <Link
                        href={`/addons/${addOn.slug}`}
                        className="group flex h-full flex-col rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-colors duration-300 hover:border-brand-500/30"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
                            <ServiceIcon name={addOn.icon} className="h-5 w-5" />
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-brand-300" />
                        </div>
                        <h3 className="mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-brand-200">
                          {addOn.name}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                          {addOn.summary}
                        </p>
                        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-white/5 pt-4">
                          <p className="font-display text-lg font-bold text-accent-400">
                            {price.varies ? 'from ' : '+'}
                            {formatINR(price.min)}{' '}
                            <span className="text-xs font-medium text-zinc-500">
                              {addOnBillingLabel(addOn)}
                            </span>
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-300">
                            View details
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  )
                })}
              </Stagger>
            </section>
          )
        })}

        <Reveal className="mt-20 rounded-3xl border border-white/8 bg-ink-900/50 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Not sure what to <span className="text-gradient">add first</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Start with the plan that fits your business, then add only the extras that remove
            real friction. If two add-ons overlap, I will say so before you pay.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
          >
            Compare service plans <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <CtaBanner />
    </>
  )
}
