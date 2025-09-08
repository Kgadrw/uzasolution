'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { newsItems } from '../data'

const Navbar = dynamic(() => import('../../../components/navbar'))
const Footer = dynamic(() => import('../../../components/footer'))

export default function NewsArticlePage({ params }) {
  const article = newsItems.find((n) => n.slug === params.slug)
  if (!article) return notFound()

  return (
    <div>
      <Navbar initialSolid />
      {/* Hero */}
      <section className="relative w-full">
        <div className="relative h-[320px] md:h-[420px]">
          <Image
            src={article.cover || article.image || '/news1.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/75 to-transparent" />
          <div className="relative z-10 h-full px-8 md:px-16 lg:px-24 flex items-center">
            <div className="max-w-3xl text-white">
              <p className="text-xs uppercase tracking-widest text-[#FBAF43]">
                {new Date(article.date).toLocaleDateString()} • {article.author}
              </p>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold">{article.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="prose prose-lg max-w-none px-8 md:px-16 lg:px-24 py-12">
        {article.type === 'video' && article.videoId && (
          <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${article.videoId}?controls=1`}
              title={article.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {article.content.map((block, idx) => {
          if (block.kind === 'heading') {
            return (
              <h2 key={idx} className="text-[#213348]">{block.text}</h2>
            )
          }
          if (block.kind === 'list') {
            return (
              <ul key={idx}>
                {block.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            )
          }
          return <p key={idx}>{block.text}</p>
        })}
      </article>

      <Footer />
    </div>
  )
}


