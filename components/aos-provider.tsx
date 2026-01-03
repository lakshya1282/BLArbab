"use client"

import type React from "react"

import { useEffect } from "react"

export function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
        }
      })
    }, observerOptions)

    // Observe all elements with aos- classes
    const aosElements = document.querySelectorAll(
      ".aos-fade-up, .aos-fade-right, .aos-fade-left, .aos-zoom-in, .aos-fade",
    )
    aosElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
