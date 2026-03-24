'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { newsItems } from '../data'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from 'lucide-react'

const Navbar = dynamic(() => import('../../../components/navbar'))
const Footer = dynamic(() => import('../../../components/footer'))

function estimateReadTime(article) {
  const text = article.content
    .filter((b) => b.kind === 'paragraph')
    .map((b) => b.text)
    .join(' ')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function NewsArticlePage({ params }) {
  const resolvedParams = React.use(params)
  const article = newsItems.find((n) => n.slug === resolvedParams.slug)
  if (!article) return notFound()
  const router = useRouter()

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const readTime = estimateReadTime(article)
  const categoryLabel = article.category || 'Article'

  // Other articles for sidebar / related
  const related = newsItems.filter((n) => n.slug !== article.slug)

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Navbar initialSolid />

      {/* Hero */}
      <section className="relative w-full">
        <div className="relative h-[340px] md:h-[440px]">
          <Image
            src={article.cover || article.image || '/news1.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00142B]/90 via-[#00142B]/50 to-[#00142B]/20" />

          <div className="relative z-10 h-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-end pb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/80 truncate">{article.title}</span>
            </nav>

            <div className="mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/85 text-xs font-semibold backdrop-blur">
                {categoryLabel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User size={14} />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {readTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Back button - sticky */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex items-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#213348] hover:text-[#00689D] transition"
          >
            <ArrowLeft size={16} />
            Back to News
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14">
          {/* Main content */}
          <article>
            {/* Excerpt callout */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200 font-medium">
              {article.excerpt}
            </p>

            {/* Video embed */}
            {article.type === 'video' && article.videoId && (
              <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${article.videoId}?controls=1`}
                  title={article.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Article body */}
            <div className="prose prose-lg max-w-none prose-headings:text-[#213348] prose-headings:font-bold prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-ul:my-4 prose-li:my-1">
              {article.content.map((block, idx) => {
                if (block.kind === 'heading') {
                  return (
                    <h2 key={idx}>
                      <span className="inline-block w-1 h-6 bg-[#FBAF43] rounded mr-3 -mb-0.5" />
                      {block.text}
                    </h2>
                  )
                }
                if (block.kind === 'list') {
                  return (
                    <ul key={idx} className="space-y-2">
                      {block.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00689D] mt-2.5 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                return <p key={idx}>{block.text}</p>
              })}
            </div>

            {/* Tags / CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#213348] text-white text-sm font-medium hover:bg-[#19486A] transition shadow-sm"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                More Articles
              </h3>
              <div className="space-y-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group block rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={item.cover || item.image || '/news1.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <h4 className="text-sm font-semibold text-[#213348] leading-snug group-hover:text-[#00689D] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
