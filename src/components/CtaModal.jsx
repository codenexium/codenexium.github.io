'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { formatINR } from '../lib/config'
import { useCta } from '../lib/cta-context'
import { ContactForm } from './ContactForm'

export function CtaModal() {
  const {
    open,
    closeCta,
    defaultService,
    addOns,
    requiresAddOnSelection,
  } = useCta()
  const [service, setService] = useState('')
  const [step, setStep] = useState('form')
  const [selectedAddOns, setSelectedAddOns] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (open) {
      setService(defaultService)
      setStep(requiresAddOnSelection ? 'add-ons' : 'form')
      setSelectedAddOns([])
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, defaultService, requiresAddOnSelection])

  const close = () => {
    setService('')
    setSelectedAddOns([])
    closeCta()
  }

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((selected) =>
      selected.some((item) => item.label === addOn.label)
        ? selected.filter((item) => item.label !== addOn.label)
        : [...selected, addOn],
    )
  }

  return (
    !mounted ? null : createPortal(
      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain p-4"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-glow"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl" />

            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-300">
                Start your project
              </span>
              <h3 className="mt-4 text-2xl font-bold sm:text-[1.7rem]">
                Let's build something that works
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {step === 'add-ons'
                  ? 'Choose any extras you want included. You can review the selection before sending your project details.'
                  : "Tell me about your project. I'll review it and reply within 24 hours with a clear plan and fixed price."}
              </p>

              <div className="mt-6">
                {step === 'add-ons' ? (
                  <>
                    <div className="space-y-3">
                      {addOns.length > 0 ? (
                        addOns.map((addOn) => {
                          const selected = selectedAddOns.some(
                            (item) => item.label === addOn.label,
                          )

                          return (
                            <label
                              key={addOn.label}
                              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                                selected
                                  ? 'border-brand-400/60 bg-brand-500/10'
                                  : 'border-white/10 bg-ink-850/60 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => toggleAddOn(addOn)}
                                className="mt-1 h-4 w-4 accent-cyan-400"
                              />
                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-sm font-semibold text-white">
                                    {addOn.label}
                                  </span>
                                  <span className="text-sm font-semibold text-accent-400">
                                    {addOn.price > 0
                                      ? `+${formatINR(addOn.price)}`
                                      : (addOn.freeLabel ?? 'At cost')}
                                  </span>
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                                  {addOn.desc}
                                </span>
                              </span>
                            </label>
                          )
                        })
                      ) : (
                        <p className="rounded-2xl border border-white/10 bg-ink-850/60 p-4 text-sm text-zinc-400">
                          There are no add-ons available for this service.
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 text-sm font-semibold text-on-brand shadow-glow transition-all hover:brightness-110"
                    >
                      <Check className="h-4 w-4" />
                      Confirm selection
                    </button>
                  </>
                ) : (
                  <ContactForm
                    defaultService={service}
                    defaultAddOns={selectedAddOns}
                    compact
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>,
      document.body,
    )
  )
}
