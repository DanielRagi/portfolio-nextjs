"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return // No hacer nada si es mobile

    const handleScroll = () => {
      // Calcular cuándo ocultar el indicador (aproximadamente cuando se llega a la sección de proyectos)
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Ocultar cuando se ha scrolleado más de 20% de la altura de la ventana
      setIsVisible(scrollPosition < windowHeight * 0.2)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  if (isMobile) return null // No renderizar en mobile

  return (
    <motion.div
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <p className="text-white mb-2">Proyectos</p>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
        <ChevronDown size={24} className="text-[#ffda44]" />
      </motion.div>
    </motion.div>
  )
}

