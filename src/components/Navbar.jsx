'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, CalendarCheck } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { useCta } from '../lib/cta-context'
import CalIdModal from './CalIdModal'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/addons', label: 'Add-ons' },
  { to: '/process', label: 'Process' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

function NavLink({ to, end, className, children }) {
  const pathname = usePathname()
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to)
  return (
    <Link
      href={to}
      className={typeof className === 'function' ? className({ isActive }) : className}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { openCta } = useCta()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <button
            onClick={() => openCta()}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:text-white"
          >
            Get a Quote
          </button>
          <CalIdModal variant="primary" />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/5 xl:hidden"
          >
            <div className="space-y-1 bg-ink-900/95 px-4 py-4 backdrop-blur-xl">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2.5 text-sm font-medium ${
                      isActive ? 'bg-brand-500/15 text-white' : 'text-zinc-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => openCta()}
                  className="flex-1 rounded-xl border border-brand-500/40 px-4 py-2.5 text-sm font-semibold text-brand-300"
                >
                  Get a Quote
                </button>
                <CalIdModal />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
