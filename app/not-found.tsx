'use client';

import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none">
        <h1 className="text-[20rem] md:text-[30rem] font-black text-foreground/[0.03] leading-none animate-pulse">
          404
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="relative inline-flex">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
            <div className="relative bg-background border border-border p-6 rounded-3xl shadow-2xl">
                <FiSearch className="w-12 h-12 text-primary animate-bounce" />
            </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-science font-bold text-foreground tracking-tight">
            Lost in Space?
          </h2>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto">
            The page you are looking for has vanished or never existed. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 bg-primary text-background px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 w-full sm:w-auto"
          >
            <FiHome className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 border border-border bg-background/50 backdrop-blur-sm text-foreground px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-accent w-full sm:w-auto"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Explore Services
          </Link>
        </div>
      </div>

      {/* Subtle background particles/blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
