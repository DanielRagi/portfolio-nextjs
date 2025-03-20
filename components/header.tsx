"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { i18n } from "@/lib/i18n-config"
import type { Locale } from "@/lib/i18n-config"
import { setCookie } from "@/lib/cookies"

export default function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLang: Locale) => {
    if (newLang === lang) return

    // Guardar preferencia en cookie
    setCookie("NEXT_LOCALE", newLang, 365)

    // Redirigir a la misma página pero con el nuevo idioma
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`)
    router.push(newPath)

    setIsOpen(false)
  }

  return (
    <motion.header
      className="container mx-auto px-4 py-6 flex justify-between items-center relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/${lang}`}
        className="text-xl font-bold bg-clip-text text-transparent inline-block"
        style={{
          backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
        }}
      >
        Daniel Ramírez
      </Link>
      <nav className="flex items-center space-x-6">
        <Link
          href={`/${lang}`}
          className="hover:text-[#ffda44] transition-colors"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          {dict.header.home}
        </Link>
        <Link
          href="#proyectos"
          className="hover:text-[#ffda44] transition-colors"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {dict.header.projects}
        </Link>

        {/* Selector de idioma */}
        <div className="relative">
          <button
            className="flex items-center hover:text-[#ffda44] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {lang.toUpperCase()}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-[#1e1e1e] border border-[#484747] z-10">
              <div className="py-1">
                {i18n.locales.map((locale) => (
                  <button
                    key={locale}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-[#2a2a2a] ${
                      locale === lang ? "text-[#ffda44]" : "text-white"
                    }`}
                    onClick={() => switchLanguage(locale)}
                  >
                    {dict.language[locale]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

