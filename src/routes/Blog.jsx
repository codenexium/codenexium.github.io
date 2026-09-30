'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, Search } from 'lucide-react'
import { BLOG_POSTS } from '../lib/config'
import { BLOG_CONTENT, COVER_COLORS } from '../lib/blog'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { centeredRow, centeredItem } from '../lib/centered-row'

function CoverVisual({ cover, className = '' }) {
  const colors = COVER_COLORS[cover] || COVER_COLORS.stack
  return (
    <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors}`} />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5 blur-xl" />
    </div>
  )
}

export function Blog() {
  const categories = ['All', ...new Set(BLOG_POSTS.map((p) => p.category))]
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = active === 'All' || p.category === active
    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  const [featured] = BLOG_POSTS
  const featuredContent = BLOG_CONTENT[featured.slug]

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Ideas for building & <span className="text-gradient">growing online</span>
          </>
        }
        description="Practical, no fluff writing on websites, AI automation, marketing funnels and SEO - the stuff I use with clients every week."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70 transition-colors duration-300 hover:border-brand-500/30 lg:grid-cols-2"
          >
            <div className="relative h-64 lg:h-auto">
              <CoverVisual cover={featured.cover} className="h-full w-full" />
              <span className="absolute left-5 top-5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-on-brand">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="font-semibold uppercase tracking-wider text-brand-300">
                  {featured.category}
                </span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {featured.readTime}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-200 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {featuredContent?.intro || featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 group-hover:text-brand-200">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-16 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-on-brand shadow-glow'
                    : 'border border-white/10 text-zinc-400 hover:border-brand-500/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-xl border border-white/10 bg-ink-900/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-brand-400"
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 rounded-2xl border border-white/8 bg-ink-900/60 p-10 text-center text-sm text-zinc-400"
            >
              No articles match "{query}". Try a different search or category.
            </motion.p>
          ) : (
            <motion.div className={centeredRow({ cols: { sm: 2, lg: 3 }, className: "mt-8" })}>
              {filtered.map((post, i) => {
                const content = BLOG_CONTENT[post.slug]
                return (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className={centeredItem({ cols: { sm: 2, lg: 3 } })}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-ink-900/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/30"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <CoverVisual cover={post.cover} className="h-full w-full" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-800 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:text-zinc-200">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-200">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                          {content?.intro || post.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
                          Read more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
