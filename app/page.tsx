"use client"

import { Suspense } from "react"
import Navbar from "@/app/components/navbar"
import Hero from "@/app/components/sections/hero"
import Expertise from "@/app/components/sections/expertise"
import WhyChoose from "@/app/components/sections/why-choose"
import Portfolio from "@/app/components/sections/portfolio"
import Testimonials from "@/app/components/sections/testimonials"
import Process from "@/app/components/sections/process"
import Pricing from "@/app/components/sections/pricing"
import Contact from "@/app/components/sections/contact"
import Footer from "@/app/components/footer"

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-background">
      <Navbar />
      <Suspense fallback={null}>
        <Hero />
        <Expertise />
        <WhyChoose />
        <Portfolio />
        <Testimonials />
        <Process />
        <Pricing />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  )
}
