"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleStartProject = () => {
    const el = document.getElementById("contact")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleExploreProject = () => {
    const el = document.getElementById("portfolio")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">



        {/* Main Headline */}
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight transform transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          style={{ textWrap: "balance" }}
        >
          Weaving Digital Experiences with{" "}
          <span className="text-transparent bg-clip-text premium-gradient">Precision, Depth & AI</span>
        </h1>

        {/* Sub-tagline */}
        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 transform transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Web • Mobile • AI • Custom Software — Built exclusively for brands that want excellence.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <button
            className="group relative px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={handleStartProject}
          >
            Start Your Project
            <span className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
          <button className="px-8 py-3 bg-background text-foreground font-medium rounded-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
            onClick={handleExploreProject}
          >
            Explore Our Work
          </button>
        </div>
      </div>
    </section>
  )
}
