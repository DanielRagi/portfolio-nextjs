"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.header
      className="container mx-auto px-4 py-6 flex justify-between items-center relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/"
        className="text-xl font-bold bg-clip-text text-transparent inline-block"
        style={{
          backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
        }}
      >
        Daniel Ramírez
      </Link>
      <nav className="space-x-6">
        <Link
          href="/"
          className="hover:text-[#ffda44] transition-colors"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          Inicio
        </Link>
        <Link
          href="#proyectos"
          className="hover:text-[#ffda44] transition-colors"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          Proyectos
        </Link>
      </nav>
    </motion.header>
  )
}

