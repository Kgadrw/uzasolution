'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Copy,
  Search,
  ArrowRight,
  Calendar,
  User,
  Play,
  Newspaper,
  Instagram,
  ChevronDown,
  Check,
} from 'lucide-react'
import { newsItems } from './data'

const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

/* --- Instagram Reels Data --- */
const instagramReels = [
  'https://www.instagram.com/reel/DR4zMf3DJCG/',
  'https://www.instagram.com/reel/DSuEYEQjLGv/',
  'https://www.instagram.com/reel/DTaR1xrjKSe/',
  'https://www.instagram.com/reel/DTuZZKVjK_H/',
  'https://www.instagram.com/reel/DQhKjFGjOIK/',
  'https://www.instagram.com/reel/DQMcM6zDEgV/',
  'https://www.instagram.com/reel/DPve-7hjODv/',
  'https://www.instagram.com/reel/DPb3SuFDJu4/',
  'https://www.instagram.com/reel/DPRVGzMjBVO/',
  'https://www.instagram.com/reel/DPDoWqxDCwi/',
  'https://www.instagram.com/reel/DOycRbIgEnC/',
  'https://www.instagram.com/reel/DOp2TF3DKUw/',
  'https://www.instagram.com/reel/DMLWyh_seQZ/',
] as const

/* --- Helpers --- */
function getEmbedUrl(url: string) {
  const reelId = url.split('/reel/')[1]?.split('/')[0]
  return `https://www.instagram.com/reel/${reelId}/embed/`
}

function getReelId(url: string) {
  return url.split('/reel/')[1]?.split('/')[0] ?? ''
}

/* --- Blog Article Card --- */
function ArticleCard({
  article,
  featured = false,
}: {
  article: (typeof newsItems)[number]
  featured?: boolean
}) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/news/${article.slug}`} className="group block">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
              <Image
                src={article.cover || article.image || '/news1.jpg'}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
              {article.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-[#213348] ml-1" fill="#213348" />
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FBAF43] text-[#213348]">
                  <Newspaper size={12} />
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formattedDate}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="inline-flex items-center gap-1.5">
                  <User size={13} />
                  {article.author}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#213348] leading-tight mb-3 group-hover:text-[#00689D] transition-colors duration-300">
                {article.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#00689D] group-hover:gap-3 transition-all duration-300">
                Read full article
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={article.cover || article.image || '/news1.jpg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {article.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play size={18} className="text-[#213348] ml-0.5" fill="#213348" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5 md:p-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Calendar size={12} />
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{article.author}</span>
          </div>
          <h3 className="text-lg font-bold text-[#213348] leading-snug mb-2 group-hover:text-[#00689D] transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#00689D] group-hover:gap-3 transition-all duration-300">
            Read more
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

/* --- Reel Card --- */
function ReelCard({ url, index }: { url: string; index: number }) {
  const [loaded, setLoaded] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const reelId = getReelId(url)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Reel embed -- 9:16 portrait ratio */}
      <div className="relative aspect-[9/16] bg-gray-50">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-[#FBAF43] animate-spin" />
          </div>
        )}
        <iframe
          src={getEmbedUrl(url)}
          className={[
            'absolute inset-0 w-full h-full',
            loaded ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-500',
          ].join(' ')}
          frameBorder="0"
          scrolling="no"
          allow="encrypted-media"
          loading="lazy"
          title={`Instagram Reel ${index + 1}`}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Footer */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FBAF43] to-[#E5243B] flex items-center justify-center shrink-0">
            <Instagram size={14} className="text-white" />
          </div>
          <span className="text-xs text-gray-500 truncate">{reelId}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={copy}
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
            title="Copy link"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
            title="Open on Instagram"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* --- Section Heading --- */
function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge: string
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 md:mb-10"
    >
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FBAF43]/10 text-[#FBAF43] border border-[#FBAF43]/20 mb-3">
        {badge}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-[#213348]">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-gray-500 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  )
}

/* ====== MAIN PAGE ====== */
export default function NewsPage() {
  const [query, setQuery] = React.useState('')
  const [showAllReels, setShowAllReels] = React.useState(false)

  const filteredReels = React.useMemo(() => {
    if (!query.trim()) return instagramReels
    const q = query.toLowerCase().trim()
    return instagramReels.filter(
      (u) => u.toLowerCase().includes(q) || getReelId(u).toLowerCase().includes(q)
    )
  }, [query])

  const visibleReels = showAllReels ? filteredReels : filteredReels.slice(0, 6)

  const [featured, ...rest] = newsItems

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Navbar initialSolid overlay />

      {/* HERO */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#00689D]/5 via-[#FBAF43]/5 to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#213348] text-white mb-4">
              <Newspaper size={13} />
              News & Insights
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#213348] leading-tight">
              Stories, updates &{' '}
              <span className="bg-gradient-to-r from-[#E5243B] via-[#00689D] to-[#FBAF43] bg-clip-text text-transparent">
                insights
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Stay up to date with the latest from UZA Solutions — articles, videos, and behind-the-scenes content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOG ARTICLES */}
      <section className="pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Blog"
            title="Latest Articles"
            subtitle="In-depth perspectives on trade, logistics, and Africa's business landscape."
          />

          {/* Featured article */}
          {featured && <ArticleCard article={featured} featured />}

          {/* Article grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* INSTAGRAM REELS */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <SectionHeading
                badge="Social"
                title="Instagram Reels"
                subtitle="Catch our latest short-form content straight from Instagram."
              />
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reels..."
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00689D]/20 focus:border-[#00689D] text-sm transition"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-semibold text-gray-800">{visibleReels.length}</span>
              {' of '}
              <span className="font-semibold text-gray-800">{filteredReels.length}</span>
              {' reels'}
            </p>
            {query.trim() && (
              <button
                onClick={() => setQuery('')}
                className="text-sm font-medium text-[#00689D] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Reels Grid */}
          <AnimatePresence mode="popLayout">
            {filteredReels.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-2xl bg-white border border-gray-100 p-12 text-center"
              >
                <Instagram size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-700 font-semibold">No reels found</p>
                <p className="text-gray-500 text-sm mt-1">Try a different search term.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
              >
                {visibleReels.map((reelUrl, index) => (
                  <ReelCard key={reelUrl} url={reelUrl} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show more / less */}
          {filteredReels.length > 6 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAllReels((v) => !v)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-[#213348] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                {showAllReels ? 'Show less' : `View all ${filteredReels.length} reels`}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${showAllReels ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
