import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const select = gsap.utils.selector(root)
      const hero = gsap.timeline({ defaults: { ease: 'power2.out' } })

      hero
        .from(select('.hero-backdrop img'), { scale: 1.045, duration: 1.25, clearProps: 'transform' }, 0)
        .from(select('.hero-copy .eyebrow'), { opacity: 0, y: 14, duration: 0.55, clearProps: 'opacity,transform' }, 0.08)
        .from(select('.hero-copy h1'), { opacity: 0, y: 28, duration: 0.8, clearProps: 'opacity,transform' }, 0.17)
        .from(select('.hero-copy > p:not(.eyebrow)'), { opacity: 0, y: 20, duration: 0.65, clearProps: 'opacity,transform' }, 0.33)
        .from(select('.hero-actions .button'), { opacity: 0, y: 14, duration: 0.55, stagger: 0.09, clearProps: 'opacity,transform' }, 0.48)

      gsap.from(select('.method-grid > *'), {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: select('.method-strip')[0], start: 'top 82%', once: true, refreshPriority: 2 },
      })

      gsap.from(select('.section-heading > *'), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: select('.feature-section')[0], start: 'top 78%', once: true, refreshPriority: 2 },
      })

      select('.featured-grid .product-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 26,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true, refreshPriority: 2 },
        })
      })

      gsap.from(select('.decision-text > *'), {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: select('.decision-text')[0], start: 'top 80%', once: true },
      })

      gsap.from(select('.decision-preview'), {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: select('.decision-preview')[0], start: 'top 86%', once: true },
      })

      gsap.from(select('.setup-copy > *'), {
        opacity: 0,
        y: 20,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: select('.setup-banner')[0], start: 'top 75%', once: true },
      })
    })

    return () => media.revert()
  }, { scope: root })

  return <div className="home-page" ref={root}>{children}</div>
}
