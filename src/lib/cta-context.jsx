'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const CtaContext = createContext(null)

export function CtaProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [defaultService, setDefaultService] = useState('')
  const [addOns, setAddOns] = useState([])
  const [selectedAddOns, setSelectedAddOns] = useState([])
  const [requiresAddOnSelection, setRequiresAddOnSelection] = useState(false)

  const openCta = useCallback((service = '', options = {}) => {
    setDefaultService(service)
    setAddOns(options.addOns ?? [])
    setSelectedAddOns(options.selectedAddOns ?? [])
    setRequiresAddOnSelection(options.requiresAddOnSelection ?? false)
    setOpen(true)
  }, [])

  const closeCta = useCallback(() => {
    setOpen(false)
    setAddOns([])
    setSelectedAddOns([])
    setRequiresAddOnSelection(false)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <CtaContext.Provider
      value={{
        open,
        defaultService,
        addOns,
        selectedAddOns,
        requiresAddOnSelection,
        openCta,
        closeCta,
      }}
    >
      {children}
    </CtaContext.Provider>
  )
}

export function useCta() {
  const ctx = useContext(CtaContext)
  if (!ctx) throw new Error('useCta must be used inside <CtaProvider>')
  return ctx
}
