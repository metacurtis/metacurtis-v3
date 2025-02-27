import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useParallax(selector, options = {}) {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element) => {
      gsap.to(element, {
        yPercent: options.yPercent || 30,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          scrub: options.scrub || true,
          start: options.start || 'top bottom',
          end: options.end || 'bottom top'
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [selector, options])
}