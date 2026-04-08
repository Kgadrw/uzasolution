'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogIn } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { GoArrowUpRight } from 'react-icons/go'

export default function Navbar({ initialSolid = false, overlay = false }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(initialSolid)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef(null)
  const cardsRef = useRef([])
  const tlRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const items = useMemo(
    () => [
      {
        label: 'About',
        bgColor: '#0D0716',
        textColor: '#fff',
        links: [
          { label: 'Company', ariaLabel: 'About Company', href: '/about' },
          { label: 'UZA Empower', ariaLabel: 'UZA Empower', href: '/uzasempower' },
        ],
      },
      {
        label: 'Projects',
        bgColor: '#170D27',
        textColor: '#fff',
        links: [
          { label: 'Portfolio', ariaLabel: 'View Portfolio', href: '/portfolio' },
          { label: 'News', ariaLabel: 'Read News', href: '/news' },
        ],
      },
      {
        label: 'Contact',
        bgColor: '#271E37',
        textColor: '#fff',
        links: [
          { label: 'Contact us', ariaLabel: 'Contact us', href: '/contact' },
          { label: 'LinkedIn', ariaLabel: 'UZA LinkedIn', href: 'https://www.linkedin.com/in/uza-solutions-aa5353362/' },
          { label: 'Instagram', ariaLabel: 'UZA Instagram', href: 'https://www.instagram.com/uza.solutions' },
        ],
      },
    ],
    [],
  )

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 260

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content')
      if (contentEl) {
        const wasVisibility = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = 'visible'
        contentEl.style.pointerEvents = 'auto'
        contentEl.style.position = 'static'
        contentEl.style.height = 'auto'

        contentEl.offsetHeight

        const topBar = 60
        const padding = 16
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVisibility
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        return topBar + contentHeight + padding
      }
    }
    return 260
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: 'power3.out',
    })

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1')

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })

        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) tlRef.current = newTl
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  useEffect(() => {
    setIsHamburgerOpen(false)
    setIsExpanded(false)
    tlRef.current?.reverse?.()
  }, [pathname])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el
  }

  const menuIconColor = scrolled ? '#00142B' : '#00142B'

  return (
    <nav
      className={`${
        overlay ? 'absolute top-2 sm:top-4 left-0 right-0' : 'relative mt-2 sm:mt-4'
      } ${pathname === '/about' ? 'bg-[#F8FAFC]' : ''} z-30 w-full`}
    >
      <div className="mx-auto w-[96%] sm:w-[95%] lg:w-[92%] xl:w-[90%] shadow-sm">
        <nav
          ref={navRef}
          className={`card-nav ${isExpanded ? 'open' : ''}`}
          style={{ backgroundColor: scrolled ? '#ffffff' : '#ffffff' }}
        >
          <div className="card-nav-top">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              tabIndex={0}
              style={{ color: menuIconColor }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <Link href="/" className="logo-container" aria-label="Go home">
              <Image
                src="/uza.png"
                alt="UZA Solutions Logo"
                width={120}
                height={60}
                className="logo object-contain"
                priority={false}
              />
            </Link>

            <a
              href="https://logistics.uzasolutions.com/client/login"
              target="_blank"
              rel="noopener noreferrer"
              className="card-nav-cta-button hidden md:inline-flex items-center gap-2"
            >
              <span>Login</span>
              <LogIn className="w-4 h-4" />
            </a>
          </div>

          <div className="card-nav-content" aria-hidden={!isExpanded}>
            {(items || []).slice(0, 3).map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="nav-card"
                ref={setCardRef(idx)}
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <div className="nav-card-label">{item.label}</div>
                <div className="nav-card-links">
                  {item.links?.map((lnk, i) => {
                    const isExternal = typeof lnk.href === 'string' && /^https?:\/\//i.test(lnk.href)
                    const commonProps = {
                      className: 'nav-card-link',
                      'aria-label': lnk.ariaLabel,
                    }

                    return isExternal ? (
                      <a
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...commonProps}
                      >
                        <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                        {lnk.label}
                      </a>
                    ) : (
                      <Link key={`${lnk.label}-${i}`} href={lnk.href || '/'} {...commonProps}>
                        <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                        {lnk.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <style jsx>{`
        .card-nav {
          display: block;
          height: 60px;
          padding: 0;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          will-change: height;
          background: white;
        }

        /* When closed, keep it more pill-like; when open, use softer corners */
        .card-nav:not(.open) {
          border-radius: 9999px;
        }

        .card-nav-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.85rem 0.55rem 1.1rem;
          z-index: 2;
        }

        .hamburger-menu {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 6px;
          user-select: none;
        }

        .hamburger-menu:hover .hamburger-line {
          opacity: 0.75;
        }

        .hamburger-line {
          width: 30px;
          height: 2px;
          background-color: currentColor;
          transition:
            transform 0.25s ease,
            opacity 0.2s ease,
            margin 0.3s ease;
          transform-origin: 50% 50%;
        }

        .hamburger-menu.open .hamburger-line:first-child {
          transform: translateY(4px) rotate(45deg);
        }

        .hamburger-menu.open .hamburger-line:last-child {
          transform: translateY(-4px) rotate(-45deg);
        }

        .logo-container {
          display: flex;
          align-items: center;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .logo {
          height: 26px;
          width: auto;
        }

        .card-nav-cta-button {
          border: none;
          border-radius: 9999px;
          padding: 0 1rem;
          height: 100%;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.15s ease;
          text-decoration: none;
          background-color: #00142b;
          color: #ffffff;
        }

        .card-nav-cta-button:hover {
          background-color: #0b2a5a;
          transform: translateY(-1px);
        }

        .card-nav-content {
          position: absolute;
          left: 0;
          right: 0;
          top: 60px;
          bottom: 0;
          padding: 0.5rem;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          visibility: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .card-nav.open .card-nav-content {
          visibility: visible;
          pointer-events: auto;
        }

        .nav-card {
          height: 100%;
          flex: 1 1 0;
          min-width: 0;
          border-radius: 16px;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 12px 16px;
          gap: 8px;
          user-select: none;
        }

        .nav-card-label {
          font-weight: 500;
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        .nav-card-links {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-card-link {
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: inherit;
        }

        .nav-card-link:hover {
          opacity: 0.8;
        }

        .nav-card-link :global(svg) {
          flex: 0 0 auto;
        }

        @media (max-width: 768px) {
          .card-nav-top {
            padding: 0.5rem 1rem;
            justify-content: space-between;
          }

          .hamburger-menu {
            order: 2;
          }

          .logo-container {
            position: static;
            transform: none;
            order: 1;
          }

          .card-nav-content {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            padding: 0.5rem;
            bottom: 0;
            justify-content: flex-start;
          }

          .nav-card {
            height: auto;
            min-height: 60px;
          }

          .nav-card-label {
            font-size: 18px;
          }

          .nav-card-link {
            font-size: 15px;
          }
        }
      `}</style>

    </nav>
  )
}
