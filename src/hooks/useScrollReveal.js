import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element) => {
      gsap.fromTo(element,
        {
          y: options.y || 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: options.duration || 1,
          ease: options.ease || 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: options.start || 'top bottom-=100',
            toggleActions: options.toggleActions || 'play none none reverse'
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [selector, options])
}