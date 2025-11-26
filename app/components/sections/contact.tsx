"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const ref = useInView()
  const [isLoading, setIsLoading] = useState(false)
  const [messageStatus, setMessageStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  })

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessageStatus("idle")

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          project_type: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          to_email: "layernlooms@gmail.com",
        }
      )

      setMessageStatus("success")
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
      })

      // Clear success message after 5 seconds
      setTimeout(() => setMessageStatus("idle"), 5000)
    } catch (error) {
      console.error("EmailJS error:", error)
      setMessageStatus("error")
      setTimeout(() => setMessageStatus("idle"), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-black text-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something Amazing</h2>
            <p className="text-gray-300 text-lg mb-8">
              Have a project in mind? We'd love to hear about it. Fill out the form and our team will get back to you
              within 24 hours.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-medium">layernlooms@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white font-medium">India, Maharashtra-Pune</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success Message */}
            {messageStatus === "success" && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm animate-in fade-in duration-300">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {messageStatus === "error" && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm animate-in fade-in duration-300">
                ✕ Failed to send message. Please try again.
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            <div>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/5 transition-all duration-200 cursor-pointer appearance-none"
                disabled={isLoading}
              >
                <option value="" className="bg-black text-white">Select Project Type</option>
                <option value="web" className="bg-black text-white">Web Development</option>
                <option value="mobile" className="bg-black text-white">Mobile App</option>
                <option value="ai" className="bg-black text-white">AI Solution</option>
                <option value="enterprise" className="bg-black text-white">Enterprise Software</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="budget"
                placeholder="Budget Range"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200 resize-none"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
