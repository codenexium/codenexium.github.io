'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS } from '../lib/config'
import { BLOG_CONTENT, COVER_COLORS } from '../lib/blog'
import { centeredRow, centeredItem } from '../lib/centered-row'
import { CtaBanner } from '../components/CtaBanner'
import { useCta } from '../lib/cta-context'

export function BlogPost() {
  const { slug } = useParams()
  const { openCta } = useCta()
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  const content = post ? BLOG_CONTENT[slug] : null

  if (!post || !content) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-40 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-3 text-zinc-400">The article you're looking for doesn't exist.</p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-semibold text-on-brand"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </section>
    )
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)
  const colors = COVER_COLORS[content.cover] || COVER_COLORS.stack

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs text-zinc-500">
            <span className="rounded-full bg-brand-500/15 px-3 py-1 font-semibold uppercase tracking-wider text-brand-300">
              {content.category}
            </span>
            <span>{content.date}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {content.readTime}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {content.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">{content.intro}</p>

          <div className="mt-8 flex items-center gap-3 border-y border-white/5 py-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-bold text-on-brand">
              A
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Abhishek Sharma</p>
              <p className="text-xs text-zinc-500">Full Stack Developer & AI Automation Expert</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-10 h-64 overflow-hidden rounded-3xl border border-white/10 sm:h-80"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${colors}`} />
          <div className="absolute inset-0 grid-bg opacity-50" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-12 space-y-12"
        >
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-bold text-white sm:text-[1.6rem]">
                {s.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-300">{s.body}</p>
            </section>
          ))}
        </motion.div>

        <div className="mt-14 rounded-3xl border border-brand-500/30 bg-brand-500/10 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-white">Need help applying this?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-300">
            {content.cta}
          </p>
          <button
            onClick={() => openCta()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:scale-[1.03]"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white">Keep reading</h2>
          <div className={centeredRow({ cols: { sm: 2, lg: 3 }, className: "mt-8" })}>
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={centeredItem({
                  cols: { sm: 2, lg: 3 },
                  className:
                    "group overflow-hidden rounded-3xl border border-white/8 bg-ink-900/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/30",
                })}
              >
                <div className="relative h-36 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${COVER_COLORS[p.cover] || COVER_COLORS.stack}`}
                  />
                  <div className="absolute inset-0 grid-bg opacity-50" />
                </div>
                <div className="p-6">
                  <div className="text-[11px] text-zinc-500">
                    {p.category} · {p.readTime}
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-brand-200">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
