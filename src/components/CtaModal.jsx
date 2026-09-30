'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCta } from '../lib/cta-context'
import { ContactForm } from './ContactForm'

export function CtaModal() {
  const { open, closeCta, defaultService } = useCta()
  const [service, setService] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (open) {
      setService(defaultService)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, defaultService])

  const close = () => {
    setService('')
    closeCta()
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
                Tell me about your project. I'll review it and reply within 24 hours with a clear
                plan and fixed price.
              </p>

              <div className="mt-6">
                <ContactForm defaultService={service} compact />
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
