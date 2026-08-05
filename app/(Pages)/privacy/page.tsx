"use client";

import { motion } from "framer-motion";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }])} />
      
      <div className="relative pt-10 pb-16 overflow-hidden z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
       
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-textMuted text-base">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>1. Introduction</h2>
              <p>
                At LayerNLooms, accessible from layernlooms.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by LayerNLooms and how we use it.
              </p>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>2. Information We Collect</h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p>
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>4. Log Files</h2>
              <p>
                LayerNLooms follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>5. Cookies and Web Beacons</h2>
              <p>
                Like any other website, LayerNLooms uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>6. Third Party Privacy Policies</h2>
              <p>
                LayerNLooms's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at info@layernlooms.com.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
