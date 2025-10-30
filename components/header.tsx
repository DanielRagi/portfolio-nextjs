"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Globe, Check, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { i18n } from "@/lib/i18n-config"
import type { Locale } from "@/lib/i18n-config"
import { setCookie } from "@/lib/cookies"

export default function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
        {/* Link + icono externo (no emoji) */}
        <Link
          href="https://atomicstudio.dev/"
          className="text-[#A2D0EE] hover:text-[#ffda44] transition-colors flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.header.atomic} <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>

        {/* Selector de idioma mejorado */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center px-3 py-1.5 rounded-md border border-[#484747] bg-[#2a2a2a] hover:border-[#ffda44] transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Cambiar idioma"
          >
            <Globe className="h-4 w-4 mr-2" />
            <span className="font-medium">{lang.toUpperCase()}</span>
            <ChevronDown className="ml-1.5 h-3.5 w-3.5 opacity-70" />
          </button>

          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-[#2a2a2a] border border-[#484747] z-10 overflow-hidden"
              ref={dropdownRef}
            >
              {i18n.locales.map((locale) => (
                <button
                  key={locale}
                  className={`flex items-center w-full px-4 py-2.5 text-sm text-left hover:bg-[#3a3a3a] transition-colors ${
                    locale === lang
                      ? "bg-gradient-to-r from-[#A2D0EE]/20 to-[#D4AAD8]/20 text-white font-medium"
                      : "text-[#d9d9d9]"
                  }`}
                  onClick={() => switchLanguage(locale)}
                >
                  <span className="mr-2 text-lg">{locale === "es" ? "🇪🇸" : "🇬🇧"}</span>
                  {dict.language[locale]}
                  {locale === lang && <Check className="ml-auto h-4 w-4 text-[#ffda44]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

