"use client";

import { useMemo, useState, Suspense } from "react";
import { CALID, calIdEmbedUrl } from "../lib/config";
import { CalendarCheck } from "lucide-react";

/**
 * Cal ID booking calendar in a modal.
 *
 * cal.id replaces Calendly here. Its own embed.js is a Cal.com leftover that
 * throws "Cal is not defined", so we iframe the booking page directly - verified
 * to render the duration picker, timezone and bookable slots.
 */
export default function CalIdModal({
  text = "Book a Discovery Call",
  variant = "outline",
  ref = "website",
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Built at open time so UTM params are read from the live URL, and only once
  // the modal actually shows rather than on every render.
  const src = useMemo(
    () => (isOpen ? calIdEmbedUrl({ ref }) : ""),
    [isOpen, ref],
  );

  const variants = {
    primary:
      "group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:shadow-glow-cyan hover:brightness-110",
    outline:
      "inline-flex items-center gap-2 rounded-2xl border border-white/15 px-7 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-brand-400 hover:text-white",
    ghost:
      "inline-flex items-center gap-2 rounded-xl px-4 py-3 text-zinc-300 hover:text-white hover:bg-ink-700/40 transition-colors",
  };

  const buttonClass = variants[variant] || variants.outline;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonClass}
      >
        <CalendarCheck className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        {text}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={text}
        >
          <button
            type="button"
            aria-label="Close booking calendar"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 h-full w-full cursor-default"
            tabIndex={-1}
          />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-ink-850/90 p-2 text-zinc-300 transition-colors hover:bg-ink-700 hover:text-white"
            >
              <span className="sr-only">Close</span>
              <span aria-hidden="true">&times;</span>
            </button>

            {/* Suspense fallback while the calendar frame loads */}
            <Suspense
              fallback={
                <div className="flex h-[640px] items-center justify-center">
                  <div className="h-12 w-12 animate-spin-slow rounded-full border-t-2 border-b-2 border-brand-400" />
                </div>
              }
            >
              <iframe
                src={src}
                title={`${CALID.event} booking calendar`}
                className="h-[640px] w-full border-0"
                loading="lazy"
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
